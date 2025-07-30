'use client';

import { useState } from 'react';
import { mockRanking, mockPrizes, currentUser } from '@/lib/mock-data';
import { RankingEntry } from '@/lib/mock-data';

function RefinedBrutalistRankingList({ rankings, currentUserId }: { rankings: RankingEntry[]; currentUserId?: string }) {
  return (
    <div className="space-y-8">
      {rankings.map((entry, index) => {
        const isTopThree = entry.position <= 3;
        const isCurrentUser = entry.user.id === currentUserId;
        
        return (
          <div
            key={entry.user.id}
            className={`
              relative group
              ${index % 2 === 0 ? 'ml-0 mr-4' : 'ml-4 mr-0'}
            `}
            style={{
              transform: `rotate(${index % 3 === 0 ? -0.5 : index % 3 === 1 ? 0.3 : -0.3}deg)`,
            }}
          >            
            <div className={`
              relative border-4 p-6 flex items-center gap-6
              ${isTopThree 
                ? 'border-amber-400 bg-zinc-950 shadow-[0_0_30px_rgba(245,158,11,0.3)]' 
                : 'border-zinc-700 bg-zinc-900'
              }
              ${isCurrentUser ? 'shadow-[0_0_40px_rgba(59,130,246,0.4)]' : ''}
              transition-all duration-300 ease-out
              hover:translate-x-1 hover:translate-y-0.5
              hover:shadow-[8px_8px_0px_rgba(168,85,247,0.8)]
            `}>
              {/* Minimal corner accents */}
              <div className={`
                absolute -top-2 -left-2 w-4 h-4
                ${isTopThree ? 'bg-amber-400' : 'bg-zinc-600'}
              `} />
              <div className={`
                absolute -bottom-2 -right-2 w-4 h-4
                ${isTopThree ? 'bg-amber-400' : 'bg-zinc-600'}
              `} />
              
              {/* Position */}
              <div className={`
                relative w-16 h-16 flex items-center justify-center
                ${isTopThree 
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
                  : 'bg-zinc-800 text-white border-2 border-zinc-600'
                }
                transform rotate-6 group-hover:rotate-0 transition-transform duration-300
              `}>
                <span className="text-2xl font-bold tracking-tight transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                  {entry.position}
                </span>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                  {entry.user.name}
                  {isCurrentUser && (
                    <span className="text-blue-400 ml-2 text-lg animate-pulse drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
                      (VOCÊ)
                    </span>
                  )}
                </h3>
                {/* Refined underline */}
                <div className="h-0.5 w-2/3 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              </div>

              {/* Drops Count */}
              <div className="text-right">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
                  {entry.totalDrops}
                </p>
                <p className="text-sm font-semibold uppercase tracking-wider text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
                  GOTAS
                </p>
              </div>

              {/* Subtle decoration */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-16 bg-gradient-to-b from-purple-500 to-pink-500 opacity-15" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function V11Page() {
  const [activeTab, setActiveTab] = useState<'prizes' | 'ranking'>('prizes');

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.03) 40px, rgba(255,255,255,.03) 80px)`,
        }} />
      </div>

      {/* Refined grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Header */}
      <header className="relative py-12 px-4 border-b-4 border-purple-500 shadow-[0_8px_32px_rgba(168,85,247,0.3)]">
        <div className="max-w-6xl mx-auto">
          {/* Refined title container */}
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-30" />
            <h1 className="relative text-6xl md:text-7xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                WEB3
              </span>
              <span className="text-white ml-3 drop-shadow-[3px_3px_0px_rgba(168,85,247,0.8)]">
                ARENA
              </span>
            </h1>
            {/* Minimal accent blocks */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-amber-400" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-400" />
          </div>
          
          <div className="mt-8 relative">
            <p className="text-xl md:text-2xl font-semibold uppercase tracking-wide text-zinc-300 transform -rotate-0.5">
              <span className="inline-block border-2 border-purple-500 px-6 py-3 shadow-[3px_3px_0px_rgba(168,85,247,0.8)]">
                RESGATE AS GOTAS
              </span>
              <span className="inline-block ml-6 text-amber-400 animate-pulse drop-shadow-[0_0_16px_rgba(245,158,11,0.6)]">
                OS MELHORES GANHAM
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Refined Tab Container */}
          <div className="mb-12 relative">
            <div className="flex gap-8 justify-center">
              <button
                onClick={() => setActiveTab('prizes')}
                className={`
                  relative px-10 py-5 text-xl font-bold uppercase tracking-wide
                  transform transition-all duration-300
                  ${activeTab === 'prizes' 
                    ? 'rotate-0.5 translate-y-0.5' 
                    : '-rotate-0.5 hover:rotate-0'
                  }
                `}
              >
                <div className={`
                  absolute inset-0
                  ${activeTab === 'prizes'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_30px_rgba(168,85,247,0.6)]'
                    : 'bg-zinc-800 border-2 border-zinc-600'
                  }
                `} />
                <span className={`
                  relative z-10
                  ${activeTab === 'prizes'
                    ? 'text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]'
                    : 'text-zinc-300'
                  }
                `}>
                  PRÊMIOS
                </span>
                {activeTab === 'prizes' && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.6)]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('ranking')}
                className={`
                  relative px-10 py-5 text-xl font-bold uppercase tracking-wide
                  transform transition-all duration-300
                  ${activeTab === 'ranking' 
                    ? '-rotate-0.5 translate-y-0.5' 
                    : 'rotate-0.5 hover:rotate-0'
                  }
                `}
              >
                <div className={`
                  absolute inset-0
                  ${activeTab === 'ranking'
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0_0_30px_rgba(236,72,153,0.6)]'
                    : 'bg-zinc-800 border-2 border-zinc-600'
                  }
                `} />
                <span className={`
                  relative z-10
                  ${activeTab === 'ranking'
                    ? 'text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]'
                    : 'text-zinc-300'
                  }
                `}>
                  RANKING
                </span>
                {activeTab === 'ranking' && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.6)]" />
                )}
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'prizes' ? (
            /* Refined Prizes Section */
            <div className="space-y-10">
              {mockPrizes.map((prize, index) => (
                <div
                  key={prize.id}
                  className={`
                    relative group
                    ${index % 2 === 0 ? 'ml-0 mr-8' : 'ml-8 mr-0'}
                  `}
                  style={{
                    transform: `rotate(${index === 0 ? -1 : index === 1 ? 0.8 : -0.6}deg)`,
                  }}
                >
                  {/* Subtle backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 blur-lg opacity-20" />
                  
                  <div className="relative border-4 border-amber-400 bg-zinc-950 p-8 flex items-center gap-8 shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[6px_6px_0px_rgba(245,158,11,0.8)] transition-all duration-300">
                    {/* Position Badge */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center transform -rotate-6 shadow-[0_0_24px_rgba(245,158,11,0.6)]">
                        <span className="text-3xl font-bold text-black transform rotate-6">
                          {prize.position}°
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-pink-500" />
                    </div>

                    {/* Prize Image */}
                    <div className="relative">
                      <div className="w-36 h-28 bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center">
                        <span className="text-blue-400 font-semibold uppercase tracking-wide">LEDGER</span>
                      </div>
                      <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400" />
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500" />
                    </div>

                    {/* Prize Info */}
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_rgba(168,85,247,0.8)]">
                        {prize.name}
                      </h3>
                      <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mt-3 drop-shadow-[0_0_16px_rgba(245,158,11,0.6)]">
                        R$ {prize.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    {/* Minimal decorations */}
                    <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                    <div className="absolute bottom-0 left-0 w-1 h-16 bg-gradient-to-b from-pink-500 to-orange-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Ranking Section */
            <RefinedBrutalistRankingList rankings={mockRanking} currentUserId={currentUser.id} />
          )}
        </div>
      </main>

      {/* Subtle floating elements */}
      <div className="fixed bottom-12 right-12 w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 blur-2xl opacity-15 animate-pulse" />
      <div className="fixed top-1/2 left-12 w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 blur-xl opacity-15 animate-pulse" />
    </div>
  );
}