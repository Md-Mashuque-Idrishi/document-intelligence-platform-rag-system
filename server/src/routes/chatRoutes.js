const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const Document = require("../models/documentModel");

const OpenAI = require("openai");

// Flexible AI Client (Groq / DeepSeek / OpenAI)
const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_BASE_URL || "https://api.deepseek.com",
});

router.post("/ask", authMiddleware, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({ message: "Question is required" });
    }

    console.log("User Question:", question);

    const docs = await Document.find({ userId: req.user.userId });

    if (!docs || docs.length === 0) {
      return res.json({ answer: "No documents found. Pehle PDF upload karo." });
    }

    // Context building
    let context = "";
    let totalChunks = 0;

    docs.forEach(doc => {
      if (doc.chunks && Array.isArray(doc.chunks)) {
        context += doc.chunks.join("\n\n") + "\n\n";
        totalChunks += doc.chunks.length;
      }
    });

    context = context.substring(0, 14000); // Groq ke liye safe

    console.log(`Context built → ${totalChunks} chunks | ${context.length} characters`);

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",     // Best free model on Groq
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Answer ONLY from the given context. Agar jawab context mein na ho toh clearly bolo: 'Sorry, yeh information context mein nahi mili.'",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 700,
    });

    const answer = response.choices[0]?.message?.content?.trim() || 
                   "Sorry, koi jawab generate nahi ho pa raha.";

    res.json({ answer });

  } catch (error) {
    console.error("AI Error:", error.message || error);

    if (error.status === 429) {
      return res.status(429).json({ answer: "Rate limit ho gaya. 1 minute wait karke try karo." });
    }

    res.status(500).json({ 
      answer: "AI mein temporary issue hai. Groq key sahi daala hai? Ya fake mode use karo." 
    });
  }
});

module.exports = router;