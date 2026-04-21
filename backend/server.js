import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use((req, res, next) => {
  console.log(`>>> ${req.method} ${req.path}`);
  next();
});

app.post("/generar", async (req, res) => {
  const { tema } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Genera una idea creativa y detallada para un proyecto de: ${tema}. Responde en español.`,
        },
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const texto = completion.choices[0].message.content;
    console.log("Respuesta Groq:", texto);

    res.json([{ generated_text: texto }]); // mismo formato que usa tu frontend
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () =>
  console.log("Servidor corriendo en http://localhost:3001"),
);
