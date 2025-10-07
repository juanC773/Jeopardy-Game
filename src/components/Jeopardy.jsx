import { useState } from 'react';

// ============================================
// Preguntas de cada persona
// ============================================

const preguntasJuanDavid = [
    //columna 1
  "¿Qué son las ideologías según Van Dijk: opiniones individuales o sistemas de creencias compartidas?", //200
  "Da 3 ejemplos de ideologías.", //400
  "Mencione una función social de las ideologías", //600
  "Mencione dos ejemplos de pares de ideologías opuestas: una dominante y una de resistencia.", //800
  "Las 5 cosas que hacen que algo no sea una ideologia:", //1000

  //columna 2
  "¿Verdadero o falso? Las ideologías son siempre negativas.",//200
  "Según Van Dijk, ¿el feminismo es una ideología dominante o de resistencia?", //400
  "Se considera que las ideologías son solo herramientas de los poderosos para engañar a los débiles, y que solo los dominantes las poseen.", //600
  "El iceberg mostrado estaba conformado de 3 partes. Cuales eran?", //800
  "¿Cuales son los 3 pilares para que algo sea considerado ideología?", //1000
];

const preguntasCatalina = [
  // columna 1
  "¿Cuál es la naturaleza principal de las ideologías, definidas como representaciones sociales que consisten en sistemas de...?", //200
  "Mencione dos de las instituciones o colectividades organizadas (además de los movimientos sociales) que típicamente poseen ideologías de grupo.", //400
  "Los maestros de inglés son un ejemplo de grupo social profesional. ¿Qué colectividad son los hablantes del inglés en este contraste?", //600
  "Además de las quejas no atendidas, ¿cuál es la condición clave que provoca que las ideologías se desintegren gradualmente en un grupo?", //800
  "¿Qué nombre reciben los métodos explícitos y formalizados que usan los grupos, como los sermones o los folletos de propaganda, para enseñar ideologías a los nuevos miembros?", //1000

  // columna 2
  "¿Qué tipo de colectividades, como las nacionales o lingüísticas, tienen conocimiento y valores pero no desarrollan o necesitan ideologías?", //200
  "¿Qué término describe el proceso por el cual las ideologías se adquieren a lo largo del tiempo, ya que uno no se vuelve racista o feminista de la noche a la mañana?", //400
  "¿Cuáles son las fuentes primarias a través de las cuales las personas adquieren, expresan y reproducen sus ideologías, como la interacción comunicativa hablada o escrita?", //600
  "A diferencia de los partidos, grupos como los racistas o conservadores, que no siempre están organizados formalmente, se asemejan más a estas colectividades informales donde se comparten creencias.", //800
  "¿Qué ejemplo histórico se menciona en las fuentes como movimientos sociales de los años setenta que se desintegraron gradualmente?" //1000
];


const preguntasSamuel = [
  // columna 1
  "¿Según Van Dijk, a través de qué medio principal se expresan y adquieren las ideologías?", //200
  "¿Qué diferencia hay entre el discurso políticamente correcto y la manipulación discursiva?", //400
  "¿Cómo define Van Dijk la polarización entre 'Nosotros' y 'Ellos' dentro del discurso ideológico?", //600
  "¿Qué es la representación social?", //800
  "¿Qué papel juegan los procesos cognitivos en la producción del discurso ideológico?", //1000 (repetida, podrías cambiarla si quieres)

  // columna 2
  "¿Cuáles son algunas estrategias lingüísticas que permiten ocultar la ideología en el discurso?", //200
  "¿Qué relación existe entre ideología, conocimiento y lo que se da por supuesto en el discurso?", //400
  "Menciona los tres procesos cognitivos de los que habla Van Dijk", //600
  "¿De qué manera el contexto condiciona la transparencia o el ocultamiento ideológico?", //800
  "¿Cómo se relaciona la propaganda con la difusión sistemática de ideologías según Van Dijk?" //1000
];


const preguntasJuanJose = [
  //columna 1
  "¿De qué trata la canción “Ode To Viceroy”?", //200
  "¿De qué trata la canción Saudade? ", //400
  "¿Cuanto tiempo estuvo separada la banda “American Football”? ", //600
  "¿De donde es la banda “Title Fight”?", //800
  "¿Que versículo habla la canción “Falling Cloud 9”?", //1000

  //columna 2
  "¿De qué año es el álbum “Diferencias Creativas Irreconciliables”?",//200
  "¿De qué trata la canción “Zoey 101”?", //400
  "¿Qué movimiento promovió la banda “Title Fight”?", //600
  "¿Cual fue el mayor motivante de la canción “Casa Nueva”?", //800
  "¿Por qué la música es un método de comunicación de discursos tan poderosa?" //1000
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