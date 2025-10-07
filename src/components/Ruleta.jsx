import { useState } from 'react';

export default function RuletaEquipos() {
  const todosLosEquipos = [
    'GRUPO 1', 'GRUPO 2', 'GRUPO 3', 'GRUPO 4',
    'GRUPO 5', 'GRUPO 6', 'GRUPO 7', 'GRUPO 8'
  ];

  const [oportunidadesPorGrupo, setOportunidadesPorGrupo] = useState(() => {
    const inicial = {};
    todosLosEquipos.forEach(grupo => {
      inicial[grupo] = 3;
    });
    return inicial;
  });

  const [respuestas, setRespuestas] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [girando, setGirando] = useState(false);
  const [rotacion, setRotacion] = useState(0);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [equiposUsadosEnRonda, setEquiposUsadosEnRonda] = useState([]);

  const colores = [
    '#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B',
    '#10B981', '#EF4444', '#6366F1', '#14B8A6'
  ];

  const rondaActual = Math.floor(respuestas.length / 6) + 1;
  
  // En la ronda 4 (última ronda), permitir que los equipos se repitan
  const equiposActivos = todosLosEquipos.filter(grupo => {
    if (oportunidadesPorGrupo[grupo] === 0) return false;
    
    // Si estamos en la ronda 4, no aplicar la restricción de equipos usados
    if (rondaActual === 4) return true;
    
    // En rondas 1-3, aplicar la restricción normal
    return !equiposUsadosEnRonda.includes(grupo);
  });

  const girarRuleta = () => {
    if (girando || equiposActivos.length === 0) return;

    setGirando(true);
    setEquipoSeleccionado(null);
    const vueltasExtra = 5 + Math.random() * 3;
    const anguloExtra = Math.random() * 360;
    const rotacionTotal = rotacion + (360 * vueltasExtra) + anguloExtra;
    
    setRotacion(rotacionTotal);

    setTimeout(() => {
      const anguloFinal = rotacionTotal % 360;
      const segmentSize = 360 / equiposActivos.length;
      const indiceSeleccionado = equiposActivos.length === 1 ? 0 : Math.floor((360 - anguloFinal) / segmentSize) % equiposActivos.length;
      
      setEquipoSeleccionado(equiposActivos[indiceSeleccionado]);
      setGirando(false);
    }, 3000);
  };

  const respuestaCorrecta = () => {
    if (!equipoSeleccionado) return;
    
    const nuevasRespuestas = [...respuestas, { grupo: equipoSeleccionado, correcta: true }];
    setRespuestas(nuevasRespuestas);
    setOportunidadesPorGrupo(prev => ({
      ...prev,
      [equipoSeleccionado]: prev[equipoSeleccionado] - 1
    }));
    
    const rondaDespuesDeRespuesta = Math.floor(nuevasRespuestas.length / 6) + 1;
    
    // Solo agregar a equipos usados si NO estamos en la ronda 4
    if (rondaDespuesDeRespuesta !== 4) {
      setEquiposUsadosEnRonda(prev => [...prev, equipoSeleccionado]);
    }
    
    // Si completamos 6 respuestas en la ronda, resetear equipos usados
    if (nuevasRespuestas.length % 6 === 0) {
      setEquiposUsadosEnRonda([]);
    }
    
    setEquipoSeleccionado(null);
  };

  const respuestaIncorrecta = () => {
    if (!equipoSeleccionado) return;
    
    const nuevasRespuestas = [...respuestas, { grupo: equipoSeleccionado, correcta: false }];
    setRespuestas(nuevasRespuestas);
    setOportunidadesPorGrupo(prev => ({
      ...prev,
      [equipoSeleccionado]: prev[equipoSeleccionado] - 1
    }));
    
    const rondaDespuesDeRespuesta = Math.floor(nuevasRespuestas.length / 6) + 1;
    
    // Solo agregar a equipos usados si NO estamos en la ronda 4
    if (rondaDespuesDeRespuesta !== 4) {
      setEquiposUsadosEnRonda(prev => [...prev, equipoSeleccionado]);
    }
    
    // Si completamos 6 respuestas en la ronda, resetear equipos usados
    if (nuevasRespuestas.length % 6 === 0) {
      setEquiposUsadosEnRonda([]);
    }
    
    setEquipoSeleccionado(null);
  };

  const resetManual = () => {
    const inicial = {};
    todosLosEquipos.forEach(grupo => {
      inicial[grupo] = 3;
    });
    setOportunidadesPorGrupo(inicial);
    setRespuestas([]);
    setEquipoSeleccionado(null);
    setRotacion(0);
    setMostrarConfirmacion(false);
    setEquiposUsadosEnRonda([]);
  };

  const agruparPorRondas = () => {
    const correctas = {};
    const incorrectas = {};
    
    respuestas.forEach((resp, index) => {
      const ronda = Math.floor(index / 6) + 1;
      
      if (resp.correcta) {
        if (!correctas[ronda]) correctas[ronda] = [];
        correctas[ronda].push(resp.grupo);
      } else {
        if (!incorrectas[ronda]) incorrectas[ronda] = [];
        incorrectas[ronda].push(resp.grupo);
      }
    });
    
    return { correctas, incorrectas };
  };

  const { correctas: rondasCorrectas, incorrectas: rondasIncorrectas } = agruparPorRondas();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-10">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
          Ruleta de Equipos
        </h1>
        <p className="text-3xl font-bold text-yellow-400 mt-4">
          Ronda {Math.floor(respuestas.length / 6) + 1}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda - Respuestas Correctas */}
        <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-emerald-500/30">
          <h3 className="text-2xl font-bold text-emerald-400 mb-4 text-center">Respuestas Correctas</h3>
          <div className="space-y-4">
            {Object.entries(rondasCorrectas).map(([ronda, grupos]) => (
              <div key={ronda}>
                <p className="text-emerald-300 font-bold text-lg mb-2">Ronda {ronda}</p>
                <div className="space-y-1 ml-4">
                  {grupos.map((grupo, idx) => (
                    <p key={idx} className="text-emerald-200">{grupo}</p>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(rondasCorrectas).length === 0 && (
              <p className="text-gray-500 text-center py-4">Sin respuestas aún</p>
            )}
          </div>
        </div>

        {/* Columna central - Ruleta */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-96 h-96 mb-8">
            {/* Flecha indicadora */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-yellow-400 drop-shadow-2xl"></div>
            </div>

            {/* Círculo de la ruleta */}
            <div className="relative w-full h-full">
              <svg
                className="w-full h-full transition-transform duration-[3000ms] ease-out"
                style={{ transform: `rotate(${rotacion}deg)` }}
                viewBox="0 0 200 200"
              >
                {equiposActivos.map((equipo, index) => {
                  const segmentSize = 360 / equiposActivos.length;
                  const startAngle = index * segmentSize;
                  const endAngle = startAngle + segmentSize;
                  
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  const x1 = 100 + 100 * Math.cos(startRad);
                  const y1 = 100 + 100 * Math.sin(startRad);
                  const x2 = 100 + 100 * Math.cos(endRad);
                  const y2 = 100 + 100 * Math.sin(endRad);
                  
                  const largeArc = segmentSize > 180 ? 1 : 0;
                  
                  const pathData = `M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`;
                  
                  const midAngle = (startAngle + endAngle) / 2;
                  const textRad = (midAngle - 90) * Math.PI / 180;
                  const textX = 100 + 65 * Math.cos(textRad);
                  const textY = 100 + 65 * Math.sin(textRad);

                  const colorIndex = todosLosEquipos.indexOf(equipo);

                  return (
                    <g key={equipo}>
                      <path
                        d={pathData}
                        className="stroke-white stroke-2"
                        style={{
                          fill: colores[colorIndex],
                          opacity: 1
                        }}
                      />
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white font-bold text-xs"
                        transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                      >
                        {equipo.replace('GRUPO ', '')}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Centro de la ruleta */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
              </div>
            </div>
          </div>

          {/* Equipo seleccionado */}
          {equipoSeleccionado && (
            <div className="mb-6 animate-in zoom-in duration-500">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-12 py-6 rounded-2xl shadow-2xl">
                <p className="text-3xl font-black text-white text-center">
                  {equipoSeleccionado}
                </p>
                <p className="text-white/80 text-center text-sm mt-2">
                  Oportunidades restantes: {oportunidadesPorGrupo[equipoSeleccionado]}
                </p>
              </div>
            </div>
          )}

          {/* Botones de control */}
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={girarRuleta}
              disabled={girando || equiposActivos.length === 0}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              {girando ? 'Girando...' : 'Girar Ruleta'}
            </button>

            {equipoSeleccionado && !girando && (
              <>
                <button
                  onClick={respuestaCorrecta}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
                >
                  Correcta
                </button>

                <button
                  onClick={respuestaIncorrecta}
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
                >
                  Incorrecta
                </button>
              </>
            )}

            <button
              onClick={() => setMostrarConfirmacion(true)}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              Reset Manual
            </button>
          </div>

          {/* Oportunidades por equipo */}
          <div className="mt-8 grid grid-cols-4 gap-3">
            {todosLosEquipos.map(grupo => (
              <div key={grupo} className={`px-3 py-2 rounded-lg text-center ${oportunidadesPorGrupo[grupo] > 0 ? 'bg-slate-700' : 'bg-slate-900 opacity-50'}`}>
                <p className="text-white font-semibold text-sm">{grupo.replace('GRUPO ', 'G')}</p>
                <p className="text-gray-400 text-xs">{oportunidadesPorGrupo[grupo]} oport.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha - Respuestas Incorrectas */}
        <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-red-500/30">
          <h3 className="text-2xl font-bold text-red-400 mb-4 text-center">Respuestas Incorrectas</h3>
          <div className="space-y-4">
            {Object.entries(rondasIncorrectas).map(([ronda, grupos]) => (
              <div key={ronda}>
                <p className="text-red-300 font-bold text-lg mb-2">Ronda {ronda}</p>
                <div className="space-y-1 ml-4">
                  {grupos.map((grupo, idx) => (
                    <p key={idx} className="text-red-200">{grupo}</p>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(rondasIncorrectas).length === 0 && (
              <p className="text-gray-500 text-center py-4">Sin respuestas aún</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">¿Estás seguro?</h3>
            <p className="text-gray-300 mb-6">Esto reseteará todas las oportunidades, respuestas correctas e incorrectas.</p>
            <div className="flex gap-4">
              <button
                onClick={resetManual}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Sí, resetear
              </button>
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}