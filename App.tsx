import React, { useState, useEffect } from 'react';
import { 
  Menu, X, TrendingUp, Shield, Zap, Activity, Globe, 
  BarChart2, Lock, Cpu, ArrowRight, ChevronDown, Check,
  Twitter, Linkedin, Facebook, Star
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { NavItem, Feature, PricingPlan, Testimonial, FAQItem } from './types';

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, .clickable');
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main Dot */}
      <div 
        className="fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '32px' : '8px',
          height: isHovering ? '32px' : '8px',
          backgroundColor: isHovering ? '#00f0ff' : '#ffffff',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          opacity: 0.8
        }}
      />
      {/* Trailing Ring */}
      <div 
        className="fixed pointer-events-none z-40 rounded-full border border-neon-blue transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isHovering ? '48px' : '24px',
          height: isHovering ? '48px' : '24px',
          transform: `translate(-50%, -50%)`,
          opacity: 0.4
        }}
      />
    </>
  );
};

// --- Mock Data ---
const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Live Demo', href: '#demo' },
  { label: 'Pricing', href: '#pricing' },
];

const CHART_DATA = [
  { time: '10:00', value: 4000, confidence: 85 },
  { time: '10:05', value: 3000, confidence: 80 },
  { time: '10:10', value: 2000, confidence: 88 },
  { time: '10:15', value: 2780, confidence: 92 },
  { time: '10:20', value: 1890, confidence: 95 },
  { time: '10:25', value: 2390, confidence: 89 },
  { time: '10:30', value: 3490, confidence: 94 },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Forex Trader",
    company: "Alpha Capital",
    content: "The emotional detachment this AI provides is a game changer. My win rate improved by 35% in the first month alone.",
    image: "https://picsum.photos/100/100?random=1",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Portfolio Manager",
    company: "Zenith Global",
    content: "Enterprise-grade analytics at a fraction of the cost. The confidence scoring system is incredibly accurate.",
    image: "https://picsum.photos/100/100?random=2",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Day Trader",
    company: "Self-Employed",
    content: "Finally, a tool that actually helps clarify the noise rather than adding to it. The UI is simply beautiful.",
    image: "https://picsum.photos/100/100?random=3",
    rating: 4
  }
];

const FEATURES: Feature[] = [
  { id: '1', title: 'AI Market Prediction', description: 'Proprietary algorithms analyze millions of data points to forecast market movements.', icon: TrendingUp },
  { id: '2', title: 'Smart Trade Signals', description: 'Receive clear, actionable buy and sell signals with entry and exit points.', icon: Zap },
  { id: '3', title: 'Risk Management AI', description: 'Automated position sizing and stop-loss suggestions to protect your capital.', icon: Shield },
  { id: '4', title: 'Real-Time Analysis', description: 'Zero-latency processing of global market data feeds.', icon: Activity },
  { id: '5', title: 'Emotion-Free Trading', description: 'Remove human bias and psychology from your trading strategy.', icon: Lock },
  { id: '6', title: 'Multi-Asset Support', description: 'Trade Crypto, Stocks, Forex, and Commodities from a single dashboard.', icon: Globe },
];

// --- Sub-Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-navy-900/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group clickable">
          <div className="w-10 h-10 bg-gradient-to-tr from-neon-blue to-neon-purple rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
            TN
          </div>
          <span className="font-display font-bold text-2xl text-white tracking-tight">TradeNexus</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="text-gray-300 hover:text-neon-blue transition-colors text-sm font-medium clickable">
              {item.label}
            </a>
          ))}
          <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-all hover:scale-105 clickable font-medium text-sm">
            Log In
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-neon-blue to-neon-purple text-navy-900 font-bold rounded-full transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] clickable text-sm">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white clickable" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-navy-900 border-b border-white/10 p-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="text-gray-300 hover:text-neon-blue py-2" onClick={() => setIsMobileMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <button className="w-full py-3 text-center text-white bg-white/5 rounded-lg">Log In</button>
          <button className="w-full py-3 text-center bg-neon-blue text-navy-900 font-bold rounded-lg">Get Started</button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Parallax effect calculation
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section 
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-neon-green/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="relative z-10" style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-neon-green text-xs font-semibold tracking-wide uppercase">AI Engine v2.5 Online</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-white">
            Trade Smarter. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Trade with Clarity.
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
            Harness the power of institutional-grade AI to analyze market trends, execute trades with precision, and eliminate emotional bias from your strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-navy-900 font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-1 clickable flex items-center justify-center gap-2">
              Start Trading with AI <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-all clickable">
              View Live Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="text-3xl font-display font-bold text-white">93%</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Prediction Accuracy</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-3xl font-display font-bold text-white">$2.4B+</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Volume Processed</p>
            </div>
          </div>
        </div>

        {/* Right Content - Visualizer */}
        <div className="relative z-10 hidden lg:block" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>
          <div className="glass-card rounded-2xl p-6 relative animate-float">
            {/* Simulated Live Chart Overlay */}
            <div className="absolute top-0 right-0 p-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded text-green-400 text-xs font-bold border border-green-500/30">
                 <TrendingUp size={12} /> +2.4%
               </div>
            </div>
            
            <div className="mb-6 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                 <Cpu className="text-neon-blue" />
               </div>
               <div>
                 <h3 className="font-bold text-white">BTC/USD Analysis</h3>
                 <p className="text-xs text-gray-400">AI Confidence: 94.2%</p>
               </div>
            </div>

            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a1122', borderColor: '#1f2937' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00f0ff" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Node Lines (Decorative) */}
            <div className="flex justify-between mt-4 px-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" style={{ animationDelay: `${i * 0.2}s`}} />
                    <div className="w-px h-8 bg-gradient-to-b from-neon-purple/50 to-transparent" />
                  </div>
                ))}
            </div>
          </div>

          {/* Floating Elements behind */}
          <div className="absolute -top-10 -right-10 glass-card p-4 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
             <div className="flex items-center gap-3">
               <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                 <Check size={16} />
               </div>
               <div>
                 <p className="text-xs text-gray-400">Buy Signal</p>
                 <p className="font-bold text-white">ETH @ $2,450</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-neon-blue uppercase tracking-widest mb-3">Core Features</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white">Why Top Traders Choose Nexus</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div 
              key={feature.id} 
              className="glass-card p-8 rounded-xl group hover:transform hover:-translate-y-2 transition-all duration-300 clickable cursor-pointer"
            >
              <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-neon-blue/20 transition-colors">
                <feature.icon className="text-neon-blue w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">{feature.title}</h4>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'signals' | 'performance'>('overview');

  return (
    <section id="demo" className="py-24 bg-navy-800/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Live Market Intelligence</h2>
            <p className="text-gray-400 max-w-md">Experience the power of real-time AI analytics. Customize your dashboard to focus on what matters most.</p>
          </div>
          <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
            {['overview', 'signals', 'performance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all clickable capitalize ${
                  activeTab === tab 
                    ? 'bg-neon-blue text-navy-900 shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Mock Dashboard Header */}
          <div className="bg-navy-900/50 p-4 border-b border-white/10 flex justify-between items-center">
             <div className="flex items-center gap-4">
               <div className="w-3 h-3 rounded-full bg-red-500" />
               <div className="w-3 h-3 rounded-full bg-yellow-500" />
               <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>
             <div className="text-xs text-gray-500 font-mono">LIVE_FEED_V2.CONNECT</div>
          </div>

          <div className="p-8 min-h-[500px]">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse-slow" style={{ animationDuration: '0.5s', animationIterationCount: 1 }}>
                <div className="col-span-2 space-y-6">
                  {/* Big Chart */}
                  <div className="bg-navy-900/40 rounded-xl p-6 border border-white/5 h-80">
                    <div className="flex justify-between mb-4">
                      <h4 className="text-white font-medium">Portfolio Value</h4>
                      <span className="text-green-400 font-mono">+12.4%</span>
                    </div>
                    <ResponsiveContainer width="100%" height="85%">
                      <AreaChart data={CHART_DATA}>
                        <defs>
                          <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#b900ff" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#b900ff" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis dataKey="time" stroke="#ffffff40" />
                        <YAxis stroke="#ffffff40" />
                        <Tooltip contentStyle={{ backgroundColor: '#0a1122', borderColor: '#ffffff20' }} />
                        <Area type="monotone" dataKey="value" stroke="#b900ff" fill="url(#colorValue2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-span-1 space-y-6">
                  {/* Side Stats */}
                  <div className="bg-navy-900/40 rounded-xl p-6 border border-white/5">
                    <h4 className="text-gray-400 text-sm mb-2">AI Confidence Score</h4>
                    <div className="flex items-end gap-2 mb-2">
                       <span className="text-4xl font-bold text-white">8.9</span>
                       <span className="text-sm text-green-400 mb-1">/ 10</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-neon-blue to-neon-green w-[89%]" />
                    </div>
                  </div>

                  <div className="bg-navy-900/40 rounded-xl p-6 border border-white/5">
                    <h4 className="text-gray-400 text-sm mb-4">Active Signals</h4>
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                         <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded bg-white/5 flex items-center justify-center font-bold ${i === 2 ? 'text-red-400' : 'text-green-400'}`}>
                             {i === 1 ? 'L' : i === 2 ? 'S' : 'L'}
                           </div>
                           <div>
                             <p className="text-white text-sm font-medium">{i === 1 ? 'BTC-PERP' : i === 2 ? 'TSLA' : 'XAUUSD'}</p>
                             <p className="text-xs text-gray-500">Entry: {i === 1 ? '64,200' : i === 2 ? '240.50' : '2021.00'}</p>
                           </div>
                         </div>
                         <span className="text-xs px-2 py-1 bg-white/5 rounded text-gray-300">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'signals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-navy-900/40 border border-white/5 p-6 rounded-xl hover:border-neon-blue/30 transition-colors clickable cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2 items-center">
                        <span className="font-bold text-lg text-white">ETH/USDT</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-neon-blue/20 text-neon-blue font-bold">STRONG BUY</span>
                      </div>
                      <span className="text-gray-500 text-xs">2m ago</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Entry Zone</span>
                        <span className="text-white">2,450 - 2,460</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Take Profit</span>
                        <span className="text-green-400">2,600</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Stop Loss</span>
                        <span className="text-red-400">2,380</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 bg-white/5 hover:bg-neon-blue/20 hover:text-neon-blue transition-colors rounded text-sm font-medium">Execute Trade</button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="time" stroke="#ffffff40" />
                    <YAxis stroke="#ffffff40" />
                    <Tooltip cursor={{fill: '#ffffff10'}} contentStyle={{ backgroundColor: '#0a1122', borderColor: '#ffffff20' }} />
                    <Bar dataKey="value" fill="#00ff9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Steps = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
         <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">How It Works</h2>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 -translate-y-1/2 hidden md:block" />
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              { title: "Connect", desc: "Link your exchange securely via API keys.", icon: Lock },
              { title: "Analyze", desc: "AI scans the market 24/7 for opportunities.", icon: Cpu },
              { title: "Signal", desc: "Receive high-probability trade setups.", icon: Zap },
              { title: "Execute", desc: "Trade manually or enable auto-execution.", icon: Check }
            ].map((step, idx) => (
              <div key={idx} className="bg-navy-900 border border-white/10 p-6 rounded-xl text-center group hover:border-neon-blue/50 transition-colors clickable">
                <div className="w-16 h-16 mx-auto bg-navy-800 rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:bg-neon-blue/10 group-hover:text-neon-blue transition-colors relative">
                   <step.icon size={24} />
                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-purple text-white rounded-full text-xs flex items-center justify-center font-bold">
                     {idx + 1}
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-navy-800/30">
       <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16 text-center">Trusted by Pro Traders</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card p-8 rounded-xl relative hover:bg-white/5 transition-colors">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 italic mb-6">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-white/20" />
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
       </div>
    </section>
  );
};

const Pricing = () => {
  const PLANS: PricingPlan[] = [
    { name: 'Starter', price: '$49', features: ['Real-time Market Data', 'Basic AI Signals', '5 Assets', 'Email Support'] },
    { name: 'Pro', price: '$129', features: ['Advanced AI Models', 'Unlimited Assets', 'Auto-Execution', 'Priority Support', 'Risk AI'], isPopular: true },
    { name: 'Elite', price: '$299', features: ['Institutional Data Feed', 'API Access', 'Dedicated Account Mgr', 'Custom Strategies', 'Zero Latency'] },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16 text-center">Transparent Pricing</h2>
        
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:transform hover:-translate-y-2 ${
                plan.isPopular 
                  ? 'bg-gradient-to-b from-white/10 to-transparent border-neon-blue shadow-[0_0_30px_rgba(0,240,255,0.1)]' 
                  : 'bg-transparent border-white/10 hover:border-white/30'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-blue text-navy-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                <span className="text-gray-500 mb-1">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-gray-300">
                    <Check size={16} className="text-neon-green" />
                    {feat}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-bold clickable transition-all ${
                plan.isPopular 
                  ? 'bg-neon-blue text-navy-900 hover:bg-white' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', level: 'Beginner' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', level: 'Beginner' });
    }, 1500);
  };

  return (
    <section className="py-24 bg-navy-900 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="glass-card p-8 md:p-12 rounded-2xl flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to elevate your trading?</h2>
            <p className="text-gray-400 mb-6">Join 10,000+ traders using TradeNexus to beat the market.</p>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-neon-blue/20 transition-all clickable"><Twitter size={20} /></div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-neon-blue/20 transition-all clickable"><Linkedin size={20} /></div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-neon-blue/20 transition-all clickable"><Facebook size={20} /></div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'success' ? (
                <div className="bg-green-500/20 border border-green-500/50 p-6 rounded-lg text-center">
                  <Check size={40} className="mx-auto text-green-400 mb-2" />
                  <h3 className="text-white font-bold text-xl">Welcome Aboard!</h3>
                  <p className="text-gray-300">We've sent a starter guide to your email.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm text-green-400 underline clickable">Send another</button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-navy-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors clickable" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-navy-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors clickable" 
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Experience</label>
                    <select 
                      value={formData.level}
                      onChange={e => setFormData({...formData, level: e.target.value})}
                      className="w-full bg-navy-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue transition-colors clickable appearance-none"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Professional</option>
                      <option>Institutional</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-navy-900 font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all clickable flex justify-center items-center"
                  >
                    {status === 'submitting' ? <div className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" /> : 'Get Early Access'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const items: FAQItem[] = [
    { question: "How does the AI prediction model work?", answer: "Our model uses a combination of LSTM neural networks and Sentiment Analysis algorithms, processing over 500 market indicators in real-time to generate probability-based signals." },
    { question: "Can I connect my own brokerage account?", answer: "Yes, we support API integration with major exchanges including Binance, Coinbase Pro, Interactive Brokers, and TD Ameritrade." },
    { question: "Is my data secure?", answer: "We use bank-grade AES-256 encryption for all data. Your API keys are stored locally on your device or in an encrypted vault, and we never have withdrawal permissions." },
  ];

  return (
    <section className="py-24 bg-navy-800/20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="border border-white/10 rounded-lg overflow-hidden bg-navy-900/50">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex justify-between items-center text-left clickable hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-white">{item.question}</span>
                <ChevronDown className={`transform transition-transform duration-300 text-gray-400 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openIndex === idx ? 'max-h-40 py-4 px-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-900 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-display font-bold text-2xl text-white mb-4">TradeNexus</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering the next generation of traders with institutional-grade artificial intelligence.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-white mb-4">Platform</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Features</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Live Demo</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Pricing</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">API Docs</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">About Us</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Careers</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Blog</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Contact</a></li>
            </ul>
          </div>

          <div>
             <h5 className="font-bold text-white mb-4">Legal</h5>
             <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Terms of Service</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors clickable">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2024 TradeNexus AI Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-gray-500 text-xs">System Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main Layout ---
function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-white selection:bg-neon-blue selection:text-navy-900 font-sans">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Steps />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;