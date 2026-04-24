import Groq from "groq-sdk";
import { performance } from "perf_hooks";

//Se crea una instancia de Groq utilizando la clave API almacenada en las variables de entorno. Esta instancia se utilizará para interactuar con la API de Groq y generar ideas creativas basadas en el tema proporcionado por el usuario.
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

//La función generarIdea es un controlador asíncrono que maneja las solicitudes POST a la ruta "/generar". Esta función recibe el tema del proyecto desde el cuerpo de la solicitud, utiliza la instancia de Groq para generar una idea creativa basada en ese tema, y luego envía la respuesta generada al cliente en formato JSON.
export const generarIdea = async (req, res) => {
  //Se extrae el tema del proyecto del cuerpo de la solicitud (req.body) enviado por el cliente.
  const { tema } = req.body;

  const inicio = performance.now();

  try {
    //Se utiliza la instancia de Groq para crear una solicitud de generación de texto.
    const completion = await groq.chat.completions.create({
      //Se especifica el modelo a utilizar (en este caso, "llama-3.1-8b-instant")
      model: "llama-3.1-8b-instant",
      //El mensaje que se le envía al modelo (que incluye el tema del proyecto)
      messages: [
        {
          role: "user",
          content: `
Actúa como un experto en innovación y desarrollo de software con experiencia en creación de startups tecnológicas.

Tu tarea es generar una idea creativa, original y detallada para un proyecto basado en el siguiente tema: "${tema}".

La respuesta debe cumplir con lo siguiente:

1. Nombre del proyecto:
   - Un nombre atractivo y fácil de recordar.

2. Descripción general:
   - Explica claramente en qué consiste el proyecto.
   - Qué problema resuelve y por qué es importante.

3. Público objetivo:
   - Describe a quién va dirigido (edad, intereses, necesidades).

4. Funcionalidades principales:
   - Lista al menos 4 funcionalidades clave.
   - Explica brevemente cada una.

5. Tecnologías sugeridas:
   - Menciona posibles tecnologías (frontend, backend, base de datos, IA si aplica).

6. Modelo de monetización:
   - Cómo podría generar ingresos (suscripción, freemium, anuncios, etc).

7. Diferenciador:
   - Qué hace único este proyecto frente a otros.

8. Ejemplo de uso:
   - Describe un escenario real donde un usuario utilizaría esta aplicación.

Reglas:
- Responde en español.
- Usa un lenguaje claro pero profesional.
- Sé creativo pero realista.
- No repitas información innecesaria.
- Mantén una estructura ordenada con subtítulos.
`,
        },
      ],
      //número máximo de tokens a generar
      max_tokens: 300,
      //temperatura para controlar la creatividad de la respuesta
      temperature: 0.8,
    });

    const fin = performance.now();
    const tiempoMs = fin - inicio;

    //Se extrae el texto generado de la respuesta de Groq.
    const texto = completion.choices[0].message.content;

    //Se imprime en la consola el tiempo que tomó generar la respuesta utilizando Groq.
    console.log("Tiempo IA:", (tiempoMs / 1000).toFixed(2), "segundos");

    console.log("Respuesta Groq:", texto);

    //Se envía la respuesta generada y el tiempo de generación al cliente en formato JSON.
    res.json({
      data: [{ generated_text: texto }],
      tiempo_ms: tiempoMs,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
