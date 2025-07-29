'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRanking, mockPrizes, currentUser } from '@/lib/mock-data';

type TabType = 'ranking' | 'prizes';

export default function CyberpunkRankingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ranking');
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState('GOTAS');
  const [terminalText, setTerminalText] = useState('');
  const [matrixRain, setMatrixRain] = useState<Array<{id: number, x: number, speed: number, chars: string[]}>>([]);
  const [systemStatus, setSystemStatus] = useState('BOOTING');
  const [hackingProgress, setHackingProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Enhanced Matrix rain effect with multiple characters
    const chars = '0123456789ABCDEF@#$%^&*()_+-=[]{}|;:<>?,./ГΔШΣΨΩΛΠ';
    const rainDrops = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      speed: 0.5 + Math.random() * 2,
      chars: Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)])
    }));
    setMatrixRain(rainDrops);

    // Terminal typing effect with system boot sequence
    const bootSequence = [
      'SYSTEM BOOT SEQUENCE INITIATED...',
      'LOADING KERNEL MODULES... [OK]',
      'CONNECTING TO ECBR_MAINFRAME... [OK]',
      'DECRYPTING USER DATABASE... [OK]',
      'INITIALIZING RANKING_ENGINE_v2.0... [OK]',
      'SYSTEM READY.'
    ];
    
    let sequenceIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    
    const typeInterval = setInterval(() => {
      if (sequenceIndex < bootSequence.length) {
        if (charIndex < bootSequence[sequenceIndex].length) {
          currentLine += bootSequence[sequenceIndex][charIndex];
          setTerminalText(currentLine);
          charIndex++;
        } else {
          currentLine += '\n';
          sequenceIndex++;
          charIndex = 0;
          if (sequenceIndex === bootSequence.length) {
            setSystemStatus('ONLINE');
            clearInterval(typeInterval);
          }
        }
      }
    }, 30);

    // Enhanced glitch effect with more variations
    const glitchInterval = setInterval(() => {
      const glitchChars = ['G0T4S', 'G○TΔS', 'G◊T▲S', 'GOTAS', 'G̸O̸T̸A̸S̸', 'G̴O̴T̴A̴S̴', '⎔⎔⎔⎔⎔'];
      setGlitchText(glitchChars[Math.floor(Math.random() * glitchChars.length)]);
    }, 2500);

    // Hacking progress animation
    const hackInterval = setInterval(() => {
      setHackingProgress(prev => (prev + 1) % 101);
    }, 100);

    return () => {
      clearInterval(typeInterval);
      clearInterval(glitchInterval);
      clearInterval(hackInterval);
    };
  }, []);

  const currentUserRanking = mockRanking.findIndex(
    (entry) => entry.user.email === currentUser.email
  ) + 1 || mockRanking.length + 1;

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative">
      {/* Enhanced animated grid background with perspective */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 48%, cyan 49%, cyan 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, magenta 49%, magenta 51%, transparent 52%),
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px',
          animation: 'grid-move 20s linear infinite',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center center'
        }} />
      </div>

      {/* Digital noise overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        animation: 'noise 0.2s steps(10) infinite'
      }} />

      {/* Enhanced Matrix rain effect with character trails */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {matrixRain.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute font-mono"
            initial={{ y: -500 }}
            animate={{ y: '110vh' }}
            transition={{
              duration: 15 / drop.speed,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ left: `${drop.x}%` }}
          >
            <div className="space-y-1">
              {drop.chars.map((char, i) => (
                <div
                  key={i}
                  className="text-xs"
                  style={{
                    color: i === 0 ? '#00ff00' : '#00ff00',
                    opacity: 1 - (i * 0.05),
                    textShadow: i === 0 ? '0 0 10px #00ff00' : 'none',
                    filter: i === 0 ? 'brightness(1.5)' : 'none'
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced CRT effects with scanlines and flicker */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-50" style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 0, 0.03) 2px,
              rgba(0, 255, 0, 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255, 0, 255, 0.01) 2px,
              rgba(255, 0, 255, 0.01) 4px
            )
          `,
          animation: 'flicker 0.15s infinite'
        }} />
        
        {/* CRT curve effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        
        {/* Enhanced Header with multiple glitch layers */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-20"
        >
          <div className="relative">
            {/* System status indicator */}
            <div className="absolute -top-8 right-0 text-xs font-mono">
              <span className="text-gray-500">SYSTEM: </span>
              <span className={`${systemStatus === 'ONLINE' ? 'text-lime-400' : 'text-yellow-400'} animate-pulse`}>
                [{systemStatus}]
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-4 font-mono relative">
              <span className="relative">
                {glitchText}
                <span className="absolute inset-0 text-cyan-400 opacity-70" style={{
                  animation: 'glitch 3s infinite',
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                  filter: 'blur(1px)'
                }}>
                  {glitchText}
                </span>
                <span className="absolute inset-0 text-magenta-500 opacity-70" style={{
                  animation: 'glitch 3s infinite reverse',
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                  filter: 'blur(1px)'
                }}>
                  {glitchText}
                </span>
                <span className="absolute inset-0 text-lime-400 opacity-30" style={{
                  animation: 'glitch-2 2s infinite',
                  transform: 'translateX(2px)'
                }}>
                  {glitchText}
                </span>
              </span>
            </h1>
            
            {/* Terminal output with boot sequence */}
            <div className="bg-black border border-green-500 rounded p-3 mb-4 font-mono text-xs md:text-sm overflow-hidden" style={{
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
              maxHeight: '150px'
            }}>
              <pre className="text-green-400 whitespace-pre-wrap">
                {terminalText}
                <span className="animate-pulse">█</span>
              </pre>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm md:text-base text-cyan-400 font-mono tracking-widest">
                [ECBR_EXCLUSIVE_RANKING_v2.0]
              </p>
              <div className="text-xs font-mono text-gray-500">
                <span>HACK_PROGRESS: </span>
                <span className="text-lime-400">{hackingProgress}%</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Terminal-style Tab Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 md:mb-16"
        >
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-cyan-500 rounded-lg p-4 font-mono">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <button
                onClick={() => setActiveTab('ranking')}
                className={`text-left transition-all duration-300 px-4 py-2 rounded ${
                  activeTab === 'ranking'
                    ? 'bg-cyan-500 bg-opacity-20 text-cyan-400 shadow-lg shadow-cyan-500/50'
                    : 'text-gray-500 hover:text-cyan-400'
                }`}
              >
                <span className="text-xs opacity-60">&gt; </span>
                RANKING.exe
              </button>
              <button
                onClick={() => setActiveTab('prizes')}
                className={`text-left transition-all duration-300 px-4 py-2 rounded ${
                  activeTab === 'prizes'
                    ? 'bg-magenta-500 bg-opacity-20 text-magenta-400 shadow-lg shadow-magenta-500/50'
                    : 'text-gray-500 hover:text-magenta-400'
                }`}
              >
                <span className="text-xs opacity-60">&gt; </span>
                PRIZES.exe
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'ranking' ? (
            <motion.div
              key="ranking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Enhanced User Stats Dashboard - Holographic Display */}
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
                    className="lg:col-span-1"
                  >
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500 to-green-500 rounded-lg blur opacity-40 animate-pulse" />
                      <div className="relative bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-lime-500/50 rounded-lg p-6 h-full overflow-hidden" style={{
                        boxShadow: '0 0 40px rgba(132, 255, 0, 0.3), inset 0 0 20px rgba(132, 255, 0, 0.1)'
                      }}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-lime-500/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-lime-400 text-xs font-mono opacity-80">
                              [RANK_POS]
                            </p>
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-2 h-2 bg-lime-400 rounded-full"
                            />
                          </div>
                          <p className="text-5xl md:text-6xl font-bold font-mono text-white" style={{
                            textShadow: '0 0 30px rgba(132, 255, 0, 0.5)'
                          }}>
                            #{currentUserRanking}
                          </p>
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">STATUS:</span>
                              <span className="text-lime-300 font-mono">ACTIVE</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">TIER:</span>
                              <span className="text-lime-300 font-mono">
                                {currentUserRanking <= 3 ? 'ELITE' : currentUserRanking <= 10 ? 'PRO' : 'STANDARD'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Drops Card */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    className="lg:col-span-1"
                  >
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-40 animate-pulse" />
                      <div className="relative bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-6 h-full overflow-hidden" style={{
                        boxShadow: '0 0 40px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)'
                      }}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-cyan-400 text-xs font-mono opacity-80">
                              [DROPS_TTL]
                            </p>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-cyan-400 border-dashed rounded-full"
                            />
                          </div>
                          <p className="text-5xl md:text-6xl font-bold font-mono text-white" style={{
                            textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                          }}>
                            {currentUser.totalDrops}
                          </p>
                          <div className="mt-3 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">SYNC:</span>
                              <span className="text-cyan-300 font-mono">REALTIME</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">RATE:</span>
                              <span className="text-cyan-300 font-mono">+2.3/DAY</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Achievement Card */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="lg:col-span-1"
                  >
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-magenta-500 to-purple-500 rounded-lg blur opacity-40 animate-pulse" />
                      <div className="relative bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-magenta-500/50 rounded-lg p-6 h-full overflow-hidden" style={{
                        boxShadow: '0 0 40px rgba(255, 0, 255, 0.3), inset 0 0 20px rgba(255, 0, 255, 0.1)'
                      }}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-magenta-500/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-magenta-400 text-xs font-mono opacity-80">
                              [ACHV_UNLK]
                            </p>
                            <div className="text-xs font-mono text-magenta-300">
                              ★ ★ ☆
                            </div>
                          </div>
                          <p className="text-3xl md:text-4xl font-bold font-mono text-white mb-2" style={{
                            textShadow: '0 0 30px rgba(255, 0, 255, 0.5)'
                          }}>
                            7/10
                          </p>
                          <div className="space-y-1">
                            <div className="text-xs text-gray-400">
                              Latest: <span className="text-magenta-300">FIRST_DROP</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div className="bg-gradient-to-r from-magenta-500 to-purple-500 h-2 rounded-full" style={{ width: '70%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Network Status Card */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="lg:col-span-1"
                  >
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg blur opacity-40 animate-pulse" />
                      <div className="relative bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-yellow-500/50 rounded-lg p-6 h-full overflow-hidden" style={{
                        boxShadow: '0 0 40px rgba(255, 255, 0, 0.3), inset 0 0 20px rgba(255, 255, 0, 0.1)'
                      }}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-yellow-400 text-xs font-mono opacity-80">
                              [NET_STAT]
                            </p>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-2 h-2 bg-green-400 rounded-full"
                            />
                          </div>
                          <p className="text-2xl md:text-3xl font-bold font-mono text-white mb-2" style={{
                            textShadow: '0 0 30px rgba(255, 255, 0, 0.5)'
                          }}>
                            ONLINE
                          </p>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">PING:</span>
                              <span className="text-green-400 font-mono">12ms</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">NODES:</span>
                              <span className="text-yellow-300 font-mono">247</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Ranking List - Hacker Terminal Style */}
              <div className="relative">
                {/* Holographic frame effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-green-500 to-cyan-500 rounded-lg blur opacity-30 animate-pulse" />
                
                <div className="relative bg-gray-900 bg-opacity-30 backdrop-blur-sm border border-green-500 rounded-lg p-4 md:p-6" style={{
                  boxShadow: `
                    0 0 30px rgba(0, 255, 0, 0.3),
                    inset 0 0 30px rgba(0, 255, 0, 0.05)
                  `
                }}>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-green-400 font-mono text-xs opacity-80">
                        <span>&gt; SELECT * FROM ranking ORDER BY drops DESC LIMIT 10;</span>
                      </div>
                      <div className="text-xs font-mono text-cyan-400 animate-pulse">
                        LIVE DATA STREAM
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                  </div>
                  
                  <div className="space-y-3">
                    {mockRanking.slice(0, 10).map((entry, index) => (
                      <motion.div
                        key={entry.user.id}
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.08,
                          type: "spring",
                          stiffness: 100
                        }}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className={`
                          font-mono text-sm md:text-base p-3 md:p-4 rounded-lg
                          ${entry.position <= 3 
                            ? 'bg-gradient-to-r from-yellow-500/20 via-orange-500/10 to-transparent border-l-4' 
                            : 'bg-gray-800/30 border-l-2'
                          }
                          ${entry.position === 1 ? 'border-l-yellow-400' :
                            entry.position === 2 ? 'border-l-gray-300' :
                            entry.position === 3 ? 'border-l-orange-400' :
                            'border-l-cyan-500/50'
                          }
                          hover:bg-opacity-40 transition-all duration-300
                          relative overflow-hidden group
                        `}
                      >
                        {/* Scan line effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        
                        {/* Data corruption effect for top 3 */}
                        {entry.position <= 3 && (
                          <div className="absolute right-2 top-2 text-xs font-mono opacity-50">
                            <span className="text-yellow-400 animate-pulse">[ELITE]</span>
                          </div>
                        )}
                        
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4 md:gap-8">
                            <div className="relative">
                              <span className={`text-2xl md:text-3xl font-bold ${
                                entry.position === 1 ? 'text-yellow-400' :
                                entry.position === 2 ? 'text-gray-300' :
                                entry.position === 3 ? 'text-orange-400' :
                                'text-cyan-400'
                              }`} style={{
                                textShadow: entry.position <= 3 ? '0 0 20px currentColor' : '0 0 10px currentColor'
                              }}>
                                {String(entry.position).padStart(2, '0')}
                              </span>
                              {entry.position <= 3 && (
                                <motion.div
                                  className="absolute -inset-2"
                                  animate={{
                                    rotate: 360
                                  }}
                                  transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                >
                                  <div className="w-full h-full rounded-full border border-dashed border-yellow-400/30" />
                                </motion.div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-white text-sm md:text-base">
                                  {entry.user.name}
                                </span>
                                {entry.user.email === currentUser.email && (
                                  <span className="text-xs bg-lime-500/20 text-lime-400 px-2 py-0.5 rounded border border-lime-500/50">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-gray-500">
                                  <span className="text-cyan-400">ID:</span>{entry.user.id.padStart(4, '0')}
                                </span>
                                <span className="text-xs text-gray-500">
                                  <span className="text-magenta-400">LVL:</span>{Math.floor(entry.totalDrops / 10)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="relative">
                              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                                {entry.totalDrops}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="text-cyan-400">▲</span> DROPS
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-lime-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(entry.totalDrops / mockRanking[0].totalDrops) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-green-500/30">
                    <div className="flex items-center justify-between text-green-400 font-mono text-xs">
                      <span>&gt; Query executed successfully</span>
                      <span className="opacity-60">{new Date().toISOString().split('T')[0]} {new Date().toTimeString().split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="prizes"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Enhanced Prizes Grid - Holographic Display */}
              <div className="space-y-8 md:space-y-12">
                {mockPrizes.map((prize, index) => (
                  <motion.div
                    key={prize.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    {/* Holographic glow effect */}
                    <div className={`absolute -inset-1 rounded-lg blur-xl opacity-50 animate-pulse bg-gradient-to-r ${
                      prize.position === 1 ? 'from-yellow-500 via-orange-500 to-yellow-500' :
                      prize.position === 2 ? 'from-gray-400 via-white to-gray-400' :
                      'from-orange-500 via-amber-500 to-orange-500'
                    }`} />
                    
                    <div className="relative bg-gray-900 bg-opacity-60 backdrop-blur-md border-2 border-magenta-500/50 rounded-lg p-6 md:p-8 overflow-hidden" style={{
                      boxShadow: `
                        0 0 50px rgba(255, 0, 255, 0.3),
                        inset 0 0 30px rgba(255, 0, 255, 0.1),
                        0 10px 40px rgba(0, 0, 0, 0.5)
                      `
                    }}>
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `
                            repeating-conic-gradient(from 0deg at 50% 50%, 
                              transparent 0deg, 
                              rgba(255, 0, 255, 0.1) 20deg, 
                              transparent 40deg
                            )
                          `,
                          animation: 'rotate 20s linear infinite'
                        }} />
                      </div>
                      
                      <div className="relative grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                        <div className="order-2 md:order-1">
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <span className={`
                                  text-3xl md:text-4xl font-bold font-mono
                                  ${prize.position === 1 ? 'text-yellow-400' :
                                    prize.position === 2 ? 'text-gray-300' :
                                    'text-orange-400'}
                                `} style={{
                                  textShadow: `0 0 30px currentColor, 0 0 60px currentColor`
                                }}>
                                  [{String(prize.position).padStart(2, '0')}]
                                </span>
                                {prize.position === 1 && (
                                  <motion.div
                                    className="absolute -inset-3"
                                    animate={{
                                      rotate: 360
                                    }}
                                    transition={{
                                      duration: 8,
                                      repeat: Infinity,
                                      ease: "linear"
                                    }}
                                  >
                                    <div className="w-full h-full rounded-full border-2 border-dashed border-yellow-400/50" />
                                  </motion.div>
                                )}
                              </div>
                              <div>
                                <span className="text-xs font-mono text-magenta-400">
                                  PRIZE_CLASS_OMEGA
                                </span>
                                <div className="text-xs font-mono text-cyan-400 opacity-60">
                                  AUTH: {prize.id.padStart(8, '0')}
                                </div>
                              </div>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-bold text-white font-mono relative">
                              <span className="relative z-10">{prize.name}</span>
                              <motion.span 
                                className="absolute inset-0 text-cyan-400 opacity-50"
                                animate={{
                                  x: [-2, 2, -2],
                                  opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity
                                }}
                              >
                                {prize.name}
                              </motion.span>
                            </h3>
                            
                            <div className="bg-black/50 border border-cyan-500/30 rounded p-3">
                              <p className="text-gray-300 text-sm md:text-base font-mono">
                                <span className="text-cyan-400">&gt;</span> {prize.description}
                              </p>
                              <div className="mt-2 flex items-center gap-4 text-xs font-mono">
                                <span className="text-green-400">• VERIFIED</span>
                                <span className="text-yellow-400">• LIMITED</span>
                                <span className="text-magenta-400">• EXCLUSIVE</span>
                              </div>
                            </div>
                            
                            <div className="pt-4 space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs font-mono text-cyan-400 mb-1 opacity-80">
                                    [MARKET_VALUE]
                                  </p>
                                  <p className="text-2xl md:text-3xl font-bold font-mono">
                                    <span className="text-lime-400">R$</span>
                                    <span className="text-white bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                                      {prize.value.toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-mono text-magenta-400 mb-1 opacity-80">
                                    [RARITY_INDEX]
                                  </p>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <div 
                                        key={i} 
                                        className={`w-2 h-6 rounded ${
                                          i < (6 - prize.position) ? 'bg-magenta-400' : 'bg-gray-700'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Stock ticker effect */}
                              <div className="bg-black/30 border border-green-500/30 rounded p-2">
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <span className="text-gray-500">LAST_UPDATE:</span>
                                  <span className="text-green-400">{new Date().toTimeString().split(' ')[0]}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="order-1 md:order-2">
                          <motion.div 
                            className="aspect-square bg-black rounded-lg overflow-hidden relative border-2 border-cyan-500/50"
                            whileHover={{ 
                              rotateY: 15,
                              rotateX: -5,
                              scale: 1.05
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{
                              transformStyle: 'preserve-3d',
                              perspective: '1000px'
                            }}
                          >
                            {/* Holographic shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/20 to-transparent" 
                              style={{
                                backgroundSize: '200% 200%',
                                animation: 'shimmer 3s ease-in-out infinite'
                              }}
                            />
                            
                            {/* 3D layers effect */}
                            <div className="absolute inset-0" style={{
                              background: `
                                repeating-linear-gradient(
                                  45deg,
                                  transparent,
                                  transparent 10px,
                                  rgba(0, 255, 255, 0.05) 10px,
                                  rgba(0, 255, 255, 0.05) 20px
                                ),
                                repeating-linear-gradient(
                                  -45deg,
                                  transparent,
                                  transparent 10px,
                                  rgba(255, 0, 255, 0.05) 10px,
                                  rgba(255, 0, 255, 0.05) 20px
                                )
                              `
                            }} />
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center transform" style={{ transform: 'translateZ(20px)' }}>
                                <motion.div 
                                  className="text-6xl md:text-8xl font-bold font-mono mb-4"
                                  animate={{
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [0.95, 1.05, 0.95]
                                  }}
                                  transition={{
                                    duration: 4,
                                    repeat: Infinity
                                  }}
                                  style={{
                                    background: `linear-gradient(45deg, 
                                      ${prize.position === 1 ? '#facc15' : 
                                        prize.position === 2 ? '#e5e5e5' : 
                                        '#fb923c'} 0%, 
                                      ${prize.position === 1 ? '#fbbf24' : 
                                        prize.position === 2 ? '#d4d4d4' : 
                                        '#f97316'} 50%, 
                                      ${prize.position === 1 ? '#f59e0b' : 
                                        prize.position === 2 ? '#a3a3a3' : 
                                        '#ea580c'} 100%
                                    )`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    filter: 'drop-shadow(0 0 20px currentColor)'
                                  }}
                                >
                                  {prize.position}
                                </motion.div>
                                <div className="space-y-1">
                                  <div className="text-xs font-mono text-magenta-400 animate-pulse">
                                    [RENDERING_ASSET]
                                  </div>
                                  <div className="flex items-center justify-center gap-1">
                                    {[...Array(3)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        className="w-1 h-1 bg-cyan-400 rounded-full"
                                        animate={{
                                          scale: [1, 1.5, 1],
                                          opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{
                                          duration: 1.5,
                                          repeat: Infinity,
                                          delay: i * 0.2
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Scan line effect */}
                            <motion.div 
                              className="absolute inset-0" 
                              animate={{
                                y: ['100%', '-100%']
                              }}
                              transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                              style={{
                                background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.4) 50%, transparent 100%)',
                                height: '20%'
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <style jsx>{`
                @keyframes rotate {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                
                @keyframes shimmer {
                  0% { background-position: 200% 0%; }
                  100% { background-position: -200% 0%; }
                }
              `}</style>
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
          <div className="font-mono text-xs text-green-400 opacity-60">
            <p>[ECBR_2025]</p>
            <p>SYSTEM_VERSION: 2.0.0</p>
            <p>STATUS: <span className="text-lime-400">ONLINE</span></p>
          </div>
        </motion.footer>
      </div>

      {/* Neon glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-cyan-500 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-magenta-500 rounded-full blur-3xl opacity-20"
        />
      </div>

    </div>
  );
}