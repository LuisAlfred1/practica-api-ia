import Groq from "groq-sdk";

//Se crea una instancia de Groq utilizando la clave API almacenada en las variables de entorno. Esta instancia se utilizará para interactuar con la API de Groq y generar ideas creativas basadas en el tema proporcionado por el usuario.
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

//La función generarIdea es un controlador asíncrono que maneja las solicitudes POST a la ruta "/generar". Esta función recibe el tema del proyecto desde el cuerpo de la solicitud, utiliza la instancia de Groq para generar una idea creativa basada en ese tema, y luego envía la respuesta generada al cliente en formato JSON.
export const generarIdea = async (req, res) => {
  //Se extrae el tema del proyecto del cuerpo de la solicitud (req.body) enviado por el cliente.
  const { tema } = req.body;

  try {
    //Se utiliza la instancia de Groq para crear una solicitud de generación de texto.
    const completion = await groq.chat.completions.create({
      //Se especifica el modelo a utilizar (en este caso, "llama-3.1-8b-instant")
      model: "llama-3.1-8b-instant",
      //El mensaje que se le envía al modelo (que incluye el tema del proyecto) 
      messages: [
        {
          role: "user",
          content: `Genera una idea creativa y detallada para un proyecto de: ${tema}. Responde en español.`,
        },
      ],
      //número máximo de tokens a generar
      max_tokens: 300,
      //temperatura para controlar la creatividad de la respuesta
      temperature: 0.8,
    });

    //Se extrae el texto generado de la respuesta de Groq.
    const texto = completion.choices[0].message.content;
    console.log("Respuesta Groq:", texto);

    //Se envía la respuesta generada al cliente en formato JSON.
    res.json([{ generated_text: texto }]);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
