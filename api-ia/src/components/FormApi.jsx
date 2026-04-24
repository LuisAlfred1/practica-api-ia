import { useState } from "react";

export const FormApi = () => {
  const [tema, setTema] = useState("");
  const [ideas, setIdeas] = useState(""); // Variable en plural
  const [tiempo, setTiempo] = useState(null); // Variable para el tiempo
  const [cargando, setCargando] = useState(false);

  const generarIdeas = async () => {
    if (!tema) return alert("Por favor, ingresa un tema.");

    setCargando(true);
    try {
      const response = await fetch("http://localhost:3001/generar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tema }),
      });
      const data = await response.json();
      const texto = data.data[0]?.generated_text || "Error";
      setIdeas(texto || "No se generó ninguna idea.");
      setTiempo(data.tiempo_ms); // Guardar el tiempo de respuesta
    } catch (error) {
      console.error(error);
      setIdeas("Error al conectar con la IA");
    }
    setCargando(false);
  };

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <section className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Generador de Ideas con IA
          </h1>
          {tiempo && (
            <span className="text-sm py-1 px-4 border rounded-full border-gray-500 bg-gray-200 text-gray-900">
              Tiempo de respuesta: {(tiempo / 1000).toFixed(2)} s
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="¿Sobre qué quieres ideas? (Ej: App de cocina)"
            className="border outline-none border-gray-300 rounded-md p-3 w-full transition-all"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
          />
          <button
            onClick={generarIdeas}
            disabled={cargando}
            className={`${
              cargando ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2 px-6 transition-colors cursor-pointer`}
          >
            {cargando ? "Analizando..." : "Obtener Idea"}
          </button>
        </div>
      </section>

      <section className="mt-8 max-w-6xl mx-auto">
        {ideas && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md animate-in fade-in duration-500">
            <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">
              Idea Sugerida:
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg italic">
              "{ideas}"
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
