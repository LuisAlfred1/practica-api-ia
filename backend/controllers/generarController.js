import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generarIdea = async (req, res) => {
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
    res.json([{ generated_text: texto }]);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
