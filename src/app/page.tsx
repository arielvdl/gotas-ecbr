'use client';

import { useState, useEffect } from 'react';
import { mockPrizes } from '@/lib/mock-data';
import { fetchRanking, RankingUser } from '@/services/ranking';

function NeonBrutalistRankingList({ rankings }: { rankings: RankingUser[] }) {
  const hasUndefined = rankings.some(r => !r.definido);
  return (
    <div className="space-y-6">
      {rankings.map((entry, index) => {
        const isTopThree = (entry.position || index + 1) <= 3;
        
        return (
          <div
            key={entry.id}
            className={`
              relative group
              ${index % 2 === 0 ? 'ml-0 mr-8' : 'ml-8 mr-0'}
            `}
            style={{
              transform: `rotate(${index % 3 === 0 ? -1 : index % 3 === 1 ? 0.5 : -0.5}deg)`,
            }}
          >
            {/* Neon glow background */}
            {isTopThree && (
              <div className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
            )}
            
            <div className={`
              relative border-8 p-4 sm:p-6 flex items-center gap-4 sm:gap-6
              ${isTopThree 
                ? 'border-yellow-400 bg-black shadow-[0_0_50px_rgba(251,191,36,0.5)]' 
                : 'border-gray-700 bg-zinc-900'
              }
              transition-all duration-300
              hover:translate-x-2 hover:translate-y-1
              hover:shadow-[15px_15px_0px_rgba(236,72,153,1)]
            `}>
              {/* Brutalist corner accent */}
              <div className={`
                absolute -top-4 -left-4 w-8 h-8
                ${isTopThree ? 'bg-yellow-400' : 'bg-gray-700'}
              `} />
              <div className={`
                absolute -bottom-4 -right-4 w-8 h-8
                ${isTopThree ? 'bg-yellow-400' : 'bg-gray-700'}
              `} />
              
              {/* Position */}
              <div className={`
                relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center
                ${isTopThree 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-600 text-black shadow-[0_0_30px_rgba(251,191,36,0.6)]' 
                  : 'bg-gray-800 text-white border-4 border-gray-600'
                }
                transform rotate-12 group-hover:rotate-0 transition-transform duration-300
              `}>
                <span className="text-2xl sm:text-3xl font-black tracking-tighter transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  {entry.position || index + 1}
                </span>
              </div>

              {/* User Info */}
              <div className="flex-1">
                {entry.definido === false ? (
                  <>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-wider text-yellow-400 animate-pulse">
                      🏆 {entry.position}º LUGAR DISPONÍVEL!
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 mt-1">
                      15 gotas? Envie email para <span className="text-cyan-400 font-bold">as@gotas.social</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Primeiros emails garantem as posições!
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                      {entry.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 mt-1">
                      ID: {entry.id}
                    </p>
                  </>
                )}
                {/* Neon underline */}
                <div className="h-1 w-3/4 mt-1 bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
              </div>

              {/* Drops Count */}
              <div className="text-right">
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                  {entry.drops}
                </p>
                <p className="text-sm sm:text-base font-black uppercase tracking-widest text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                  GOTAS
                </p>
              </div>

              {/* Brutalist decoration */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-24 bg-gradient-to-b from-cyan-500 to-purple-500 opacity-20" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'prizes' | 'ranking'>('prizes');
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'ranking') {
      loadRankings();
    }
  }, [activeTab]);

  const loadRankings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRanking();
      setRankings(data);
    } catch (err) {
      setError('Erro ao carregar o ranking. Tente novamente mais tarde.');
      console.error('Error loading rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Header */}
      <header className="relative py-8 px-4 sm:py-12 border-b-8 border-pink-500">
        <div className="max-w-6xl mx-auto">
          {/* Title with Logo */}
          <div className="flex items-center gap-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                WEB3
              </span>
              <span className="text-white ml-2">
                ARENA
              </span>
            </h1>
            <img 
              src="https://88ae784e400c50e563482987bb9e892e.cdn.bubble.io/d215/f1734637291846x773314381854655700/logo_gotas_v2_clean.svg"
              alt="Gotas Logo"
              className="w-[70px] h-[70px]"
            />
          </div>
          
          <div className="mt-6 relative">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-gray-300 transform -rotate-1">
              <span className="inline-block border-4 border-pink-500 px-4 py-2 shadow-[4px_4px_0px_rgba(236,72,153,1)]">
                RESGATE AS GOTAS
              </span>
              <span className="inline-block ml-4 text-yellow-400 animate-pulse drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
                OS MELHORES GANHAM
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Brutalist Tab Container */}
          <div className="mb-12 relative">
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => setActiveTab('prizes')}
                className={`
                  relative px-8 py-4 sm:px-12 sm:py-6 text-xl sm:text-2xl font-black uppercase tracking-wider
                  transform transition-all duration-300
                  ${activeTab === 'prizes' 
                    ? 'rotate-1 translate-y-1' 
                    : '-rotate-1 hover:rotate-0'
                  }
                `}
              >
                <div className={`
                  absolute inset-0
                  ${activeTab === 'prizes'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_40px_rgba(6,182,212,0.8)]'
                    : 'bg-gray-800 border-4 border-gray-600'
                  }
                `} />
                <span className={`
                  relative z-10
                  ${activeTab === 'prizes'
                    ? 'text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,0.3)]'
                    : 'text-gray-300'
                  }
                `}>
                  PRÊMIOS
                </span>
                {activeTab === 'prizes' && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-yellow-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('ranking')}
                className={`
                  relative px-8 py-4 sm:px-12 sm:py-6 text-xl sm:text-2xl font-black uppercase tracking-wider
                  transform transition-all duration-300
                  ${activeTab === 'ranking' 
                    ? '-rotate-1 translate-y-1' 
                    : 'rotate-1 hover:rotate-0'
                  }
                `}
              >
                <div className={`
                  absolute inset-0
                  ${activeTab === 'ranking'
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_40px_rgba(236,72,153,0.8)]'
                    : 'bg-gray-800 border-4 border-gray-600'
                  }
                `} />
                <span className={`
                  relative z-10
                  ${activeTab === 'ranking'
                    ? 'text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,0.3)]'
                    : 'text-gray-300'
                  }
                `}>
                  RANKING
                </span>
                {activeTab === 'ranking' && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                )}
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'prizes' ? (
            /* Prizes Section */
            <div className="space-y-8">
              {mockPrizes.map((prize, index) => (
                <div
                  key={prize.id}
                  className={`
                    relative group
                    ${index % 2 === 0 ? 'ml-0 mr-12' : 'ml-12 mr-0'}
                  `}
                  style={{
                    transform: `rotate(${index === 0 ? -2 : index === 1 ? 1.5 : -1}deg)`,
                  }}
                >
                  {/* Neon backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 blur-xl opacity-30" />
                  
                  <div className="relative border-8 border-yellow-400 bg-black p-6 sm:p-8 flex items-center gap-8 sm:gap-12 shadow-[0_0_6px_rgba(251,191,36,0.6)] sm:shadow-[0_0_60px_rgba(251,191,36,0.6)] hover:shadow-[10px_10px_0px_rgba(251,191,36,1)] transition-all duration-300">
                    {/* Position Badge */}
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center transform -rotate-12 shadow-[0_0_4px_rgba(251,191,36,0.8)] sm:shadow-[0_0_40px_rgba(251,191,36,0.8)]">
                        <span className="text-3xl sm:text-4xl font-black text-black transform rotate-12">
                          {prize.position}°
                        </span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-500" />
                    </div>

                    {/* Prize Info */}
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white sm:drop-shadow-[3px_3px_0px_rgba(236,72,153,1)]">
                        {prize.position === 1 && 'LEDGER STAX'}
                        {prize.position === 2 && 'LEDGER FLEX'}
                        {prize.position === 3 && 'FUSELABS'}
                        {prize.position === 4 && 'ONEKEY CLASSIC 1S'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 mt-1 font-medium">
                        {prize.position === 1 && '+ Recovery Key + BTC $40 + Concierge'}
                        {prize.position === 2 && '+ Recovery Key + BTC $20 + Concierge'}
                        {prize.position === 3 && 'Crédito para usar e-commerce'}
                        {prize.position === 4 && '+ Curso Completo'}
                      </p>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 mt-3 drop-shadow-[0_0_2px_rgba(251,191,36,0.8)] sm:drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
                        R$ {prize.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      
                      {/* Botões Ver no Site/Ver Mais */}
                      {prize.position > 0 && (
                        <div className="mt-4">
                          <a
                            href={
                              prize.position === 1 
                                ? "https://shop.ledger.com/pt/products/ledger-stax?srsltid=AfmBOop0n8K8etxmt32VyQvYLUHLDZWDd3Lit4_CqWohkEKYmeQMF5hG"
                                : prize.position === 2
                                ? "https://shop.ledger.com/pt/pages/ledger-flex?srsltid=AfmBOorKawPQAOjWr7mrxv9oy9KnxwHczdBk8_w9j2kexuht9SLKwRkr"
                                : prize.position === 3 
                                ? "https://fuselabs.com.br/?utm_source=ecbr&utm_campaign=&utm_medium=&utm_content=&utm_term="
                                : "https://prohash.com.br/products/onekey-classic"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block group"
                          >
                            <div className="relative transform transition-all duration-300 hover:translate-x-1 hover:translate-y-0.5">
                              <div className="relative border-4 border-purple-500 bg-black px-6 py-2 shadow-[1px_1px_0px_rgba(168,85,247,1)] sm:shadow-[3px_3px_0px_rgba(168,85,247,1)] hover:shadow-[5px_5px_0px_rgba(236,72,153,1)]">
                                <span className="text-sm font-black uppercase tracking-wider text-white">
                                  {prize.position === 3 ? 'VER MAIS →' : 'VER NO SITE →'}
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Brutalist decorations */}
                    <div className="absolute top-0 right-0 w-20 h-2 bg-gradient-to-r from-cyan-500 to-purple-500" />
                    <div className="absolute bottom-0 left-0 w-2 h-20 bg-gradient-to-b from-pink-500 to-orange-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Ranking Section */
            <div className="relative">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                  <p className="mt-4 text-xl font-bold text-gray-300">Carregando ranking...</p>
                </div>
              ) : error ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 blur-3xl opacity-30" />
                  <div className="relative border-8 border-red-500 bg-black p-8 text-center shadow-[0_0_60px_rgba(239,68,68,0.6)]">
                    <p className="text-xl font-bold text-red-400">{error}</p>
                    <button 
                      onClick={loadRankings}
                      className="mt-4 inline-block group"
                    >
                      <div className="relative transform transition-all duration-300 hover:translate-x-1 hover:translate-y-0.5">
                        <div className="relative border-4 border-cyan-400 bg-black px-6 py-2 shadow-[3px_3px_0px_rgba(6,182,212,1)] hover:shadow-[5px_5px_0px_rgba(236,72,153,1)]">
                          <span className="text-sm font-black uppercase tracking-wider text-white">
                            TENTAR NOVAMENTE
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : rankings.length > 0 ? (
                <div>
                  {/* Título do Ranking */}
                  <div className="relative mb-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-3xl opacity-30" />
                    <div className="relative border-8 border-purple-500 bg-black p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(168,85,247,0.6)] transform -rotate-1">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[3px_3px_0px_rgba(236,72,153,1)]">
                        🏆 TOP 4 COLETORES DE GOTAS
                      </h2>
                      <p className="mt-4 text-lg sm:text-xl text-cyan-400 font-bold drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                        Os melhores da arena até agora!
                      </p>
                    </div>
                  </div>
                  
                  {/* Lista de Rankings */}
                  <NeonBrutalistRankingList rankings={rankings} />
                  
                  {/* Aviso sobre 3º e 4º lugares */}
                  <div className="mt-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 blur-2xl opacity-30" />
                    <div className="relative border-4 border-yellow-400 bg-black p-6 shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                      <h3 className="text-lg sm:text-xl font-black uppercase text-yellow-400 mb-3 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
                        ⚠️ ATENÇÃO: 3º E 4º LUGARES DISPONÍVEIS!
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        Você tem <span className="text-cyan-400 font-bold">15 gotas</span>? Os prêmios de 3º e 4º lugar serão dados aos 
                        <span className="text-pink-400 font-bold"> primeiros que enviarem email</span> para 
                        <a href="mailto:as@gotas.social" className="text-cyan-400 font-bold underline ml-1">as@gotas.social</a>
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-2">
                        Candidatos com 15 gotas: Aislan Vargas (160954), Eco Dry SP (111402), Fabio Melo (161948)
                      </p>
                    </div>
                  </div>
                  
                  {/* Informações sobre o ranking completo */}
                  <div className="mt-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 blur-2xl opacity-20" />
                    <div className="relative border-4 border-yellow-400 bg-black p-6 text-center shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        <span className="text-yellow-400 font-bold">📍 Dia 31, às 17h</span> - Ranking completo e distribuição dos prêmios!
                        <span className="block mt-2 text-base text-gray-400">
                          Continue resgatando gotas para subir no ranking!
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Botão O que é gotas? */}
                  <div className="mt-8 text-center">
                    <a
                      href="https://the.gotas.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block group"
                    >
                      <div className="relative transform transition-all duration-300 hover:translate-x-1 hover:translate-y-0.5">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                        <div className="relative border-4 border-cyan-400 bg-black px-8 py-4 shadow-[5px_5px_0px_rgba(6,182,212,1)] hover:shadow-[8px_8px_0px_rgba(236,72,153,1)]">
                          <span className="text-lg font-black uppercase tracking-wider text-white">
                            O QUE É GOTAS? 💧
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                /* Mensagem temporária quando não há dados */
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-3xl opacity-30" />
                  <div className="relative border-8 border-purple-500 bg-black p-8 sm:p-12 text-center shadow-[0_0_60px_rgba(168,85,247,0.6)] transform -rotate-1">
                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400" />
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-cyan-400" />
                    <div className="relative">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 drop-shadow-[3px_3px_0px_rgba(236,72,153,1)]">
                        🏆 RANKING EM BREVE
                      </h2>
                      <p className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                        Aguarde os primeiros coletores!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Floating neon elements */}
      <div className="fixed bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-500 blur-3xl opacity-20 animate-pulse" />
      <div className="fixed top-1/2 left-8 w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 blur-2xl opacity-20 animate-pulse" />

      {/* Footer */}
      <footer className="relative py-8 px-4 text-center border-t-4 border-gray-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 blur-2xl opacity-20" />
            <div className="relative border-4 border-yellow-400 bg-black p-4 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
              <p className="text-base sm:text-lg font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
                🏆 ATENÇÃO GANHADORES
              </p>
              <p className="text-sm sm:text-base text-gray-300 mt-2">
                Os ganhadores serão contactados até o dia <span className="text-cyan-400 font-bold">2 de agosto</span> para receber o cupom dos prêmios.
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base font-medium text-gray-500">
            © 2023 gotas.com
          </p>
        </div>
      </footer>
    </div>
  );
}