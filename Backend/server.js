
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ limit: '1mb' }));




// Konfigurasi CORS
// Konfigurasi CORS
const allowedOrigins = (
  process.env.FRONTEND_ORIGIN || ''
)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Izinkan request tanpa Origin untuk kebutuhan lokal/non-browser
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin tidak diizinkan oleh CORS'));
  }
}));






// Konfigurasi Ollama
const OLLAMA_URL =
  process.env.OLLAMA_URL || 'http://localhost:11434';

const MODEL =
  process.env.OLLAMA_MODEL || 'llama3.2:3b';

function getCurrentDateTime() {
  const now = new Date();

  return now.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Instruksi chatbot
const SYSTEM_INSTRUCTION = `
Kamu adalah asisten pribadi Rafi.

Apabila pengguna memperkenalkan diri sebagai misbah, maka jawab pertama kali dengan gombalan.

Gunakan bahasa Indonesia yang natural,
ramah, santai, dan mudah dipahami.

Jawablah pertanyaan secara jelas dan terstruktur.
Perhatikan konteks percakapan sebelumnya.
Jangan mengulang jawaban yang sama jika
pengguna mengajukan pertanyaan lanjutan.

Jika tidak mengetahui jawabannya,
katakan dengan jujur dan jangan mengarang informasi.
`;

// Endpoint chatbot
app.post('/chat', async (req, res) => {
  const startTime = Date.now();

  try {
    const { message, history = [] } = req.body;

    if (
      typeof message !== 'string' ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: 'Pesan tidak boleh kosong.'
      });
    }

    const userMessage = message.trim();

    if (userMessage.length > 4000) {
      return res.status(400).json({
        error: 'Pesan terlalu panjang.'
      });
    }

    // Ambil maksimal 6 riwayat percakapan
    const recentHistory = Array.isArray(history)
      ? history
          .filter(item =>
            item &&
            typeof item.message === 'string' &&
            ['user', 'robot'].includes(item.sender)
          )
          .slice(-6)
      : [];

    // Hindari pesan terakhir terkirim dua kali
    const lastMessage =
      recentHistory[recentHistory.length - 1];

    if (
      lastMessage &&
      lastMessage.sender === 'user' &&
      lastMessage.message.trim() === userMessage
    ) {
      recentHistory.pop();
    }

    // Susun percakapan untuk Ollama
    const messages = [
      {
        role: 'system',
        content: `
        ${SYSTEM_INSTRUCTION}

        INFORMASI WAKTU SAAT INI:
        ${getCurrentDateTime()}

        Gunakan waktu ini untuk menjawab pertanyaan
        mengenai hari, tanggal, bulan, dan jam.
        `  
      },

      ...recentHistory.map(item => ({
        role: item.sender === 'user' ? 'user' : 'assistant',
        content: item.message
      })),

      {
        role: 'user',
        content: userMessage
      }
    ];

    console.log('Pesan baru diterima.');
    console.log(`Model: ${MODEL}`);
    console.log(`Jumlah riwayat: ${recentHistory.length}`);

    // Kirim permintaan ke Ollama
    const response = await fetch(
      `${OLLAMA_URL}/api/chat`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: MODEL,
          messages: messages,
          stream: false
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Ollama API Error ${response.status}: ${errorText}`
      );
    }

    const result = await response.json();

    const reply = result.message?.content;

    if (!reply) {
      return res.status(502).json({
        error: 'Ollama tidak menghasilkan jawaban.'
      });
    }

    console.log(
      `Waktu respons Ollama: ${
        (Date.now() - startTime) / 1000
      } detik`
    );

    return res.json({
      response: reply
    });

  } catch (error) {
    console.error('Ollama Error:', error.message);

    return res.status(500).json({
      error: 'Gagal memproses pesan melalui Ollama.',
      detail: error.message
    });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Backend Chatbot Rafi aktif!',
    model: MODEL,
    engine: 'Ollama'
  });
});

// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('================================');
  console.log('CHATBOT RAFI BACKEND');
  console.log('================================');
  console.log(`Server : http://localhost:${PORT}`);
  console.log(`Model  : ${MODEL}`);
  console.log('Engine : Ollama');
  console.log('Status : Running');
  console.log('================================');
});
