
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// =====================================
// 1. LOAD ENVIRONMENT VARIABLES
// =====================================

dotenv.config();

const app = express();
app.use(express.json({ limit: '1mb' }));

// =====================================
// 2. CORS CONFIGURATION
// =====================================

const allowedOrigins = (
  process.env.FRONTEND_ORIGIN || ''
)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {

    // Allow requests without Origin for local testing
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin tidak diizinkan oleh CORS'));
  }
}));

// =====================================
// 3. GEMINI CONFIGURATION
// =====================================

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY belum ditemukan di .env');
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// =====================================
// 4. CHATBOT PERSONALITY
// =====================================

const SYSTEM_INSTRUCTION = `
Kamu adalah asisten pribadi Rafi.

Gunakan bahasa Indonesia yang natural,
ramah, santai, dan mudah dipahami.

Jawablah pertanyaan secara jelas dan terstruktur.
Perhatikan konteks percakapan sebelumnya.
Jangan mengulang jawaban yang sama jika
pengguna mengajukan pertanyaan lanjutan.

Jika tidak mengetahui jawabannya,
katakan dengan jujur dan jangan mengarang informasi.
`;

// =====================================
// 5. CHAT ENDPOINT
// =====================================

app.post('/chat', async (req, res) => {

  try {

    const { message, history = [] } = req.body;

    // Validate user message
    if (
      typeof message !== 'string' ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: 'Pesan tidak boleh kosong.'
      });
    }

    // Get recent conversation history
    const recentHistory = Array.isArray(history)
      ? history.slice(-12)
      : [];

    // Convert messages into Gemini format
    const contents = recentHistory
      .filter(item =>
        item &&
        typeof item.message === 'string' &&
        ['user', 'robot'].includes(item.sender)
      )
      .map(item => ({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.message }]
      }));

    // Add latest message
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }]
    });

    // Request Gemini response
    const result = await ai.models.generateContent({

      model: MODEL,

      contents: contents,

      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 1024
      }

    });

    const reply = result.text;

    if (!reply) {
      return res.status(502).json({
        error: 'Gemini tidak menghasilkan jawaban.'
      });
    }

    // Return response to frontend
    res.json({
      response: reply
    });

  } catch (error) {

    console.error('Gemini Error:', error);

    res.status(500).json({
      error: 'Gagal memproses pesan melalui Gemini API.'
    });

  }

});

// =====================================
// 6. SERVER HEALTH CHECK
// =====================================

app.get('/', (req, res) => {

  res.json({
    status: 'online',
    message: 'Backend Chatbot Rafi aktif!',
    model: MODEL
  });

});

// =====================================
// 7. START SERVER
// =====================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log('================================');
  console.log('CHATBOT RAFI BACKEND');
  console.log('================================');
  console.log(`Server : http://localhost:${PORT}`);
  console.log(`Model  : ${MODEL}`);
  console.log('Status : Running');
  console.log('================================');

});
