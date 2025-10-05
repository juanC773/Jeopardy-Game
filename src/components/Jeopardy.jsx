import { useState } from 'react';

// ============================================
// Preguntas de cada persona
// ============================================

const preguntasJuanDavid = [
  "Pregunta 1",
  "Pregunta 2", 
  "Pregunta 3",
  "Pregunta 4",
  "Pregunta 5",
  "Pregunta 6",
  "Pregunta 7",
  "Pregunta 8",
  "Pregunta 9",
  "¿Cuál es la diferencia fundamental entre los modelos de lenguaje pre-entrenados y los modelos fine-tuned específicos para tareas particulares?"
];

const preguntasCatalina = [
  "Pregunta 1",
  "Pregunta 2",
  "Pregunta 3",
  "Pregunta 4",
  "Pregunta 5",
  "Pregunta 6",
  "Pregunta 7",
  "Pregunta 8",
  "Pregunta 9",
  "Pregunta 10"
];

const preguntasSamuel = [
  "Pregunta 1",
  "Pregunta 2",
  "Pregunta 3",
  "Pregunta 4",
  "Pregunta 5",
  "Pregunta 6",
  "Pregunta 7",
  "Pregunta 8",
  "Pregunta 9",
  "Pregunta 10"
];

const preguntasJuanJose = [
  "Pregunta 1",
  "Pregunta 2",
  "Pregunta 3",
  "Pregunta 4",
  "Pregunta 5",
  "Pregunta 6",
  "Pregunta 7",
  "Pregunta 8",
  "Pregunta 9",
  "Pregunta 10"
];

// ============================================

export default function JeopardyBoard() {
  const personas = [
    { nombre: 'PREGUNTAS JUAN DAVID', color: 'from-violet-500 to-purple-600', preguntas: preguntasJuanDavid },
    { nombre: 'PREGUNTAS CATALINA', color: 'from-pink-500 to-rose-600', preguntas: preguntasCatalina },
    { nombre: 'PREGUNTAS SAMUEL J', color: 'from-cyan-500 to-blue-600', preguntas: preguntasSamuel },
    { nombre: 'PREGUNTAS JUAN JOSÉ', color: 'from-amber-500 to-orange-600', preguntas: preguntasJuanJose }
  ];

  const puntajes = [200, 400, 600, 800, 1000];

  const [tarjetas, setTarjetas] = useState(() => {
    const inicial = {};
    personas.forEach((persona, pIdx) => {
      for (let col = 0; col < 2; col++) {
        puntajes.forEach((puntaje, fila) => {
          const key = `${pIdx}-${col}-${fila}`;
          const numPregunta = col * 5 + fila;
          inicial[key] = {
            bloqueada: false,
            puntaje,
            pregunta: persona.preguntas[numPregunta],
            color: persona.color
          };
        });
      }
    });
    return inicial;
  });

  const [preguntaActual, setPreguntaActual] = useState(null);

  const abrirPregunta = (key) => {
    if (tarjetas[key].bloqueada) return;
    setPreguntaActual({ key, ...tarjetas[key] });
  };

  const cerrarPregunta = () => {
    setPreguntaActual(null);
  };

  const respuestaCorrecta = () => {
    if (!preguntaActual) return;
    setTarjetas(prev => ({
      ...prev,
      [preguntaActual.key]: { ...prev[preguntaActual.key], bloqueada: true }
    }));
    cerrarPregunta();
  };

  const respuestaIncorrecta = () => {
    cerrarPregunta();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 md:p-10">
      <div className="max-w-[1900px] mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-center mb-12 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
          Jeopardy
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8">
          {personas.map((persona, pIdx) => (
            <div key={pIdx} className="space-y-5">
              <div className={`relative bg-gradient-to-r ${persona.color} p-6 rounded-2xl shadow-2xl overflow-hidden group`}>
                <div className="absolute inset-0 bg-white/10 transform -skew-y-3 group-hover:skew-y-3 transition-transform duration-500"></div>
                <h2 className="relative text-2xl md:text-3xl font-black text-white text-center tracking-tight drop-shadow-lg">
                  {persona.nombre}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[0, 1].map(col => (
                  <div key={col} className="space-y-4">
                    {puntajes.map((puntaje, fila) => {
                      const key = `${pIdx}-${col}-${fila}`;
                      const tarjeta = tarjetas[key];

                      return (
                        <div key={key} className="relative group">
                          <div
                            onClick={() => abrirPregunta(key)}
                            className={`
                              relative h-24 cursor-pointer transition-all duration-300 transform-gpu
                              ${tarjeta.bloqueada ? 'opacity-40 scale-95 cursor-not-allowed' : 'hover:scale-105 hover:-translate-y-1'}
                            `}
                          >
                            <div className={`h-full bg-gradient-to-br ${persona.color} rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-sm border border-white/20`}>
                              <div className="text-center">
                                <div className="text-5xl font-black text-white drop-shadow-2xl">
                                  {puntaje}
                                </div>
                                <div className="text-xs font-semibold text-white/80 mt-1">
                                  PUNTOS
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de pregunta */}
      {preguntaActual && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-3xl p-8 md:p-12 max-w-3xl w-full mx-4 border border-white/10 shadow-2xl animate-in zoom-in duration-300">
            <div className="text-center mb-8">
              <div className={`inline-block bg-gradient-to-r ${preguntaActual.color} text-white px-6 py-3 rounded-2xl text-3xl font-black mb-6`}>
                {preguntaActual.puntaje} PUNTOS
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white leading-relaxed">
                {preguntaActual.pregunta}
              </h2>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={respuestaCorrecta}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-10 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
              >
                Correcta
              </button>
              <button
                onClick={respuestaIncorrecta}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 px-10 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
              >
                Incorrecta
              </button>
              <button
                onClick={cerrarPregunta}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-10 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}