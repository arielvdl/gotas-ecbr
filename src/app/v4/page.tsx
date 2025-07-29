'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRanking, mockPrizes, currentUser } from '@/lib/mock-data';

type TabType = 'ranking' | 'prizes';

interface Star {
  id: number;
  x: number;
  y: number;
  speed: number;
}

export default function RetroGamingRankingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ranking');
  const [isVisible, setIsVisible] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [blinkState, setBlinkState] = useState(true);
  const [coinAnimation, setCoinAnimation] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Retro colors palette
  const retroColors = {
    darkBlue: '#0f0f23',
    brightBlue: '#00e5ff',
    hotPink: '#ff006e',
    neonGreen: '#39ff14',
    yellow: '#ffff00',
    orange: '#ff8c00',
    purple: '#b700ff',
    cyan: '#00ffff',
    red: '#ff0040',
  };

  useEffect(() => {
    setIsVisible(true);

    // Generate stars for background
    const starCount = 100;
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: Math.random() * 2 + 0.5,
    }));
    setStars(newStars);

    // Blinking effect for retro feel
    const blinkInterval = setInterval(() => {
      setBlinkState(prev => !prev);
    }, 500);

    // Coin animation trigger
    const coinInterval = setInterval(() => {
      setCoinAnimation(true);
      setTimeout(() => setCoinAnimation(false), 1000);
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(coinInterval);
    };
  }, []);

  // Animate stars
  useEffect(() => {
    const animateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          let newY = star.y + star.speed;
          if (newY > window.innerHeight) {
            newY = -10;
          }
          return { ...star, y: newY };
        })
      );
    };

    const interval = setInterval(animateStars, 50);
    return () => clearInterval(interval);
  }, []);

  const currentUserRanking = mockRanking.findIndex(
    (entry) => entry.user.email === currentUser.email
  ) + 1 || mockRanking.length + 1;

  // Get medal emoji for positions
  const getMedal = (position: number) => {
    switch(position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  // Get health bar percentage
  const getHealthBar = (drops: number, maxDrops: number = 50) => {
    return Math.min((drops / maxDrops) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative pixelated">
      {/* Custom pixel font style */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixelated {
          font-family: 'Press Start 2P', cursive;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        .pixel-border {
          box-shadow: 
            0 0 0 2px #000,
            0 0 0 4px #fff,
            0 0 0 6px #000,
            0 0 0 8px #fff,
            0 0 0 10px #000;
        }

        .pixel-border-sm {
          box-shadow: 
            0 0 0 1px #000,
            0 0 0 2px #fff,
            0 0 0 3px #000;
        }

        .health-bar {
          background: linear-gradient(
            to right,
            #00ff00 0%,
            #00ff00 50%,
            #ffff00 75%,
            #ff0000 100%
          );
        }

        .blink {
          animation: blink 0.5s step-end infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .coin-spin {
          animation: coinSpin 1s linear infinite;
        }

        @keyframes coinSpin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        .scanlines::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
        }

        .crt-flicker {
          animation: crtFlicker 0.15s infinite;
        }

        @keyframes crtFlicker {
          0% { opacity: 0.98; }
          5% { opacity: 0.95; }
          10% { opacity: 0.9; }
          15% { opacity: 0.98; }
          20% { opacity: 1; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Animated star field background */}
      <div className="fixed inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              boxShadow: '0 0 2px #fff',
            }}
          />
        ))}
      </div>

      {/* Scanlines effect */}
      <div className="fixed inset-0 scanlines pointer-events-none z-50 opacity-50" />

      {/* CRT monitor effect */}
      <div className="fixed inset-0 crt-flicker pointer-events-none z-40" />

      {/* Main container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8">
        
        {/* Header - Arcade Style */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="bg-gradient-to-b from-blue-900 to-purple-900 p-6 md:p-8 pixel-border">
            {/* Title with retro gradient */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4"
              style={{
                background: `linear-gradient(180deg, ${retroColors.yellow} 0%, ${retroColors.orange} 50%, ${retroColors.hotPink} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '4px 4px 0px rgba(0,0,0,0.5)',
              }}
              animate={{
                textShadow: [
                  '4px 4px 0px rgba(0,0,0,0.5)',
                  '6px 6px 0px rgba(0,0,0,0.5)',
                  '4px 4px 0px rgba(0,0,0,0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              GOTAS
            </motion.h1>
            
            {/* Subtitle with blinking cursor */}
            <div className="flex items-center justify-center gap-2">
              <p className="text-xs md:text-sm text-cyan-400 text-center">
                INSERT COIN TO CONTINUE
              </p>
              <span className={`text-cyan-400 ${blinkState ? 'opacity-100' : 'opacity-0'}`}>_</span>
            </div>

            {/* High Score display */}
            <div className="mt-4 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-xs text-yellow-400">HIGH SCORE</p>
                <p className="text-lg md:text-xl text-white">{mockRanking[0].totalDrops}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-cyan-400">YOUR SCORE</p>
                <p className="text-lg md:text-xl text-white">{currentUser.totalDrops}</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Tab Navigation - Arcade Buttons */}
        <motion.nav
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6 md:mb-10 flex justify-center gap-4"
        >
          <button
            onClick={() => setActiveTab('ranking')}
            className={`px-6 py-3 text-xs md:text-sm transition-all ${
              activeTab === 'ranking'
                ? 'bg-gradient-to-b from-red-500 to-red-700 text-white pixel-border-sm transform scale-95'
                : 'bg-gradient-to-b from-gray-600 to-gray-800 text-gray-300 hover:from-gray-500 hover:to-gray-700'
            }`}
            style={{
              boxShadow: activeTab === 'ranking' 
                ? 'inset 0 -4px 0 rgba(0,0,0,0.5)' 
                : '0 4px 0 rgba(0,0,0,0.5)',
              transform: activeTab === 'ranking' ? 'translateY(4px)' : 'translateY(0)',
            }}
          >
            RANKING
          </button>
          <button
            onClick={() => setActiveTab('prizes')}
            className={`px-6 py-3 text-xs md:text-sm transition-all ${
              activeTab === 'prizes'
                ? 'bg-gradient-to-b from-blue-500 to-blue-700 text-white pixel-border-sm transform scale-95'
                : 'bg-gradient-to-b from-gray-600 to-gray-800 text-gray-300 hover:from-gray-500 hover:to-gray-700'
            }`}
            style={{
              boxShadow: activeTab === 'prizes' 
                ? 'inset 0 -4px 0 rgba(0,0,0,0.5)' 
                : '0 4px 0 rgba(0,0,0,0.5)',
              transform: activeTab === 'prizes' ? 'translateY(4px)' : 'translateY(0)',
            }}
          >
            PRIZES
          </button>
        </motion.nav>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'ranking' ? (
            <motion.div
              key="ranking"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Player Stats - Game HUD Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-8 md:mb-12"
              >
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 md:p-6 pixel-border">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Level */}
                    <div className="bg-black p-3 pixel-border-sm">
                      <p className="text-xs text-green-400 mb-1">LVL</p>
                      <p className="text-xl md:text-2xl text-white">
                        {Math.floor(currentUser.totalDrops / 10)}
                      </p>
                    </div>
                    
                    {/* HP Bar */}
                    <div className="bg-black p-3 pixel-border-sm">
                      <p className="text-xs text-red-400 mb-1">HP</p>
                      <div className="bg-gray-800 h-4 mt-2">
                        <motion.div 
                          className="h-full health-bar"
                          initial={{ width: 0 }}
                          animate={{ width: `${getHealthBar(currentUser.totalDrops)}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    
                    {/* Coins */}
                    <div className="bg-black p-3 pixel-border-sm">
                      <p className="text-xs text-yellow-400 mb-1">COINS</p>
                      <div className="flex items-center gap-2">
                        <motion.span 
                          className={`text-xl md:text-2xl ${coinAnimation ? 'coin-spin' : ''}`}
                          style={{ display: 'inline-block' }}
                        >
                          🪙
                        </motion.span>
                        <p className="text-xl md:text-2xl text-white">
                          {currentUser.totalDrops}
                        </p>
                      </div>
                    </div>
                    
                    {/* Rank */}
                    <div className="bg-black p-3 pixel-border-sm">
                      <p className="text-xs text-purple-400 mb-1">RANK</p>
                      <p className="text-xl md:text-2xl text-white">
                        #{currentUserRanking}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* High Score Board */}
              <div className="bg-gradient-to-b from-indigo-900 to-purple-900 p-4 md:p-6 pixel-border">
                <motion.h2 
                  className="text-xl md:text-2xl text-center mb-6 text-yellow-400"
                  animate={{
                    textShadow: [
                      '2px 2px 0px rgba(0,0,0,0.5)',
                      '3px 3px 0px rgba(0,0,0,0.5)',
                      '2px 2px 0px rgba(0,0,0,0.5)',
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  HIGH SCORES
                </motion.h2>
                
                {/* Score list */}
                <div className="space-y-2">
                  {mockRanking.slice(0, 10).map((entry, index) => (
                    <motion.div
                      key={entry.user.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                      }}
                      className={`bg-black p-3 md:p-4 flex items-center justify-between ${
                        entry.user.email === currentUser.email ? 'pixel-border-sm' : ''
                      }`}
                      style={{
                        boxShadow: entry.user.email === currentUser.email 
                          ? '0 0 20px rgba(57, 255, 20, 0.5)' 
                          : 'none',
                      }}
                    >
                      <div className="flex items-center gap-2 md:gap-4">
                        {/* Position with medal */}
                        <div className="flex items-center gap-1">
                          <span className={`text-lg md:text-xl ${
                            entry.position === 1 ? 'text-yellow-400' :
                            entry.position === 2 ? 'text-gray-300' :
                            entry.position === 3 ? 'text-orange-500' :
                            'text-white'
                          }`}>
                            {entry.position.toString().padStart(2, '0')}
                          </span>
                          <span className="text-xl">{getMedal(entry.position)}</span>
                        </div>
                        
                        {/* Player name */}
                        <div>
                          <p className={`text-xs md:text-sm ${
                            entry.user.email === currentUser.email 
                              ? 'text-green-400' 
                              : 'text-white'
                          }`}>
                            {entry.user.name}
                            {entry.user.email === currentUser.email && (
                              <span className="ml-2 text-green-400 blink">&lt;YOU&gt;</span>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      {/* Score with coin */}
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">🪙</span>
                        <p className={`text-sm md:text-base ${
                          entry.position <= 3 ? 'text-yellow-400' : 'text-white'
                        }`}>
                          {entry.totalDrops.toString().padStart(3, '0')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Insert Coin prompt */}
                <motion.div 
                  className="mt-6 text-center"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <p className="text-xs text-cyan-400">PRESS START TO PLAY AGAIN</p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="prizes"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Prizes - Treasure Room Style */}
              <div className="space-y-6 md:space-y-8">
                <motion.h2 
                  className="text-xl md:text-2xl text-center mb-6 text-yellow-400"
                  style={{
                    textShadow: '3px 3px 0px rgba(0,0,0,0.5)',
                  }}
                >
                  TREASURE ROOM
                </motion.h2>
                
                {mockPrizes.map((prize, index) => (
                  <motion.div
                    key={prize.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                    }}
                    className={`bg-gradient-to-b ${
                      prize.position === 1 ? 'from-yellow-700 to-yellow-900' :
                      prize.position === 2 ? 'from-gray-600 to-gray-800' :
                      'from-orange-700 to-orange-900'
                    } p-4 md:p-6 pixel-border`}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                      {/* Prize icon/visual */}
                      <motion.div 
                        className="w-24 h-24 md:w-32 md:h-32 bg-black pixel-border-sm flex items-center justify-center"
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                      >
                        <span className="text-5xl md:text-6xl">
                          {prize.position === 1 ? '👑' :
                           prize.position === 2 ? '🏆' :
                           '🎖️'}
                        </span>
                      </motion.div>
                      
                      {/* Prize details */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                          <span className={`text-base md:text-lg font-bold ${
                            prize.position === 1 ? 'text-yellow-400' :
                            prize.position === 2 ? 'text-gray-300' :
                            'text-orange-400'
                          }`}>
                            {prize.position === 1 ? '1ST PLACE' :
                             prize.position === 2 ? '2ND PLACE' :
                             '3RD PLACE'}
                          </span>
                          <span className="text-2xl">{getMedal(prize.position)}</span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl text-white mb-2">
                          {prize.name}
                        </h3>
                        
                        <p className="text-xs md:text-sm text-gray-300 mb-4">
                          {prize.description}
                        </p>
                        
                        {/* Value display */}
                        <div className="bg-black p-2 pixel-border-sm inline-block">
                          <p className="text-xs text-green-400">VALUE</p>
                          <p className="text-base md:text-lg text-white">
                            R$ {prize.value.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Bonus message */}
                <motion.div
                  className="text-center mt-8"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <p className="text-sm text-purple-400">COLLECT ALL COINS TO UNLOCK!</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer - Retro Style */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="bg-gradient-to-b from-gray-800 to-black p-4 pixel-border inline-block">
            <p className="text-xs text-cyan-400">© 2025 ECBR ARCADE</p>
            <p className="text-xs text-purple-400 mt-1">GAME OVER - INSERT COIN</p>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-2 h-2 bg-red-500 animate-pulse" />
              <div className="w-2 h-2 bg-yellow-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-2 h-2 bg-green-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </motion.footer>

        {/* Sound effect indicators (visual only) */}
        <motion.div
          className="fixed bottom-4 right-4 bg-black p-2 pixel-border-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs text-white">SFX</span>
            <div className="flex gap-1">
              <motion.div 
                className="w-2 h-4 bg-green-400"
                animate={{
                  scaleY: [1, 0.3, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              />
              <motion.div 
                className="w-2 h-4 bg-green-400"
                animate={{
                  scaleY: [1, 0.5, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: 0.1,
                }}
              />
              <motion.div 
                className="w-2 h-4 bg-green-400"
                animate={{
                  scaleY: [1, 0.7, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: 0.2,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}