import { useState } from 'react';

export default function RuletaDesempate() {
  const [equipos, setEquipos] = useState([]);
  const [nuevoEquipo, setNuevoEquipo] = useState('');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [girando, setGirando] = useState(false);
  const [rotacion, setRotacion] = useState(0);
  const [historial, setHistorial] = useState([]);

  const colores = [
    '#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B',
    '#10B981', '#EF4444', '#6366F1', '#14B8A6',
    '#F97316', '#84CC16', '#A855F7', '#EAB308'
  ];

  const agregarEquipo = () => {
    if (nuevoEquipo.trim() && !equipos.includes(nuevoEquipo.trim())) {
      setEquipos([...equipos, nuevoEquipo.trim()]);
      setNuevoEquipo('');
    }
  };

  const eliminarEquipo = (equipoAEliminar) => {
    setEquipos(equipos.filter(e => e !== equipoAEliminar));
  };

  const girarRuleta = () => {
    if (girando || equipos.length === 0) return;

    setGirando(true);
    setEquipoSeleccionado(null);
    const vueltasExtra = 5 + Math.random() * 3;
    const anguloExtra = Math.random() * 360;
    const rotacionTotal = rotacion + (360 * vueltasExtra) + anguloExtra;
    
    setRotacion(rotacionTotal);

    setTimeout(() => {
      const anguloFinal = rotacionTotal % 360;
      const segmentSize = 360 / equipos.length;
      const indiceSeleccionado = equipos.length === 1 ? 0 : Math.floor((360 - anguloFinal) / segmentSize) % equipos.length;
      
      setEquipoSeleccionado(equipos[indiceSeleccionado]);
      setHistorial(prev => [...prev, equipos[indiceSeleccionado]]);
      setGirando(false);
    }, 3000);
  };

  const limpiarSeleccion = () => {
    setEquipoSeleccionado(null);
  };

  const resetearTodo = () => {
    setEquipos([]);
    setNuevoEquipo('');
    setEquipoSeleccionado(null);
    setRotacion(0);
    setHistorial([]);
  };

  const limpiarHistorial = () => {
    setHistorial([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Ruleta de Desempate
          </h1>
          <p className="text-xl text-gray-400 mt-3">Agrega los equipos que quieras y gira</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel izquierdo - Gestión de equipos */}
          <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-purple-500/30">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Equipos Participantes</h3>
            
            {/* Agregar equipo */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nuevoEquipo}
                  onChange={(e) => setNuevoEquipo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && agregarEquipo()}
                  placeholder="Nombre del equipo..."
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={agregarEquipo}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  +
                </button>
              </div>
            </div>

            {/* Lista de equipos */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {equipos.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Agrega equipos para comenzar</p>
              ) : (
                equipos.map((equipo, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-700/50 px-4 py-3 rounded-lg group">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: colores[idx % colores.length] }}
                      ></div>
                      <span className="text-white font-semibold">{equipo}</span>
                    </div>
                    <button
                      onClick={() => eliminarEquipo(equipo)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-200 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-gray-400 text-sm">Total: <span className="text-white font-bold">{equipos.length}</span> equipos</p>
            </div>
          </div>

          {/* Panel central - Ruleta */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-80 h-80 mb-8">
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
                  {equipos.map((equipo, index) => {
                    const segmentSize = 360 / equipos.length;
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

                    return (
                      <g key={equipo}>
                        <path
                          d={pathData}
                          className="stroke-white stroke-2"
                          style={{
                            fill: colores[index % colores.length],
                            opacity: 1
                          }}
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-white font-bold"
                          style={{ fontSize: equipos.length > 6 ? '8px' : '10px' }}
                          transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                        >
                          {equipo.length > 15 ? equipo.substring(0, 12) + '...' : equipo}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Centro de la ruleta */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                </div>
              </div>
            </div>

            {/* Equipo seleccionado */}
            {equipoSeleccionado && (
              <div className="mb-6 animate-in zoom-in duration-500">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-10 py-5 rounded-2xl shadow-2xl">
                  <p className="text-sm font-semibold text-white/80 text-center mb-1">¡Seleccionado!</p>
                  <p className="text-3xl font-black text-white text-center">
                    {equipoSeleccionado}
                  </p>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={girarRuleta}
                disabled={girando || equipos.length === 0}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
              >
                {girando ? 'Girando...' : 'Girar Ruleta'}
              </button>

              {equipoSeleccionado && !girando && (
                <button
                  onClick={limpiarSeleccion}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
                >
                  Limpiar
                </button>
              )}

              <button
                onClick={resetearTodo}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Panel derecho - Historial */}
          <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-cyan-400">Historial de Giros</h3>
              {historial.length > 0 && (
                <button
                  onClick={limpiarHistorial}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {historial.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay giros aún</p>
              ) : (
                historial.map((equipo, idx) => (
                  <div key={idx} className="bg-slate-700/50 px-4 py-3 rounded-lg flex items-center gap-3">
                    <div className="bg-cyan-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      {historial.length - idx}
                    </div>
                    <span className="text-white font-semibold">{equipo}</span>
                  </div>
                ))
              ).reverse()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}