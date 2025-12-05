// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import dotenv from "dotenv";
// import { createServer } from "http";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import FormData from "form-data";
// import fetch from "node-fetch";

// dotenv.config({ path: path.resolve("./.env") });

// if (!process.env.GOOGLE_API_KEY) throw new Error("GOOGLE_API_KEY is not defined");

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" }); 

// const app = express();
// const httpServer = createServer(app);

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// async function getAIReply({ prompt, imagePath, mimeType }) {
//   try {
//     const parts = [{ text: prompt }];
//     if (imagePath && mimeType) {
//       const base64Data = fs.readFileSync(imagePath).toString("base64");
//       parts.push({ inlineData: { mimeType, data: base64Data } });
//     }
//     const result = await aiModel.generateContent({ contents: [{ role: "user", parts }] });
//     return result.response.text();
//   } catch (error) {
//     console.error(error);
//     return "⚠️ Error contacting AI service.";
//   }
// }

// app.post("/symptom", async (req, res) => {
//   const { symptom } = req.body;
//   if (!symptom) return res.status(400).json({ reply: "Please enter a symptom." });

//   const prompt = `Patient reports: "${symptom}". Provide detailed guidance and possible causes.`;
//   const aiReply = await getAIReply({ prompt });
//   res.json({ reply: aiReply });
// });

// app.post("/upload", upload.single("image"), async (req, res) => {
//   const imagePath = req.file.path;
//   const imageUrl = `http://localhost:${process.env.PORT || 5000}/${imagePath.replace(/\\/g, "/")}`;

//   try {
//     const predictionRes = await fetch("http://localhost:8000/predict", {
//       method: "POST",
//       body: (() => {
//         const f = new FormData();
//         f.append("image", fs.createReadStream(imagePath));
//         return f;
//       })(),
//     });
//     const predictionData = await predictionRes.json();
//     const prompt = `Patient uploaded an image. AI predicts: "${predictionData.prediction}". Provide guidance.`;
//     const aiReply = await getAIReply({ prompt });

//     res.json({ reply: aiReply, prediction: predictionData.prediction, imageUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to get AI advice." });
//   }
// });

// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import dotenv from "dotenv";
// import { createServer } from "http";
// import FormData from "form-data";
// import fetch from "node-fetch";
// import OpenAI from "openai";

// dotenv.config({ path: path.resolve("./.env") });

// if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not defined");

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// const app = express();
// const httpServer = createServer(app);

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Multer setup
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // Function to get AI reply using OpenAI
// async function getAIReply({ prompt }) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // or "gpt-4" if you have access
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     return "⚠️ Error contacting AI service.";
//   }
// }

// // Symptom endpoint
// app.post("/symptom", async (req, res) => {
//   const { symptom } = req.body;
//   if (!symptom) return res.status(400).json({ reply: "Please enter a symptom." });

//   const prompt = `Patient reports: "${symptom}". Provide detailed guidance, possible causes, and suggested actions.`;
//   const aiReply = await getAIReply({ prompt });
//   res.json({ reply: aiReply });
// });

// // Image upload endpoint
// app.post("/upload", upload.single("image"), async (req, res) => {
//   const imagePath = req.file.path;
//   const imageUrl = `http://localhost:${process.env.PORT || 5000}/${imagePath.replace(/\\/g, "/")}`;

//   try {
//     // Call Python prediction server
//     const predictionRes = await fetch("http://localhost:8000/predict", {
//       method: "POST",
//       body: (() => {
//         const f = new FormData();
//         f.append("image", fs.createReadStream(imagePath));
//         return f;
//       })(),
//     });

//     const predictionData = await predictionRes.json();

//     const prompt = `Patient uploaded an image. AI predicts: "${predictionData.prediction}". Provide detailed guidance, description, and possible causes.`;
//     const aiReply = await getAIReply({ prompt });

//     res.json({ reply: aiReply, prediction: predictionData.prediction, imageUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to get AI advice." });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import dotenv from "dotenv";
// import { createServer } from "http";
// import OpenAI from "openai";
// import FormData from "form-data";
// import fetch from "node-fetch";

// dotenv.config({ path: path.resolve("./.env") });

// if (!process.env.OPENAI_API_KEY)
//   throw new Error("OPENAI_API_KEY is not defined in your .env");

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// const app = express();
// const httpServer = createServer(app);

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // ✅ GPT-3.5-turbo AI reply
// async function getAIReply({ prompt }) {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.7,
//       max_tokens: 500,
//     });
//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     return "⚠️ Error contacting AI service.";
//   }
// }

// // Symptom input endpoint
// app.post("/symptom", async (req, res) => {
//   const { symptom } = req.body;
//   if (!symptom) return res.status(400).json({ reply: "Please enter a symptom." });

//   const prompt = `Patient reports: "${symptom}". Provide detailed guidance and possible causes.`;
//   const aiReply = await getAIReply({ prompt });
//   res.json({ reply: aiReply });
// });

// // Image upload endpoint
// app.post("/upload", upload.single("image"), async (req, res) => {
//   const imagePath = req.file.path;
//   const imageUrl = `http://localhost:${process.env.PORT || 5000}/${imagePath.replace(
//     /\\/g,
//     "/"
//   )}`;

//   try {
//     // Call your ML model for prediction
//     const predictionRes = await fetch("http://localhost:8000/predict", {
//       method: "POST",
//       body: (() => {
//         const f = new FormData();
//         f.append("image", fs.createReadStream(imagePath));
//         return f;
//       })(),
//     });
//     const predictionData = await predictionRes.json();

//     // Pass prediction to GPT-3.5 for guidance
//     const prompt = `Patient uploaded an image. AI predicts: "${predictionData.prediction}". Provide guidance.`;
//     const aiReply = await getAIReply({ prompt });

//     res.json({ reply: aiReply, prediction: predictionData.prediction, imageUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to get AI advice." });
//   }
// });

// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/symptom", (req, res) => {
 const { symptom } = req.body;
 if (!symptom) {
 return res.status(400).json({ reply: "Please enter a symptom." });
 }

 
 const py = spawn("python", ["llama_chat.py"]);


 let dataBuffer = "";

 py.stdout.on("data", (chunk) => {
 dataBuffer += chunk.toString();
 });

 py.stderr.on("data", (err) => {
 console.error(`Python stderr: ${err.toString()}`);
 });

 py.on("close", (code) => {
 console.log(`Python process exited with code ${code}`);
 try {

if (dataBuffer) {
 const parsed = JSON.parse(dataBuffer);
 res.json({ reply: parsed.reply });
} else {
 res.status(500).json({ reply: "⚠️ AI failed to generate a response. No data received." });
 }
} catch (e) {
 console.error(`Failed to parse JSON: ${e.message}`);
 res.status(500).json({ reply: "⚠️ AI failed to generate a response. Invalid JSON received." });
 }
});

 py.stdin.write(JSON.stringify({ prompt: symptom }) + "\n");
py.stdin.end(); 
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));