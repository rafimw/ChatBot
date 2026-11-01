
const Chatbot = {

  // ==========================================
  // 1. DEFAULT RESPONSES
  // ==========================================

  defaultResponses: {

    // GREETING
    'halo': `Halo juga! 👋 Senang bisa ngobrol denganmu. Ada yang ingin kamu ceritakan?`,
    'hai': `Hai! Apa kabar hari ini?`,
    'hello': `Hello! Senang bertemu denganmu. Ada yang bisa aku bantu?`,
    'selamat pagi': `Selamat pagi! Semoga aktivitasmu hari ini berjalan lancar. ☀️`,
    'selamat siang': `Selamat siang! Bagaimana aktivitasmu hari ini?`,
    'selamat sore': `Selamat sore! Semoga harimu menyenangkan.`,
    'selamat malam': `Selamat malam! Jangan lupa istirahat setelah beraktivitas, ya.`,
    'apa kabar': `Aku baik dan siap menemanimu ngobrol. Kamu sendiri bagaimana?`,
    'gimana kabarmu': `Aku baik! Terima kasih sudah bertanya. Bagaimana denganmu?`,

    // IDENTITY
    'siapa kamu': `Aku asisten virtual Rafi. Aku bisa menemanimu ngobrol, menjawab pertanyaan, dan membantu berbagai hal.`,
    'nama kamu siapa': `Aku belum punya nama khusus. Untuk sekarang, kamu bisa memanggilku asisten Rafi.`,
    'kamu siapa': `Aku asisten virtual yang dibuat untuk membantu Rafi. Senang berkenalan denganmu!`,
    'siapa pembuatmu': `Aku dibuat sebagai asisten virtual untuk Rafi. 😊`,
    'siapa yang membuatmu': `Aku dikembangkan untuk menjadi asisten virtual Rafi dan membantunya dalam berbagai hal.`,

    // PERSONAL CONVERSATION
    'aku baik': `Wah, syukurlah kalau begitu! Semoga harimu selalu menyenangkan. 😊`,
    'kabar aku baik': `Senang mendengarnya! Semoga semuanya berjalan lancar untukmu.`,
    'aku kurang baik': `Yah, semoga keadaanmu segera membaik. Kalau ingin cerita, aku siap mendengarkan.`,
    'aku sedang sedih': `Aku turut prihatin mendengarnya. Mau cerita apa yang sedang terjadi?`,
    'aku sedang senang': `Wah, ikut senang mendengarnya! Memangnya ada kabar baik apa hari ini?`,
    'aku lelah': `Sepertinya kamu sudah menjalani hari yang cukup melelahkan. Jangan lupa istirahat, ya.`,
    'aku bosan': `Kalau begitu, kita ngobrol saja! Ada banyak hal yang bisa kita bahas.`,
    'aku lapar': `Wah, sepertinya sudah waktunya mencari makanan. Kamu ingin makan apa?`,

    // THANKS AND APOLOGY
    'terima kasih': `Sama-sama! Senang bisa membantu. Kalau ada hal lain, jangan sungkan bertanya. 😊`,
    'makasih': `Sama-sama! Semoga jawabanku bermanfaat untukmu.`,
    'thanks': `You're welcome! Senang bisa membantu.`,
    'maaf': `Tidak apa-apa, santai saja. 😊`,
    'sorry': `It's okay! Tidak perlu khawatir.`,

    // DAILY CONVERSATION
    'lagi apa': `Aku sedang menemanimu ngobrol. Kalau kamu sendiri sedang apa?`,
    'sedang apa': `Lagi siap membantu menjawab pertanyaanmu. Ada sesuatu yang menarik hari ini?`,
    'kamu sibuk': `Tidak juga. Aku selalu siap menemanimu ngobrol.`,
    'kamu bisa apa': `Aku bisa membantu menjawab pertanyaan, memberikan informasi, berdiskusi, dan menemanimu ngobrol.`,
    'ceritakan sesuatu': `Tahukah kamu? Gurita memiliki tiga jantung. Dua memompa darah ke insang, sementara satu lagi memompa darah ke seluruh tubuh.`,
    'aku tidak tahu': `Tidak masalah. Kita bisa mencari tahu jawabannya bersama-sama.`,
    'aku mengerti': `Bagus! Senang kalau penjelasannya bisa dipahami.`,
    'aku tidak mengerti': `Tidak apa-apa. Aku bisa mencoba menjelaskannya dengan cara yang lebih sederhana.`,

    // TOPIC AND QUESTIONS
    'aku mau bertanya': `Tentu saja! Silakan tanyakan apa yang ingin kamu ketahui.`,
    'boleh bertanya': `Tentu boleh! Silakan, aku akan mencoba membantu.`,
    'bisa bantu aku': `Tentu! Coba ceritakan apa yang sedang kamu butuhkan.`,
    'tolong bantu aku': `Dengan senang hati. Jelaskan saja apa yang ingin kamu kerjakan.`,
    'aku punya masalah': `Ceritakan saja masalahnya. Kita coba cari solusinya bersama-sama.`,
    'aku punya pertanyaan': `Silakan! Aku siap mendengarkan pertanyaanmu.`,

    // POSITIVE RESPONSES
    'oke': `Oke! Ada lagi yang ingin kamu bahas?`,
    'baiklah': `Siap! Kalau begitu, kita lanjutkan.`,
    'mantap': `Hehe, mantap! Senang kalau kamu merasa terbantu.`,
    'bagus sekali': `Terima kasih! Ada hal lain yang ingin kamu ketahui?`,
    'setuju': `Baik, kita sepakat!`,
    'benar': `Betul! Kamu sudah menangkap maksudnya.`,
    'tidak masalah': `Sip! Kalau begitu, tidak perlu khawatir.`,

    // GOODBYE
    'sampai jumpa': `Sampai jumpa lagi! Senang bisa ngobrol denganmu. 👋`,
    'dadah': `Dadah! Jangan lupa mampir lagi, ya.`,
    'selamat tinggal': `Sampai bertemu lagi. Semoga harimu menyenangkan!`,
    'aku pergi dulu': `Oke, sampai nanti! Semoga aktivitasmu lancar.`,

    // RANDOM FUNCTIONS
    'flip a coin': function () {
      return Math.random() < 0.5
        ? 'Hasil lemparan koin: gambar.'
        : 'Hasil lemparan koin: angka.';
    },

    'roll a dice': function () {
      const result = Math.floor(Math.random() * 6) + 1;
      return `Hasil lemparan dadu kamu adalah ${result}.`;
    },

    'tanggal hari ini': function () {
      return `Sekarang tanggal ${new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}.`;
    }
  },

  additionalResponses: {},

  unsuccessfulResponse:
    `Hmm, aku belum terlalu memahami maksudmu. Bisa jelaskan sedikit lagi?`,

  emptyMessageResponse:
    `Sepertinya kamu belum menuliskan pesan. Ada yang ingin kamu tanyakan?`,

  // ==========================================
  // 2. CONTEXT MEMORY
  // ==========================================

  lastIntent: null,

  contextResponses: {

    // Setelah chatbot menanyakan kabar
    how_are_you: {
      'baik': `Wah, syukurlah! Semoga harimu menyenangkan. 😊`,
      'aku baik': `Senang mendengarnya! Ada sesuatu yang ingin kamu ceritakan?`,
      'baik saja': `Bagus kalau begitu! Semoga semuanya tetap lancar.`,
      'kurang baik': `Yah, semoga keadaanmu segera membaik. Mau cerita?`,
      'buruk': `Aku turut prihatin. Kalau kamu ingin bercerita, aku siap mendengarkan.`,
      'biasa saja': `Hehe, semoga ada hal menyenangkan yang terjadi hari ini.`,
      'lumayan': `Lumayan juga sudah cukup baik. Semoga harimu semakin menyenangkan!`
    },

    // Setelah chatbot menanyakan aktivitas
    activity: {
      'kerja': `Oh, sedang bekerja rupanya. Semoga pekerjaannya lancar, ya!`,
      'belajar': `Semangat belajarnya! Sedang mempelajari sesuatu yang baru?`,
      'tidur': `Wah, sedang beristirahat rupanya. Semoga istirahatmu cukup.`,
      'main': `Asyik! Lagi bermain apa?`,
      'santai': `Enak juga sesekali bersantai. Nikmati waktunya!`
    },

    // Setelah chatbot menawarkan bantuan
    offer_help: {
      'pekerjaan': `Baik, pekerjaan seperti apa yang ingin kamu diskusikan?`,
      'belajar': `Tentu! Materi apa yang sedang kamu pelajari?`,
      'programming': `Menarik! Kamu sedang mengembangkan program apa?`,
      'teknik': `Baik! Bidang teknik apa yang ingin kamu bahas?`,
      'komputer': `Oke! Apakah kamu sedang mengalami masalah pada komputer?`
    }
  },

  // ==========================================
  // 3. NORMALIZATION
  // ==========================================

  normalize: function (text) {
    return text
      .toLowerCase()
      .normalize('NFKC')
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  },

  // ==========================================
  // 4. ADDITIONAL RESPONSES
  // ==========================================

  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses
    };
  },

  // ==========================================
  // 5. MAIN RESPONSE FUNCTION
  // ==========================================

  getResponse: function (message) {

    if (!message || !message.trim()) {
      return this.emptyMessageResponse;
    }

    const normalizedMessage = this.normalize(message);

    // ------------------------------------------
    // CHECK CONVERSATION CONTEXT FIRST
    // ------------------------------------------

    if (this.lastIntent &&
        this.contextResponses[this.lastIntent]) {

      const contextOptions =
        this.contextResponses[this.lastIntent];

      const contextResult = this.stringSimilarity(
        normalizedMessage,
        Object.keys(contextOptions)
      );

      if (
        contextResult.bestMatch &&
        contextResult.bestMatch.rating >= 0.35
      ) {
        const contextResponse =
          contextOptions[contextResult.bestMatch.target];

        this.lastIntent = null;

        return contextResponse;
      }
    }

    // ------------------------------------------
    // NORMAL SIMILARITY MATCHING
    // ------------------------------------------

    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses
    };

    const responseKeys = Object.keys(responses);

    const result = this.stringSimilarity(
      normalizedMessage,
      responseKeys
    );

    const bestMatch = result.bestMatch;

    if (!bestMatch || bestMatch.rating <= 0.3) {
      this.lastIntent = null;
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = bestMatch.target;
    const response = responses[bestResponseKey];

    // ------------------------------------------
    // SAVE CONVERSATION CONTEXT
    // ------------------------------------------

    const contextMap = {

      'apa kabar': 'how_are_you',
      'gimana kabarmu': 'how_are_you',

      'lagi apa': 'activity',
      'sedang apa': 'activity',

      'bisa bantu aku': 'offer_help',
      'tolong bantu aku': 'offer_help',
      'aku mau bertanya': 'offer_help',
      'aku punya pertanyaan': 'offer_help'
    };

    this.lastIntent = contextMap[bestResponseKey] || null;

    // ------------------------------------------
    // RETURN RESPONSE
    // ------------------------------------------

    if (typeof response === 'function') {
      return response();
    }

    return response;
  },

  // ==========================================
  // 6. ASYNC RESPONSE
  // ==========================================

  getResponseAsync: function (message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 700);
    });
  },

  // ==========================================
  // 7. BIGRAM SIMILARITY ALGORITHM
  // ==========================================

  compareTwoStrings: function (first, second) {

    first = this.normalize(first);
    second = this.normalize(second);

    if (first === second) return 1;

    if (first.length < 2 || second.length < 2) {
      return 0;
    }

    const firstBigrams = new Map();

    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);

      firstBigrams.set(
        bigram,
        (firstBigrams.get(bigram) || 0) + 1
      );
    }

    let intersectionSize = 0;

    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.get(bigram) || 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (
      (2.0 * intersectionSize) /
      (first.length + second.length - 2)
    );
  },

  // ==========================================
  // 8. FIND BEST SIMILARITY MATCH
  // ==========================================

  stringSimilarity: function (mainString, targetStrings) {

    const ratings = [];
    let bestMatchIndex = -1;

    for (let i = 0; i < targetStrings.length; i++) {

      const target = targetStrings[i];

      const rating = this.compareTwoStrings(
        mainString,
        target
      );

      ratings.push({
        target: target,
        rating: rating
      });

      if (
        bestMatchIndex === -1 ||
        rating > ratings[bestMatchIndex].rating
      ) {
        bestMatchIndex = i;
      }
    }

    return {
      ratings: ratings,
      bestMatch: bestMatchIndex >= 0
        ? ratings[bestMatchIndex]
        : null,
      bestMatchIndex: bestMatchIndex
    };
  },

  // ==========================================
  // 9. RESET CONVERSATION
  // ==========================================

  resetConversation: function () {
    this.lastIntent = null;
  }
};


// ==========================================
// 10. EXPORT CHATBOT
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Chatbot;
} else if (typeof window !== 'undefined') {
  window.Chatbot = Chatbot;
  window.chatbot = Chatbot;
}
