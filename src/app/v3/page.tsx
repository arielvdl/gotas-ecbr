'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRanking, mockPrizes, currentUser } from '@/lib/mock-data';

type TabType = 'ranking' | 'prizes';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function GlassmorphismRankingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ranking');
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Generate floating particles
    const particleCount = 50;
    const colors = ['rgba(147, 51, 234, 0.6)', 'rgba(79, 172, 254, 0.6)', 'rgba(244, 114, 182, 0.6)', 'rgba(52, 211, 153, 0.6)'];
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            particle.speedX = -particle.speedX;
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            particle.speedY = -particle.speedY;
          }

          // Wrap around screen
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;

          return {
            ...particle,
            x: newX,
            y: newY,
            opacity: particle.opacity + (Math.random() - 0.5) * 0.02
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const currentUserRanking = mockRanking.findIndex(
    (entry) => entry.user.email === currentUser.email
  ) + 1 || mockRanking.length + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-gradient-shift" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-shift-reverse" />
      </div>

      {/* Floating particles/bubbles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-sm"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            animate={{
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Glass orbs in background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.4), transparent)',
            backdropFilter: 'blur(80px)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(79, 172, 254, 0.4), transparent)',
            backdropFilter: 'blur(80px)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Mouse follower light */}
      <motion.div
        className="fixed w-32 h-32 rounded-full pointer-events-none z-50"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent)',
          filter: 'blur(20px)',
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Main container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        
        {/* Header with glass effect */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-12 md:mb-20"
        >
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
            
            {/* Header content */}
            <div className="relative z-10">
              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                GOTAS
              </motion.h1>
              
              <div className="flex items-center gap-4 md:gap-8">
                <p className="text-lg md:text-xl text-white/80 font-light tracking-widest">
                  ECBR EXCLUSIVE RANKING
                </p>
                <motion.div 
                  className="flex gap-1"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white/60 rounded-full" />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.header>

        {/* Glass Tab Navigation */}
        <motion.nav
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 md:mb-16"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2 inline-flex gap-2 mx-auto">
            <button
              onClick={() => setActiveTab('ranking')}
              className={`relative px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'ranking'
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {activeTab === 'ranking' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-medium">Ranking</span>
            </button>
            <button
              onClick={() => setActiveTab('prizes')}
              className={`relative px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'prizes'
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {activeTab === 'prizes' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-medium">Prizes</span>
            </button>
          </div>
        </motion.nav>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'ranking' ? (
            <motion.div
              key="ranking"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {/* User Stats Cards with Glass Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12 md:mb-20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {/* Position Card */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-xl opacity-50" />
                    <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-2xl" />
                      <div className="relative z-10">
                        <p className="text-green-200 text-sm mb-2 font-light">Your Position</p>
                        <p className="text-5xl md:text-6xl font-bold text-white">
                          #{currentUserRanking}
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <p className="text-xs text-white/60">Live Ranking</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Drops Card */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl blur-xl opacity-50" />
                    <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl" />
                      <div className="relative z-10">
                        <p className="text-blue-200 text-sm mb-2 font-light">Total Drops</p>
                        <p className="text-5xl md:text-6xl font-bold text-white">
                          {currentUser.totalDrops}
                        </p>
                        <div className="mt-4">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(currentUser.totalDrops / 50) * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Achievement Card */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl blur-xl opacity-50" />
                    <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-2xl" />
                      <div className="relative z-10">
                        <p className="text-purple-200 text-sm mb-2 font-light">Achievements</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-4xl md:text-5xl font-bold text-white">7</p>
                          <p className="text-xl text-white/60">/10</p>
                        </div>
                        <div className="mt-4 flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 h-1 rounded-full ${
                                i < 7 ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Streak Card */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl blur-xl opacity-50" />
                    <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-2xl" />
                      <div className="relative z-10">
                        <p className="text-orange-200 text-sm mb-2 font-light">Current Streak</p>
                        <div className="flex items-center gap-2">
                          <p className="text-4xl md:text-5xl font-bold text-white">12</p>
                          <motion.span 
                            className="text-2xl"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            🔥
                          </motion.span>
                        </div>
                        <p className="mt-4 text-xs text-white/60">Days Active</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Ranking List with Glass Cards */}
              <div className="space-y-4">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-6"
                >
                  Top 10 Rankings
                </motion.h2>
                
                {mockRanking.slice(0, 10).map((entry, index) => (
                  <motion.div
                    key={entry.user.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="relative"
                  >
                    {/* Gradient background for top 3 */}
                    {entry.position <= 3 && (
                      <div className={`absolute inset-0 rounded-2xl blur-lg opacity-40 bg-gradient-to-r ${
                        entry.position === 1 ? 'from-yellow-400 to-amber-600' :
                        entry.position === 2 ? 'from-gray-300 to-gray-500' :
                        'from-orange-400 to-orange-600'
                      }`} />
                    )}
                    
                    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-6 overflow-hidden">
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{
                          x: [-1000, 1000],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4 md:gap-6">
                          {/* Position badge */}
                          <div className="relative">
                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-2xl md:text-3xl ${
                              entry.position === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white' :
                              entry.position === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                              entry.position === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                              'bg-white/10 text-white'
                            }`}>
                              {entry.position}
                            </div>
                            {entry.position <= 3 && (
                              <motion.div
                                className="absolute -inset-1 rounded-full border-2 border-white/30"
                                animate={{
                                  rotate: 360,
                                }}
                                transition={{
                                  duration: 10,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              />
                            )}
                          </div>
                          
                          {/* User info */}
                          <div>
                            <p className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
                              {entry.user.name}
                              {entry.user.email === currentUser.email && (
                                <span className="text-xs bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full">
                                  YOU
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-white/60">
                              Level {Math.floor(entry.totalDrops / 10)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Drops count */}
                        <div className="text-right">
                          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {entry.totalDrops}
                          </p>
                          <p className="text-sm text-white/60">drops</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="prizes"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {/* Prizes Grid with Glass Cards */}
              <div className="space-y-8 md:space-y-12">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-6"
                >
                  Exclusive Prizes
                </motion.h2>
                
                {mockPrizes.map((prize, index) => (
                  <motion.div
                    key={prize.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    {/* Prize glow effect */}
                    <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-30 bg-gradient-to-r ${
                      prize.position === 1 ? 'from-yellow-400 via-amber-400 to-orange-400' :
                      prize.position === 2 ? 'from-gray-300 via-gray-400 to-gray-500' :
                      'from-orange-400 via-red-400 to-pink-400'
                    }`} />
                    
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 overflow-hidden">
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        style={{
                          backgroundImage: `radial-gradient(circle at 20% 50%, ${
                            prize.position === 1 ? 'rgba(251, 191, 36, 0.3)' :
                            prize.position === 2 ? 'rgba(229, 229, 229, 0.3)' :
                            'rgba(251, 146, 60, 0.3)'
                          } 0%, transparent 50%)`,
                          backgroundSize: '200% 200%',
                        }}
                      />
                      
                      <div className="relative grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                        {/* Prize details */}
                        <div className="order-2 md:order-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                              prize.position === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white' :
                              prize.position === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                              'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                            }`}>
                              {prize.position}
                            </div>
                            <div className={`text-lg font-semibold ${
                              prize.position === 1 ? 'text-yellow-300' :
                              prize.position === 2 ? 'text-gray-300' :
                              'text-orange-300'
                            }`}>
                              {prize.position === 1 ? 'Grand Prize' :
                               prize.position === 2 ? 'Second Place' :
                               'Third Place'}
                            </div>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {prize.name}
                          </h3>
                          
                          <p className="text-white/70 mb-6">
                            {prize.description}
                          </p>
                          
                          <div className="space-y-4">
                            <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                              <p className="text-sm text-white/60 mb-1">Market Value</p>
                              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                R$ {prize.value.toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <p className="text-sm text-white/60">Available for top {prize.position} position</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Prize visual */}
                        <div className="order-1 md:order-2">
                          <motion.div 
                            className="aspect-square bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl overflow-hidden relative border border-white/20"
                            whileHover={{ 
                              rotateY: 10,
                              rotateX: -10,
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{
                              transformStyle: 'preserve-3d',
                              perspective: '1000px'
                            }}
                          >
                            {/* Holographic effect */}
                            <motion.div
                              className="absolute inset-0"
                              animate={{
                                backgroundPosition: ['0% 0%', '100% 100%'],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                              style={{
                                background: `linear-gradient(45deg, 
                                  transparent 30%, 
                                  ${prize.position === 1 ? 'rgba(251, 191, 36, 0.3)' :
                                    prize.position === 2 ? 'rgba(229, 229, 229, 0.3)' :
                                    'rgba(251, 146, 60, 0.3)'} 50%, 
                                  transparent 70%)`,
                                backgroundSize: '200% 200%',
                              }}
                            />
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div 
                                className="text-6xl md:text-8xl font-bold"
                                animate={{
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                }}
                                style={{
                                  background: `linear-gradient(135deg, 
                                    ${prize.position === 1 ? '#fbbf24' : 
                                      prize.position === 2 ? '#e5e5e5' : 
                                      '#fb923c'} 0%, 
                                    ${prize.position === 1 ? '#f59e0b' : 
                                      prize.position === 2 ? '#a3a3a3' : 
                                      '#ea580c'} 100%)`,
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
                                }}
                              >
                                {prize.position}
                              </motion.div>
                            </div>
                            
                            {/* Floating particles inside */}
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white/30 rounded-full"
                                animate={{
                                  y: [-20, -100],
                                  x: [0, (i % 2 === 0 ? 20 : -20)],
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 3 + i,
                                  repeat: Infinity,
                                  delay: i * 0.5,
                                }}
                                style={{
                                  left: `${20 + i * 15}%`,
                                  bottom: 0,
                                }}
                              />
                            ))}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 inline-block">
            <p className="text-white/80 font-light">ECBR 2025</p>
            <p className="text-sm text-white/60 mt-2">Exclusive Glassmorphism Edition</p>
          </div>
        </motion.footer>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translateX(0%) translateY(0%); }
          25% { transform: translateX(100%) translateY(100%); }
          50% { transform: translateX(0%) translateY(100%); }
          75% { transform: translateX(100%) translateY(0%); }
        }
        
        @keyframes gradient-shift-reverse {
          0%, 100% { transform: translateX(0%) translateY(0%); }
          25% { transform: translateX(-100%) translateY(-100%); }
          50% { transform: translateX(0%) translateY(-100%); }
          75% { transform: translateX(-100%) translateY(0%); }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 20s ease infinite;
        }
        
        .animate-gradient-shift-reverse {
          animation: gradient-shift-reverse 25s ease infinite;
        }
      `}</style>
    </div>
  );
}