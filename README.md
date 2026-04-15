#  Document Intelligence Platform | AI-Powered RAG System

**Upload your PDF → Ask anything in natural language → Get accurate answers from your document**

Ek full-stack **Retrieval-Augmented Generation (RAG)** application jo PDFs ko intelligently process karta hai aur context-aware jawab deta hai. Yeh project real-world document QA use-case ko solve karta hai (Resume analysis, Research papers, Contracts, Reports etc.).


##  Live Demo
** [Live Application](https://your-vercel-link.vercel.app)** ← Yeh link mandatory daalna

**Backend API**: `https://your-render-backend.onrender.com`

*(Agar live nahi hai toh yaha likh do: "Deploying soon on Vercel + Render")*

##  Key Features

- **Secure User Authentication** (JWT-based)
- **Multiple PDF Upload** with chunking & storage
- **Intelligent Context Retrieval** (Simple RAG)
- **AI Chat Interface** powered by Groq (Llama 3.3 70B) / DeepSeek
- **Responsive & Clean UI** with real-time chat
- **Error Handling & Rate Limiting**

##  Tech Stack

| Layer          | Technologies                          |
|----------------|---------------------------------------|
| **Frontend**   | React.js, Tailwind CSS / Material UI  |
| **Backend**    | Node.js, Express.js                   |
| **Database**   | MongoDB (Mongoose)                    |
| **AI/LLM**     | Groq (Llama-3.3-70B) / DeepSeek       |
| **File Processing** | pdf-parse, Chunking Logic        |
| **Authentication** | JWT + bcrypt                       |
| **Deployment** | Vercel (Frontend) + Render (Backend)  |

##  How It Works (Architecture)

1. User PDF upload karta hai → Backend chunks mein break karta hai
2. Chunks MongoDB mein save hote hain
3. Chat question aata hai → Relevant chunks retrieve hote hain (context building)
4. Context + Question → LLM (Groq) ko bhejta hai → Accurate answer milta hai

**Simple RAG Flow** → Future mein embeddings + vector DB (Pinecone/Chroma) add kar sakte hain.


##  Local Setup

```bash
# 1. Clone the repository
cd document-intelligence-rag

# 2. Backend Setup
cd server
npm install
cp .env.example .env        # MONGO_URI, AI_API_KEY, AI_BASE_URL add karo
npm run dev                 # ya node src/server.js

# 3. Frontend Setup (new terminal)
cd ../client
npm install
npm run dev