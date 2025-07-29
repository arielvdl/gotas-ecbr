'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRanking, mockPrizes, currentUser } from '@/lib/mock-data';

type TabType = 'ranking' | 'prizes';

export default function MinimalistRankingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ranking');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentUserRanking = mockRanking.findIndex(
    (entry) => entry.user.email === currentUser.email
  ) + 1 || mockRanking.length + 1;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-950 to-black opacity-90" />
      
      {/* Main container with massive padding for luxury feel */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-24">
        
        {/* Header with fade-in animation */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-20 md:mb-32"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-4">
            GOTAS
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-light tracking-widest">
            ECBR EXCLUSIVE RANKING
          </p>
        </motion.header>

        {/* Minimalist Tab Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex gap-12 md:gap-20">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`text-2xl md:text-3xl font-light tracking-wide transition-all duration-500 ${
                activeTab === 'ranking'
                  ? 'text-white'
                  : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              Ranking
              {activeTab === 'ranking' && (
                <motion.div
                  layoutId="activeTab"
                  className="h-px bg-white mt-2"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('prizes')}
              className={`text-2xl md:text-3xl font-light tracking-wide transition-all duration-500 ${
                activeTab === 'prizes'
                  ? 'text-white'
                  : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              Prizes
              {activeTab === 'prizes' && (
                <motion.div
                  layoutId="activeTab"
                  className="h-px bg-white mt-2"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </motion.nav>

        {/* Content Area with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          {activeTab === 'ranking' ? (
            <motion.div
              key="ranking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* User Stats - Minimal and Elegant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-20 md:mb-32"
              >
                <div className="space-y-6">
                  <div>
                    <p className="text-neutral-500 text-sm uppercase tracking-widest mb-2">
                      Your Position
                    </p>
                    <p className="text-6xl md:text-8xl font-light">
                      #{currentUserRanking}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-sm uppercase tracking-widest mb-2">
                      Total Drops
                    </p>
                    <p className="text-4xl md:text-5xl font-light">
                      {currentUser.totalDrops}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Ranking List - Ultra Minimal */}
              <div className="space-y-8">
                <h2 className="text-neutral-500 text-sm uppercase tracking-widest mb-12">
                  Top Performers
                </h2>
                {mockRanking.slice(0, 10).map((entry, index) => (
                  <motion.div
                    key={entry.user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between py-6 border-b border-neutral-900 hover:border-neutral-700 transition-colors duration-500">
                      <div className="flex items-center gap-8 md:gap-12">
                        <span className={`text-2xl md:text-3xl font-light ${
                          entry.position <= 3 ? 'text-white' : 'text-neutral-600'
                        }`}>
                          {String(entry.position).padStart(2, '0')}
                        </span>
                        <span className="text-lg md:text-xl font-light group-hover:translate-x-2 transition-transform duration-300">
                          {entry.user.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg md:text-xl font-light text-neutral-400">
                          {entry.totalDrops}
                        </span>
                        <span className="text-sm text-neutral-600 ml-2">drops</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="prizes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Prizes Grid - Luxury Presentation */}
              <div className="space-y-24 md:space-y-32">
                {mockPrizes.map((prize, index) => (
                  <motion.div
                    key={prize.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="group"
                  >
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                      <div className="order-2 md:order-1">
                        <div className="space-y-6">
                          <p className="text-neutral-500 text-sm uppercase tracking-widest">
                            {prize.position === 1 ? 'First Place' : 
                             prize.position === 2 ? 'Second Place' : 'Third Place'}
                          </p>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
                            {prize.name}
                          </h3>
                          <p className="text-neutral-400 text-lg font-light leading-relaxed">
                            {prize.description}
                          </p>
                          <div className="pt-6">
                            <p className="text-neutral-500 text-sm uppercase tracking-widest mb-2">
                              Value
                            </p>
                            <p className="text-2xl md:text-3xl font-light">
                              R$ {prize.value.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="order-1 md:order-2">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.4 }}
                          className="aspect-square bg-neutral-900 rounded-lg overflow-hidden relative group"
                        >
                          {/* Placeholder for image - using gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl md:text-8xl font-light text-neutral-700">
                              {prize.position}
                            </span>
                          </div>
                          {/* Subtle hover effect */}
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer - Minimal */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.3 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-32 md:mt-48 text-center"
        >
          <p className="text-neutral-600 text-xs uppercase tracking-widest">
            ECBR 2025 · Exclusive Edition
          </p>
        </motion.footer>
      </div>

      {/* Ambient animation elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}