const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const chunkText = require("../utils/chunkText");

const Document = require("../models/documentModel");

exports.processDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../../uploads", req.file.filename);

    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(dataBuffer);

    const chunks = chunkText(data.text);

    const fakeEmbeddings = chunks.map(() => new Array(1536).fill(0));

    await Document.create({
      userId: req.user.userId,
      fileName: req.file.originalname,
      chunks: chunks,
      embeddings: fakeEmbeddings,
    });

    res.json({
      message: "Document stored successfully",
      totalChunks: chunks.length,
      firstChunk: chunks[0],
      embeddingLength: fakeEmbeddings[0].length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};