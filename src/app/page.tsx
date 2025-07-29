'use client';

import { useState } from 'react';
import { mockRanking, mockPrizes, currentUser } from '@/lib/mock-data';
import { RankingList } from '@/components/features/RankingList';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'prizes' | 'ranking'>('prizes');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 px-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-400 tracking-wider">WEB3 ARENA</h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-300">
            Resgate as gotas de cada painel. Os melhores no ranking, ganham:
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('prizes')}
              className={`px-8 py-3 rounded-full text-lg font-medium transition-colors ${
                activeTab === 'prizes'
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              prêmios
            </button>
            <button
              onClick={() => setActiveTab('ranking')}
              className={`px-8 py-3 rounded-full text-lg font-medium transition-colors ${
                activeTab === 'ranking'
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              ranking
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'prizes' ? (
            /* Prizes Section */
            <div className="space-y-4">
              {mockPrizes.map((prize) => (
              <div
                key={prize.id}
                className="bg-gray-900 rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-6"
              >
                {/* Position Badge */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg sm:text-2xl font-bold">{prize.position}°</span>
                </div>

                {/* Prize Image Placeholder */}
                <div className="w-24 h-20 sm:w-32 sm:h-24 bg-white rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-xs">Imagem</span>
                </div>

                {/* Prize Info */}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium">{prize.name}</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-400 mt-1">
                    R$ {prize.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
            </div>
          ) : (
            /* Ranking Section */
            <RankingList rankings={mockRanking} currentUserId={currentUser.id} />
          )}
        </div>
      </main>
    </div>
  );
}