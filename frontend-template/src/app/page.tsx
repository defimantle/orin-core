"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Brain, 
  Fingerprint, 
  Play, 
  ChevronRight, 
  Home, 
  LayoutGrid, 
  Plane, 
  User, 
  Thermometer, 
  Lightbulb, 
  Music, 
  Bell, 
  Shield, 
  Globe, 
  LogOut,
  Check,
  Smartphone,
  MapPin,
  Clock,
  Zap,
  Plus,
  HelpCircle,
  ChefHat,
  Briefcase,
  Volume2,
  VolumeX,
  EyeOff,
  BellOff,
  Moon,
  Sun,
  Coffee,
  Send,
  ChevronLeft,
  Settings
} from "lucide-react";
import { cn } from "../lib/utils";

// --- Types ---

type View = "landing" | "guest" | "hardware" | "staff";
type GuestSubView = "home" | "spaces" | "trips" | "profile" | "arrival" | "ready" | "control" | "notifications" | "trip-details" | "settings" | "chat";

// --- Components ---

const Logo = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 800 800" 
    className={cn("w-12 h-12", className)}
  >
    <path d="M0 0L800 0L800 800L0 800L0 0Z" fill="transparent"/>
    <g transform="matrix(1.7 0 0 1.7 -267 -438)">
      <path d="M289.333 452.901C289.691 450.36 290.282 447.371 290.876 444.851C297.134 417.654 313.959 394.067 337.636 379.302C361.664 364.349 390.715 359.749 418.185 366.548C446.847 374.627 468.432 390.973 483.721 416.916C497.092 439.605 497.745 472.576 496.479 498.613C496.815 535.146 497.487 576.636 496.317 612.838C504.746 617.675 507.147 619.235 516.725 621.689C524.711 623.734 562.854 620.099 566.245 623.718C565.996 626.021 563.423 626.26 561.39 626.32C554.135 626.534 546.865 626.236 539.594 626.227L491.541 626.212L293.318 626.181L248.682 626.146C243.139 626.17 222.518 627.366 219.108 624.25C221.166 621.213 244.353 622.101 248.652 622.084L299.494 621.853L505.945 622.15C491.712 615.107 477.643 607.937 462.741 602.279C407.484 581.297 346.545 574.153 287.763 578.888C278.2 579.659 257.547 581.239 248.572 583.091L246.38 581.92C260.42 578.892 274.355 577.112 288.581 575.288C288.738 550.009 288.711 524.729 288.5 499.45C288.466 483.671 288.196 468.672 289.333 452.901Z" fill="#222"/>
      <defs>
        <linearGradient id="gradient_0" gradientUnits="userSpaceOnUse" x1="367.52817" y1="684.8429" x2="451.23749" y2="480.24564">
          <stop offset="0" stopColor="#80663C"/>
          <stop offset="1" stopColor="#C4A97A"/>
        </linearGradient>
      </defs>
      <path fill="url(#gradient_0)" d="M289.333 452.901C290.342 453.038 292.73 453.434 293.627 453.46C292.274 469.185 293.124 477.695 292.948 492.94C292.514 520.283 292.381 547.63 292.55 574.977C308.155 574.268 323.56 573.299 339.186 574.121C367.102 575.589 396.059 578.55 423.058 585.984L423.062 500.692C423.051 492.925 422.331 467.089 423.583 460.669C423.849 464.009 423.868 465.701 423.708 469.051C442.211 474.979 457.132 486.796 474.064 495.984C478.311 498.289 491.237 505.849 495.593 504.029C495.826 502.243 495.692 499.612 496.479 498.613C496.815 535.146 497.487 576.636 496.317 612.838C504.746 617.675 507.147 619.235 516.725 621.689C524.711 623.734 562.854 620.099 566.245 623.718C565.996 626.021 563.423 626.26 561.39 626.32C554.135 626.534 546.865 626.236 539.594 626.227L491.541 626.212L293.318 626.181L248.682 626.146C243.139 626.17 222.518 627.366 219.108 624.25C221.166 621.213 244.353 622.101 248.652 622.084L299.494 621.853L505.945 622.15C491.712 615.107 477.643 607.937 462.741 602.279C407.484 581.297 346.545 574.153 287.763 578.888C278.2 579.659 257.547 581.239 248.572 583.091L246.38 581.92C260.42 578.892 274.355 577.112 288.581 575.288C288.738 550.009 288.711 524.729 288.5 499.45C288.466 483.671 288.196 468.672 289.333 452.901Z"/>
      <defs>
        <linearGradient id="gradient_1" gradientUnits="userSpaceOnUse" x1="391.8938" y1="478.52383" x2="420.37872" y2="367.02933">
          <stop offset="0" stopColor="#CDB080"/>
          <stop offset="1" stopColor="#FFE0B2"/>
        </linearGradient>
      </defs>
      <path fill="url(#gradient_1)" d="M289.333 452.901C289.691 450.36 290.282 447.371 290.876 444.851C297.134 417.654 313.959 394.067 337.636 379.302C361.664 364.349 390.715 359.749 418.185 366.548C446.847 374.627 468.432 390.973 483.721 416.916C497.092 439.605 497.745 472.576 496.479 498.613C495.692 499.612 495.826 502.243 495.593 504.029C491.237 505.849 478.311 498.289 474.064 495.984C457.132 486.796 442.211 474.979 423.708 469.051C423.868 465.701 423.849 464.009 423.583 460.669C423.053 439.017 441.508 416.7 460.773 408.544C464.009 407.174 467.188 406.01 470.509 404.875C453.044 385.587 440.873 377.276 415.193 369.954C386.707 364.337 361.948 368.251 337.158 384.31C316.322 397.808 299.555 422.121 294.756 446.619C294.294 448.884 293.917 451.166 293.627 453.46C292.73 453.434 290.342 453.038 289.333 452.901Z"/>
      <path fill="#77613E" d="M248.572 583.091C239.736 584.279 229.876 587.206 221.989 588.022C224.859 586.171 242.308 582.632 246.38 581.92L248.572 583.091Z"/>
    </g>
  </svg>
);

const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void; key?: React.Key }) => (
  <motion.div 
    onClick={onClick}
    whileHover={onClick ? { scale: 1.02, backgroundColor: "#161616" } : {}}
    whileTap={onClick ? { scale: 0.98 } : {}}
    className={cn(
      "bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 transition-all relative overflow-hidden", 
      onClick && "cursor-pointer", 
      className
    )}
  >
    {children}
  </motion.div>
);

const NavHeader = ({ onBack, label, subLabel }: { onBack: () => void; label: string; subLabel?: string }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }} 
    className="relative flex items-center justify-between w-full mb-16 pt-2"
  >
    {/* Dedicated Back Button */}
    <button 
      onClick={onBack} 
      className="group flex items-center gap-3 transition-all z-20"
    >
      <div className="w-10 h-10 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-zinc-800/80 transition-all shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
          <Logo className="w-full h-full p-2 scale-150" />
        </div>
        <ChevronLeft size={20} className="text-zinc-500 group-hover:text-amber-500 group-hover:-translate-x-0.5 transition-all z-10" />
      </div>
      <div className="hidden sm:flex flex-col items-start leading-none opacity-40 group-hover:opacity-100 transition-opacity pt-0.5">
        <span className="text-zinc-600 group-hover:text-amber-500/70 font-mono text-[7px] uppercase tracking-[0.3em] mb-0.5">Return to</span>
        <span className="text-white/80 text-[8px] font-bold uppercase tracking-[0.2em]">ORIN Platform</span>
      </div>
    </button>

    {/* Centered Brand Mark + Module Title */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full z-10">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Logo className="w-10 h-10 md:w-12 md:h-12 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full -z-10" 
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 w-32 justify-center">
            <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
            <span className="text-zinc-600 text-[7px] font-mono uppercase tracking-[0.5em] whitespace-nowrap">{subLabel || "Module"}</span>
            <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
          </div>
          <h2 className="text-white/90 text-[10px] font-bold uppercase tracking-[0.4em] mt-1.5">{label}</h2>
        </div>
      </div>
    </div>

    {/* Right-aligned Status / Activity */}
    <div className="flex items-center gap-4 z-20">
      <div className="hidden md:flex flex-col items-end leading-none opacity-40 pt-0.5 pointer-events-none">
        <span className="text-zinc-600 font-mono text-[7px] uppercase tracking-[0.3em] mb-0.5">Secure</span>
        <span className="text-emerald-500/80 text-[8px] font-bold uppercase tracking-[0.2em]">Validated</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase tracking-[0.3em] shadow-sm backdrop-blur-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        <span className="hidden sm:inline">System</span> Live
      </div>
    </div>
  </motion.div>
);

const IconButton = ({ icon: Icon, active, onClick, label }: { icon: any; active?: boolean; onClick: () => void; label: string }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1.5 transition-all relative group",
      active ? "text-amber-500" : "text-zinc-500 hover:text-zinc-300"
    )}
  >
    <Icon size={22} className={cn("transition-transform duration-300", active && "scale-110")} />
    <span className="text-[9px] font-mono uppercase tracking-[0.2em]">{label}</span>
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
      />
    )}
  </button>
);

// --- Views ---

const LandingPage = ({ onNavigate }: { onNavigate: (view: View) => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 space-y-12 md:space-y-20 max-w-6xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex flex-col items-center space-y-8">
        <Logo className="w-28 h-28 md:w-40 md:h-40" />
        <div className="text-center space-y-4">
          <h1 className="text-7xl md:text-9xl font-light tracking-tighter italic font-serif">ORIN</h1>
          <p className="text-amber-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">The Complete Smart Hospitality Stack</p>
          <p className="text-zinc-400 text-xl md:text-2xl font-light italic font-serif opacity-60">Every space has a song.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto pt-4">
          <button 
            onClick={() => onNavigate("guest")} 
            className="bg-amber-500 text-black px-10 py-4 rounded-full font-medium hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20 text-sm md:text-base"
          >
            Guest App
          </button>
          <button 
            onClick={() => onNavigate("staff")} 
            className="bg-zinc-900 border border-zinc-800 text-white px-10 py-4 rounded-full font-medium hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            Staff Portal
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <Card className="flex flex-col gap-6 md:gap-8 group hover:border-amber-500/40 transition-all duration-500 bg-zinc-900/20 backdrop-blur-sm p-6 md:p-8">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-black">
            <Cpu size={24} className="md:w-7 md:h-7" strokeWidth={1} />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl italic font-serif">ORIN Hardware</h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed font-serif">We bring the smart room to any property with zero renovation.</p>
            <p className="text-amber-500/60 font-mono text-[10px] uppercase tracking-[0.2em] pt-2 md:pt-4">5 sensors · 1 tablet</p>
          </div>
        </Card>

        <Card className="flex flex-col gap-6 md:gap-8 group hover:border-amber-500/40 transition-all duration-500 bg-zinc-900/20 backdrop-blur-sm p-6 md:p-8">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-black">
            <Brain size={24} className="md:w-7 md:h-7" strokeWidth={1} />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl italic font-serif">ORIN Intelligence</h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed font-serif">The room learns you automatically through behavioral AI.</p>
            <p className="text-amber-500/60 font-mono text-[10px] uppercase tracking-[0.2em] pt-2 md:pt-4">Real-time adaptation</p>
          </div>
        </Card>

        <Card className="flex flex-col gap-6 md:gap-8 group hover:border-amber-500/40 transition-all duration-500 bg-zinc-900/20 backdrop-blur-sm p-6 md:p-8">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 transition-all duration-500 group-hover:bg-amber-500 group-hover:text-black">
            <Fingerprint size={24} className="md:w-7 md:h-7" strokeWidth={1} />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl italic font-serif">ORIN Identity</h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed font-serif">Your preferences. On-chain. Self-sovereign and portable.</p>
            <p className="text-amber-500/60 font-mono text-[10px] uppercase tracking-[0.2em] pt-2 md:pt-4">Solana · Portable</p>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full space-y-8 md:space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.3em]">Experience</p>
            <h2 className="text-4xl md:text-6xl italic font-serif leading-tight">See ORIN in action.</h2>
            <p className="text-zinc-500 text-base md:text-lg font-light font-serif">From empty room to intelligent space in 60 seconds.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={() => onNavigate("hardware")}
              className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-8 py-4 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] hover:text-amber-500 hover:border-amber-500/30 transition-all"
            >
              Hardware Setup
            </button>
          </div>
        </div>
        
        <div className="relative aspect-video w-full bg-zinc-900/50 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-zinc-800/50 flex items-center justify-center group cursor-pointer shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber-500 flex items-center justify-center text-black transition-all duration-500 group-hover:scale-110 relative z-10 shadow-2xl shadow-amber-500/40">
            <Play fill="black" size={28} className="md:w-8 md:h-8" />
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-8 md:pt-12 text-center pb-12">
        <button 
          onClick={() => onNavigate("hardware")}
          className="text-zinc-500 font-mono text-[11px] uppercase tracking-[0.4em] hover:text-amber-500 transition-all duration-300 flex items-center gap-4 mx-auto group"
        >
          Configure Hardware Setup 
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-2" />
        </button>
      </motion.div>
    </motion.div>
  );
};

const GuestExperience = ({ onBack }: { onBack: () => void }) => {
  const [subView, setSubView] = useState<GuestSubView>("arrival");
  const [roomStates, setRoomStates] = useState({
    "Living Room": { lights: true, music: true, temp: 22, brightness: 60, volume: 40, curtains: 80, dnd: false, privacy: true },
    "Bedroom": { lights: false, music: false, temp: 19, brightness: 20, volume: 0, curtains: 100, dnd: true, privacy: true },
    "Kitchen": { lights: false, music: false, temp: 24, brightness: 0, volume: 0, curtains: 0, dnd: false, privacy: false },
    "Office": { lights: true, music: true, temp: 21, brightness: 80, volume: 50, curtains: 40, dnd: false, privacy: true },
  });
  const [activeRoom, setActiveRoom] = useState<keyof typeof roomStates>("Living Room");
  const [privacyMode, setPrivacyMode] = useState(true);
  const [dndMode, setDndMode] = useState(false);
  const [activeScene, setActiveScene] = useState("Relax");

  const toggleLight = (room: keyof typeof roomStates) => {
    setRoomStates(prev => ({
      ...prev,
      [room]: { ...prev[room], lights: !prev[room].lights }
    }));
  };

  const toggleMusic = (room: keyof typeof roomStates) => {
    setRoomStates(prev => ({
      ...prev,
      [room]: { ...prev[room], music: !prev[room].music }
    }));
  };

  const updateTemp = (room: keyof typeof roomStates, val: number) => {
    setRoomStates(prev => ({
      ...prev,
      [room]: { ...prev[room], temp: val }
    }));
  };

  const updateBrightness = (room: keyof typeof roomStates, val: number) => {
    setRoomStates(prev => ({
      ...prev,
      [room]: { ...prev[room], brightness: val }
    }));
  };

  const updateVolume = (room: keyof typeof roomStates, val: number) => {
    setRoomStates(prev => ({
      ...prev,
      [room]: { ...prev[room], volume: val }
    }));
  };

  const updateCurtains = (room: keyof typeof roomStates, val: number) => {
    setRoomStates(prev => ({
      ...prev,
      [room]: { ...prev[room], curtains: val }
    }));
  };

  const toggleDND = (room: keyof typeof roomStates) => {
    setRoomStates(prev => ({
      ...prev,
      [room]: { ...prev[room], dnd: !prev[room].dnd }
    }));
  };

  const togglePrivacy = (room: keyof typeof roomStates) => {
    setRoomStates(prev => ({
      ...prev,
      [room]: { ...prev[room], privacy: !prev[room].privacy }
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderSubView = () => {
    switch (subView) {
      case "arrival":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 p-6"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
              <Logo className="w-16 h-16" />
              <div className="flex items-center gap-2 text-amber-500 text-[10px] font-bold uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Before Arrival
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center space-y-2">
              <p className="text-zinc-500 text-lg">Welcome back,</p>
              <h2 className="text-5xl font-bold">Mr. Sterling</h2>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full max-w-sm">
              <Card className="space-y-6">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Your preferences loaded</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Thermometer size={20} />
                      <span>Temperature</span>
                    </div>
                    <span className="font-bold">19°C</span>
                  </div>
                  <div className="w-full h-[1px] bg-zinc-800" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Lightbulb size={20} />
                      <span>Lighting</span>
                    </div>
                    <span className="font-bold">Warm, 40%</span>
                  </div>
                  <div className="w-full h-[1px] bg-zinc-800" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Clock size={20} />
                      <span>Wake-up</span>
                    </div>
                    <span className="font-bold">7:00 AM</span>
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.p variants={itemVariants} className="text-zinc-600 text-xs">Loaded from your ORIN Identity — 4 previous stays</motion.p>
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-zinc-600 text-[10px] uppercase tracking-widest">
              <Shield size={12} />
              On-chain · Solana
            </motion.div>
            <motion.button 
              variants={itemVariants}
              onClick={() => setSubView("ready")}
              className="w-full max-w-sm bg-amber-500 text-black font-bold py-4 rounded-xl mt-8 hover:bg-amber-400 transition-all accent-glow hover:scale-[1.02] active:scale-[0.98]"
            >
              Proceed to Check-in →
            </motion.button>
          </motion.div>
        );
      case "ready":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center min-h-[80vh] space-y-12 p-6"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Room 204 is Ready</h2>
              <p className="text-amber-500 font-medium">Adjusted before you arrived.</p>
            </motion.div>
            
            <Logo className="w-20 h-20 mb-4" />
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
              <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                <Thermometer size={16} className="text-zinc-400" />
                <span>19°C</span>
                <Check size={14} className="text-amber-500" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                <Lightbulb size={16} className="text-zinc-400" />
                <span>Warm lighting</span>
                <Check size={14} className="text-amber-500" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                <Music size={16} className="text-zinc-400" />
                <span>Ambient playlist</span>
                <Check size={14} className="text-amber-500" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-1 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 10 }}
                  animate={{ height: [10, 40, 10] }}
                  transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: Math.random() }}
                  className="w-1 bg-amber-500 rounded-full" 
                />
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-2">
              <p className="text-zinc-400">Welcome back, <span className="text-amber-500 font-bold">Mr. Sterling</span>.</p>
              <p className="text-zinc-500 text-sm">Your room remembers you.</p>
            </motion.div>

            <motion.button 
              variants={itemVariants}
              onClick={() => setSubView("home")}
              className="w-full max-w-xs bg-amber-500 text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition-all accent-glow hover:scale-[1.02] active:scale-[0.98]"
            >
              Enter Room →
            </motion.button>
          </motion.div>
        );
      case "home":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-8 pb-32"
          >
            <NavHeader onBack={onBack} label="ORIN" subLabel="Guest App" />

            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-4xl font-bold">Good afternoon,</h2>
              <h2 className="text-4xl font-bold text-zinc-500">Shalom</h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-amber-500/5 border-amber-500/20 flex items-center justify-between hover:bg-amber-500/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Radisson KL detected nearby</h4>
                    <p className="text-zinc-500 text-xs">Your room is ready · Tap to check in</p>
                  </div>
                </div>
                <button className="bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors">Enter</button>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-12">
              <div className="w-48 h-48 rounded-full border border-amber-500/20 flex items-center justify-center relative">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.05, 0.1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute inset-0 rounded-full border border-amber-500/10" 
                />
                <div className="w-40 h-40 rounded-full bg-amber-500/5 flex items-center justify-center">
                  <span className="text-amber-500 font-bold tracking-widest animate-pulse hover:animate-glitch cursor-default">Hi ORIN</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em]">Quick Actions</p>
              <Card 
                onClick={() => setSubView("control")}
                className="flex items-center justify-between py-5 hover:bg-zinc-900/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-serif italic">Room Control</h4>
                    <p className="text-zinc-500 text-xs font-serif">Adjust lights, temp & mood</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:text-amber-500 transition-colors" />
              </Card>
              <Card 
                onClick={() => setSubView("ready")}
                className="flex items-center justify-between py-5 hover:bg-zinc-900/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <Home size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-serif italic">Check in to Radisson KL</h4>
                    <p className="text-zinc-500 text-xs font-serif">Room 204 · Ready</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:text-amber-500 transition-colors" />
              </Card>
              <Card 
                onClick={() => setSubView("arrival")}
                className="flex items-center justify-between py-5 hover:bg-zinc-900/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-serif italic">Prepare home for arrival</h4>
                    <p className="text-zinc-500 text-xs font-serif">Asaba · ETA 20 min</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:text-amber-500 transition-colors" />
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <button onClick={() => setSubView("chat")} className="text-zinc-600 text-xs font-mono uppercase tracking-widest hover:text-amber-500 transition-colors">or type a message →</button>
            </motion.div>
          </motion.div>
        );
      case "spaces":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-8 pb-32"
          >
            <NavHeader onBack={() => setSubView("home")} label="Spaces" subLabel="Network" />

            <motion.div variants={itemVariants} className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              <button className="bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap font-medium hover:bg-amber-500/20 transition-colors">
                <Home size={18} /> Shalom's Home
              </button>
              <button className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap font-medium hover:bg-zinc-800 transition-colors">
                <LayoutGrid size={18} /> Radisson KL
              </button>
              <button className="bg-zinc-900 border border-zinc-800 text-zinc-600 px-4 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap font-medium hover:bg-zinc-800 transition-colors">
                <Plus size={18} /> Add Space
              </button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-amber-500/5 border-amber-500/20 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-amber-500 text-xs font-bold">ORIN is preparing your space</span>
                </div>
                <p className="text-zinc-400 text-sm">ETA 5 min · Adjusting temperature, lights & music</p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500/50">
                  <MapPin size={20} />
                </div>
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "66%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 h-1 bg-amber-500" 
                />
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em]">Scene Presets</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "Relax", icon: Moon, color: "text-blue-400" },
                  { name: "Focus", icon: Zap, color: "text-amber-400" },
                  { name: "Morning", icon: Sun, color: "text-orange-400" },
                  { name: "Dinner", icon: Coffee, color: "text-rose-400" },
                ].map((scene) => (
                  <Card 
                    key={scene.name}
                    onClick={() => setActiveScene(scene.name)}
                    className={cn(
                      "p-4 flex flex-col items-center gap-3 transition-all duration-300",
                      activeScene === scene.name ? "border-amber-500 bg-amber-500/10 scale-105" : "hover:bg-zinc-900/50"
                    )}
                  >
                    <scene.icon size={20} className={scene.color} />
                    <span className="font-bold text-xs font-serif italic">{scene.name}</span>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-2xl font-serif italic">Shalom's Home</h3>
                  <p className="text-zinc-500 text-xs font-mono">Asaba, Nigeria</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-mono uppercase tracking-widest">
                  <Zap size={14} /> 12 devices
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(Object.keys(roomStates) as Array<keyof typeof roomStates>).map((room) => (
                  <Card 
                    key={room}
                    onClick={() => {
                      setActiveRoom(room);
                      setSubView("control");
                    }}
                    className="p-6 space-y-6 hover:bg-zinc-900/40 transition-all cursor-pointer group border-zinc-800/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-amber-500 transition-all duration-500 group-hover:scale-110">
                        {room === "Kitchen" ? <ChefHat size={24} /> : room === "Office" ? <Briefcase size={24} /> : <LayoutGrid size={24} />}
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-400 text-sm font-mono">{roomStates[room].temp}°C</span>
                        <p className="text-zinc-600 text-[10px] uppercase font-mono">Current</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg font-serif italic">{room}</h4>
                      <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">4 active devices</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLight(room);
                        }}
                        className={cn(
                          "w-full border text-[10px] font-mono uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300",
                          roomStates[room].lights 
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
                            : "bg-zinc-900/50 border-zinc-800 text-zinc-600"
                        )}
                      >
                        <Lightbulb size={14} /> {roomStates[room].lights ? "On" : "Off"}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMusic(room);
                        }}
                        className={cn(
                          "w-full border text-[10px] font-mono uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300",
                          roomStates[room].music 
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
                            : "bg-zinc-900/50 border-zinc-800 text-zinc-600"
                        )}
                      >
                        <Music size={14} /> {roomStates[room].music ? "On" : "Off"}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      case "trips":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-8 pb-32"
          >
            <NavHeader onBack={() => setSubView("home")} label="Travel" subLabel="History & Plans" />

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Upcoming</p>
              <Card className="flex items-center justify-between hover:bg-[#161616] transition-all cursor-pointer group" onClick={() => setSubView("trip-details")}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <Plane size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Lagos → Kuala Lumpur</h4>
                    <p className="text-zinc-500 text-xs">Emirates · EK 732</p>
                    <p className="text-zinc-600 text-[10px]">Sun, Mar 24 · 11:45 AM</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-zinc-700" />
              </Card>

              <Card className="flex items-center justify-between hover:bg-[#161616] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-amber-500">
                    <Home size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Radisson Hotel KL</h4>
                    <p className="text-zinc-500 text-xs">Room 204 · King Bed</p>
                    <p className="text-zinc-600 text-[10px]">Mar 24 — Mar 28</p>
                  </div>
                </div>
                <span className="font-bold text-zinc-400">$340</span>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em]">Past Trips</p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { hotel: "The Ritz-Carlton", city: "Dubai", date: "Jan 12 — Jan 15", price: "$1,240", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400" },
                  { hotel: "Marriott Marquis", city: "New York", date: "Dec 05 — Dec 10", price: "$2,100", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400" },
                  { hotel: "Aman Tokyo", city: "Tokyo", date: "Nov 18 — Nov 22", price: "$3,500", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=400" },
                ].map((trip, i) => (
                  <Card key={i} className="flex items-center gap-6 p-4 hover:bg-zinc-900/40 transition-all group border-zinc-800/50">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                      <img src={trip.img} alt={trip.hotel} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-lg font-serif italic">{trip.hotel}</h4>
                      <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">{trip.city} · {trip.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-zinc-400 text-base font-mono">{trip.price}</span>
                      <p className="text-zinc-600 text-[8px] uppercase font-mono">Total</p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      case "control":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-8 pb-32"
          >
            <NavHeader onBack={() => setSubView("spaces")} label="Control" subLabel={activeRoom} />

            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold">Climate & Mood</h2>
              <p className="text-zinc-500 text-sm">Adjust your environment in real-time.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="space-y-6 p-8 bg-zinc-900/20 border-zinc-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Thermometer size={24} strokeWidth={1.5} />
                    <span className="font-bold font-serif italic text-lg">Temperature</span>
                  </div>
                  <span className="text-3xl font-mono font-bold">{roomStates[activeRoom].temp}°C</span>
                </div>
                <div className="relative h-1.5 bg-zinc-900 rounded-full">
                  <input 
                    type="range" 
                    min="16" 
                    max="30" 
                    value={roomStates[activeRoom].temp}
                    onChange={(e) => updateTemp(activeRoom, parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ width: `${((roomStates[activeRoom].temp - 16) / 14) * 100}%` }}
                    className="absolute h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)]" 
                  />
                </div>
                <div className="flex justify-between text-[9px] text-zinc-600 uppercase font-mono tracking-widest">
                  <span>16°C</span>
                  <span>30°C</span>
                </div>
              </Card>

              <Card className="space-y-6 p-8 bg-zinc-900/20 border-zinc-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Lightbulb size={24} strokeWidth={1.5} />
                    <span className="font-bold font-serif italic text-lg">Lighting</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-mono font-bold">{roomStates[activeRoom].brightness}%</span>
                    <button 
                      onClick={() => toggleLight(activeRoom)}
                      className={cn(
                        "w-12 h-6 rounded-full relative transition-all duration-500",
                        roomStates[activeRoom].lights ? "bg-amber-500" : "bg-zinc-800"
                      )}
                    >
                      <motion.div 
                        animate={{ x: roomStates[activeRoom].lights ? 26 : 4 }}
                        className="absolute top-1 w-4 h-4 bg-black rounded-full shadow-sm" 
                      />
                    </button>
                  </div>
                </div>
                <div className="relative h-1.5 bg-zinc-900 rounded-full">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={roomStates[activeRoom].brightness}
                    onChange={(e) => updateBrightness(activeRoom, parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ width: `${roomStates[activeRoom].brightness}%` }}
                    className="absolute h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)]" 
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Warm", "Daylight", "Night"].map(mode => (
                    <button 
                      key={mode}
                      className={cn(
                        "text-[10px] font-mono uppercase tracking-widest py-2.5 rounded-xl transition-all duration-300",
                        mode === "Warm" ? "bg-amber-500 text-black font-bold" : "bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="space-y-6 p-8 bg-zinc-900/20 border-zinc-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-amber-500">
                    <LayoutGrid size={24} strokeWidth={1.5} />
                    <span className="font-bold font-serif italic text-lg">Curtains</span>
                  </div>
                  <span className="text-3xl font-mono font-bold">{roomStates[activeRoom].curtains}%</span>
                </div>
                <div className="relative h-1.5 bg-zinc-900 rounded-full">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={roomStates[activeRoom].curtains}
                    onChange={(e) => updateCurtains(activeRoom, parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ width: `${roomStates[activeRoom].curtains}%` }}
                    className="absolute h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)]" 
                  />
                </div>
                <div className="flex justify-between text-[9px] text-zinc-600 uppercase font-mono tracking-widest">
                  <span>Closed</span>
                  <span>Open</span>
                </div>
              </Card>

              <Card className="space-y-6 p-8 bg-zinc-900/20 border-zinc-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Music size={24} strokeWidth={1.5} />
                    <span className="font-bold font-serif italic text-lg">Ambient Audio</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      {[...Array(3)].map((_, i) => (
                        <motion.div 
                          key={i}
                          animate={roomStates[activeRoom].music ? { height: [4, 16, 4] } : { height: 4 }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                          className="w-1 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.4)]" 
                        />
                      ))}
                    </div>
                    <button 
                      onClick={() => toggleMusic(activeRoom)}
                      className={cn(
                        "w-12 h-6 rounded-full relative transition-all duration-500",
                        roomStates[activeRoom].music ? "bg-amber-500" : "bg-zinc-800"
                      )}
                    >
                      <motion.div 
                        animate={{ x: roomStates[activeRoom].music ? 26 : 4 }}
                        className="absolute top-1 w-4 h-4 bg-black rounded-full shadow-sm" 
                      />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-inner">
                    {roomStates[activeRoom].music ? <Volume2 size={24} className="text-amber-500" /> : <VolumeX size={24} className="text-zinc-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base font-serif italic">Midnight in Tokyo</p>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Lo-fi Ambient</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-zinc-500 hover:text-amber-500 transition-colors"><ChevronLeft size={24} /></button>
                    <button className="p-2 text-amber-500 hover:scale-110 transition-transform"><Play size={28} fill="currentColor" /></button>
                    <button className="p-2 text-zinc-500 hover:text-amber-500 transition-colors"><ChevronRight size={24} /></button>
                  </div>
                </div>
                <div className="relative h-1.5 bg-zinc-900 rounded-full">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={roomStates[activeRoom].volume}
                    onChange={(e) => updateVolume(activeRoom, parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ width: `${roomStates[activeRoom].volume}%` }}
                    className="absolute h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)]" 
                  />
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card 
                  onClick={() => togglePrivacy(activeRoom)}
                  className={cn(
                    "flex flex-col items-center gap-4 p-8 transition-all duration-500",
                    roomStates[activeRoom].privacy ? "bg-amber-500/10 border-amber-500/30" : "bg-zinc-900/20 border-zinc-800/50"
                  )}
                >
                  <EyeOff size={28} className={roomStates[activeRoom].privacy ? "text-amber-500" : "text-zinc-600"} />
                  <div className="text-center space-y-1">
                    <p className="font-bold text-sm font-serif italic">Privacy</p>
                    <p className="text-[9px] text-zinc-500 uppercase font-mono tracking-widest">{roomStates[activeRoom].privacy ? "Active" : "Off"}</p>
                  </div>
                </Card>
                <Card 
                  onClick={() => toggleDND(activeRoom)}
                  className={cn(
                    "flex flex-col items-center gap-4 p-8 transition-all duration-500",
                    roomStates[activeRoom].dnd ? "bg-amber-500/10 border-amber-500/30" : "bg-zinc-900/20 border-zinc-800/50"
                  )}
                >
                  <BellOff size={28} className={roomStates[activeRoom].dnd ? "text-amber-500" : "text-zinc-600"} />
                  <div className="text-center space-y-1">
                    <p className="font-bold text-sm font-serif italic">DND</p>
                    <p className="text-[9px] text-zinc-500 uppercase font-mono tracking-widest">{roomStates[activeRoom].dnd ? "Active" : "Off"}</p>
                  </div>
                </Card>
              </div>

              <Card className="p-8 bg-zinc-900/20 border-zinc-800/50 flex items-center justify-between group cursor-pointer hover:bg-zinc-900/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base font-serif italic">Service Request</h4>
                    <p className="text-zinc-500 text-xs font-serif">Housekeeping, Towels, etc.</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-zinc-700 group-hover:text-amber-500 transition-colors" />
              </Card>
            </motion.div>
          </motion.div>
        );
      case "notifications":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-8 pb-32"
          >
            <NavHeader onBack={() => setSubView("home")} label="Inbox" subLabel="Notifications" />

            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold">Notifications</h2>
              <p className="text-zinc-500 text-sm">Stay updated with your spaces.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {[
                { title: "Space Ready", desc: "Your room at Radisson Blu is now at 19°C.", time: "2m ago", icon: Home },
                { title: "New Trip Added", desc: "Your flight to Tokyo has been synced.", time: "1h ago", icon: Plane },
                { title: "Security Alert", desc: "Privacy mode was enabled in Living Room.", time: "3h ago", icon: Shield },
              ].map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="flex items-start gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-amber-500 shrink-0">
                      <n.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm">{n.title}</h4>
                        <span className="text-[10px] text-zinc-600 font-bold uppercase">{n.time}</span>
                      </div>
                      <p className="text-zinc-500 text-xs mt-1">{n.desc}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case "trip-details":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-8 pb-32"
          >
            <NavHeader onBack={() => setSubView("trips")} label="Logistics" subLabel="Trip Details" />

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="h-48 rounded-2xl bg-zinc-900 overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/kl/800/600" 
                  alt="Kuala Lumpur" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-3xl font-bold">Radisson Blu, KL</h2>
                  <p className="text-zinc-400">Kuala Lumpur, Malaysia</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 space-y-1">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Check-in</p>
                  <p className="font-bold">Oct 24, 2024</p>
                </Card>
                <Card className="p-4 space-y-1">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Check-out</p>
                  <p className="font-bold">Oct 28, 2024</p>
                </Card>
              </div>

              <Card className="p-6 space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-500">Reservation Info</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Confirmation</span>
                    <span className="font-mono font-bold">#ORIN-99281</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Room Type</span>
                    <span className="font-bold">Executive Suite</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Guests</span>
                    <span className="font-bold">2 Adults</span>
                  </div>
                </div>
              </Card>

              <button className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition-all">
                Manage Reservation
              </button>
            </motion.div>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-8 pb-32"
          >
            <NavHeader onBack={() => setSubView("profile")} label="System" subLabel="Settings" />

            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold">App Settings</h2>
              <p className="text-zinc-500 text-sm">Configure your ORIN experience.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">General</p>
                {[
                  { label: "Language", value: "English (US)" },
                  { label: "Units", value: "Metric (°C)" },
                  { label: "Timezone", value: "Auto (GMT+8)" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between items-center p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl">
                    <span className="font-bold text-sm">{s.label}</span>
                    <span className="text-amber-500 text-sm font-bold">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Privacy</p>
                <div className="flex justify-between items-center p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl">
                  <div className="space-y-1">
                    <p className="font-bold text-sm">Share Usage Data</p>
                    <p className="text-zinc-500 text-[10px]">Help us improve ORIN</p>
                  </div>
                  <div className="w-12 h-6 bg-amber-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "profile":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-8 pb-32"
          >
            <NavHeader onBack={onBack} label="Identity" subLabel="Profile" />
            <motion.div variants={itemVariants}>
              <Card className="bg-zinc-900/50 border-zinc-800 p-8 flex flex-col items-center space-y-4 relative">
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400 font-bold">S</div>
                <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 text-4xl font-bold">S</div>
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-bold">Shalom Azorboh</h3>
                  <p className="text-zinc-500 text-xs font-mono">0x4f3...a91c</p>
                </div>
                <div className="flex items-center gap-2 bg-amber-500/10 text-amber-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-500/20">
                  <Shield size={12} /> ORIN Identity Verified
                </div>
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest">Member since <span className="text-zinc-400">2024</span> · <span className="text-zinc-400">5</span> stays</p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Your Preferences</p>
                <button className="text-zinc-600 text-[10px] uppercase tracking-widest hover:text-zinc-400 transition-colors">Tap to edit</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 space-y-2 hover:bg-[#161616] transition-all">
                  <Thermometer size={16} className="text-amber-500" />
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Sleep temp</p>
                  <p className="font-bold">19°C</p>
                </Card>
                <Card className="p-4 space-y-2 hover:bg-[#161616] transition-all">
                  <Lightbulb size={16} className="text-amber-500" />
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Lighting</p>
                  <p className="font-bold">Warm</p>
                </Card>
                <Card className="p-4 space-y-2 hover:bg-[#161616] transition-all">
                  <Music size={16} className="text-amber-500" />
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Music</p>
                  <p className="font-bold">Ambient</p>
                </Card>
                <Card className="p-4 space-y-2 hover:bg-[#161616] transition-all">
                  <LayoutGrid size={16} className="text-amber-500" />
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Food</p>
                  <p className="font-bold">No seafood</p>
                </Card>
              </div>
              <div className="flex items-center justify-center gap-2 text-zinc-600 text-[10px] uppercase tracking-widest py-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Synced on Solana · Updates travel to all ORIN spaces
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Settings</p>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-900 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <Bell size={20} />
                    <span className="text-sm font-medium">Notifications</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-700" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-900 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <Shield size={20} />
                    <span className="text-sm font-medium">Privacy & Security</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-700" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-zinc-900 rounded-xl transition-colors group">
                  <div className="flex items-center gap-4 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <Globe size={20} />
                    <span className="text-sm font-medium">Language</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-700" />
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Settings</p>
              {[
                { icon: Shield, label: "Privacy & Security", id: "settings" },
                { icon: Bell, label: "Notifications", id: "notifications" },
                { icon: Smartphone, label: "Connected Devices", id: "settings" },
                { icon: HelpCircle, label: "Support", id: "settings" },
              ].map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => setSubView(item.id as GuestSubView)}
                  className="w-full flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-900 rounded-xl hover:bg-zinc-900 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-zinc-500 group-hover:text-amber-500 transition-colors" />
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-700" />
                </button>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-6 pt-8">
              <p className="text-zinc-600 text-[10px] uppercase tracking-widest max-w-[200px] mx-auto">
                Your data is encrypted and stored on Solana. Owned by you. Portable across every ORIN property.
              </p>
              <button onClick={onBack} className="text-zinc-500 text-xs font-bold flex items-center gap-2 mx-auto hover:text-zinc-300 transition-colors">
                <LogOut size={16} /> Sign out
              </button>
            </motion.div>
          </motion.div>
        );
      case "chat":
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 flex flex-col h-screen"
          >
            <NavHeader onBack={() => setSubView("home")} label="Assistant" subLabel="ORIN AI" />

            <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar pb-24">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Brain size={16} />
                </div>
                <div className="bg-zinc-900/50 border border-zinc-900 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-sm text-zinc-300">Hello Shalom! I'm ORIN. How can I help you with your space today?</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-amber-500 text-black p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                  <p className="text-sm font-medium">Set the temperature to 21°C in the office.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Brain size={16} />
                </div>
                <div className="bg-zinc-900/50 border border-zinc-900 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-sm text-zinc-300">Understood. Setting Office temperature to 21°C. Anything else?</p>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-black via-black to-transparent">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <button className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-black hover:bg-amber-400 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-md md:max-w-2xl lg:max-w-4xl mx-auto relative">
      <AnimatePresence mode="wait">
        {renderSubView()}
      </AnimatePresence>

      {["home", "spaces", "trips", "profile"].includes(subView) && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/80 backdrop-blur-xl border-t border-zinc-900 px-8 py-6 flex justify-between items-center z-50"
        >
          <IconButton icon={Home} active={subView === "home"} onClick={() => setSubView("home")} label="Home" />
          <IconButton icon={LayoutGrid} active={subView === "spaces"} onClick={() => setSubView("spaces")} label="Spaces" />
          <IconButton icon={Plane} active={subView === "trips"} onClick={() => setSubView("trips")} label="Trips" />
          <IconButton icon={User} active={subView === "profile"} onClick={() => setSubView("profile")} label="Profile" />
        </motion.div>
      )}
    </div>
  );
};

const HardwareSetup = ({ onBack }: { onBack: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 5 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const devices = [
    { name: "Temperature Sensor", location: "Ceiling · Room center", icon: Thermometer },
    { name: "Smart Lighting", location: "4 zones · Dimmable", icon: Lightbulb },
    { name: "Motion Detector", location: "Entry · Desk · Bed zones", icon: LayoutGrid },
    { name: "Smart Lock", location: "Main door · BLE enabled", icon: Shield },
    { name: "Room Tablet", location: "Bedside · 10\" display", icon: Smartphone },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black text-white p-6 space-y-12 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto"
    >
      <NavHeader onBack={onBack} label="ORIN" subLabel="Configuration" />

      <motion.div variants={itemVariants} className="space-y-8 relative">
        <h2 className="text-5xl md:text-7xl font-light font-serif italic leading-tight">Your room is now <span className="text-amber-500">intelligent.</span></h2>
        <p className="text-zinc-500 text-lg md:text-xl font-serif italic">5 devices. Zero renovation. Instant intelligence.</p>
        
        {/* Advanced Scanning Animation */}
        <div className="relative w-full h-64 flex items-center justify-center my-12 overflow-hidden rounded-3xl bg-zinc-900/10 border border-zinc-800/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
          
          <div className="relative w-48 h-48">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-amber-500/30"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-dashed border-amber-500/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Logo className="w-20 h-20 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]" />
            </div>
            
            {/* Scanning Line Animation */}
            <motion.div 
              animate={{ 
                top: ["0%", "100%", "0%"],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.8)] z-10"
            />
            
            {/* Pulse Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                className="absolute inset-0 rounded-full border border-amber-500/40"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-amber-500 font-mono text-[10px] uppercase tracking-[0.4em] justify-center md:justify-start">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          {Math.min(progress, 5)}/5 devices connected
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.1 }}
          >
            <Card className={cn("flex items-center justify-between transition-all duration-500", i >= progress ? "opacity-40 grayscale" : "opacity-100 grayscale-0 border-amber-500/30")}>
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center transition-colors", i < progress ? "text-amber-500" : "text-zinc-700")}>
                  <device.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{device.name}</h4>
                  <p className="text-zinc-500 text-xs">{device.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                {i < progress ? (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-emerald-500 flex items-center gap-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
                  </motion.span>
                ) : i === progress ? (
                  <span className="text-zinc-500 animate-pulse flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> Booting...</span>
                ) : (
                  <span className="text-zinc-700">Waiting</span>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.button 
        variants={itemVariants}
        disabled={progress < 5}
        className={cn(
          "w-full py-4 rounded-xl font-bold transition-all",
          progress < 5 ? "bg-zinc-900 text-zinc-600 cursor-not-allowed" : "bg-amber-500 text-black accent-glow hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        {progress < 5 ? "Initializing..." : "Complete Setup"}
      </motion.button>
    </motion.div>
  );
};

const StaffDashboard = ({ onBack }: { onBack: () => void }) => {
  const [selectedGuest, setSelectedGuest] = useState<any | null>(null);

  const guests = [
    { 
      name: "James Sterling", tier: "Platinum", room: "1204", eta: "In 2h", status: "Action Required", color: "text-amber-500",
      details: { temp: "22°C", lighting: "Warm", pillow: "Firm", wakeUp: "07:00", purpose: "Business" }
    },
    { 
      name: "Elena Morozova", tier: "Gold", room: "0815", eta: "In 45m", status: "Preparing", color: "text-amber-500",
      details: { temp: "21°C", lighting: "Daylight", pillow: "Soft", wakeUp: "08:30", purpose: "Leisure" }
    },
    { 
      name: "Takeshi Nakamura", tier: "Platinum", room: "2201", eta: "In 4h", status: "Ready", color: "text-emerald-500",
      details: { temp: "23°C", lighting: "Night", pillow: "Memory Foam", wakeUp: "06:00", purpose: "Business" }
    },
    { 
      name: "Sofia Castellani", tier: "Silver", room: "0603", eta: "In 1h", status: "Action Required", color: "text-amber-500",
      details: { temp: "20°C", lighting: "Warm", pillow: "Soft", wakeUp: "09:00", purpose: "Leisure" }
    },
    { 
      name: "Alexander Voss", tier: "Platinum", room: "1801", eta: "In 3h", status: "Preparing", color: "text-amber-500",
      details: { temp: "22°C", lighting: "Warm", pillow: "Firm", wakeUp: "07:30", purpose: "Business" }
    },
    { 
      name: "Priya Sharma", tier: "Gold", room: "0912", eta: "In 5h", status: "Ready", color: "text-emerald-500",
      details: { temp: "21°C", lighting: "Warm", pillow: "Soft", wakeUp: "08:00", purpose: "Leisure" }
    },
    { 
      name: "Henrik Larsen", tier: "Silver", room: "1502", eta: "Arrived", status: "Ready", color: "text-emerald-500",
      details: { temp: "22°C", lighting: "Daylight", pillow: "Memory Foam", wakeUp: "07:15", purpose: "Business" }
    },
    { 
      name: "Marcus Thorne", tier: "Platinum", room: "2504", eta: "In 6h", status: "Preparing", color: "text-amber-500",
      details: { temp: "23°C", lighting: "Warm", pillow: "Firm", wakeUp: "06:30", purpose: "Business" }
    },
    { 
      name: "Isabella Rossi", tier: "Gold", room: "1102", eta: "In 1.5h", status: "Action Required", color: "text-amber-500",
      details: { temp: "21°C", lighting: "Night", pillow: "Soft", wakeUp: "09:15", purpose: "Leisure" }
    },
    { 
      name: "Chen Wei", tier: "Platinum", room: "3001", eta: "In 8h", status: "Ready", color: "text-emerald-500",
      details: { temp: "22°C", lighting: "Warm", pillow: "Memory Foam", wakeUp: "07:00", purpose: "Business" }
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black text-white p-6 space-y-12 max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto"
    >
      <NavHeader onBack={onBack} label="ORIN" subLabel="Staff Portal" />

      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-5xl md:text-7xl font-light font-serif italic leading-tight">
          {guests.length} Arrivals. <br/>
          <span className="text-amber-500">{guests.filter(g => g.status !== 'Ready').length} pending.</span>
        </h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.4em]">Intelligence briefing · Today</p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-amber-500 font-mono text-[10px] uppercase tracking-[0.3em]">
            <Brain size={16} /> AI Behavioral Intelligence
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "James Sterling", score: "94%", desc: "Always adjusts temp to 24°C on night 1. Pre-configured.", icon: Zap, stays: 3 },
            { name: "Elena Morozova", score: "87%", desc: "Requests extra towels within 2hrs of check-in. Pre-staged.", icon: Clock, stays: 2 },
            { name: "Takeshi Nakamura", score: "91%", desc: "Prefers ambient lo-fi music at 8pm. Playlist queued.", icon: Brain, stays: 5 }
          ].map((brief, i) => (
            <Card key={i} className="bg-amber-500/5 border-amber-500/20 flex items-start gap-5 hover:bg-amber-500/10 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                <brief.icon size={24} />
              </div>
              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base font-serif italic">{brief.name}</span>
                  <span className="bg-amber-500/20 text-amber-500 text-[9px] px-2 py-0.5 rounded-full font-mono font-bold">{brief.score}</span>
                </div>
                <p className="text-zinc-400 text-sm font-serif italic leading-relaxed">{brief.desc}</p>
                <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest pt-2">Based on {brief.stays} past stays</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Dynamic Name Feed */}
        <div className="bg-zinc-900/20 rounded-2xl p-8 border border-zinc-800/50 overflow-hidden relative backdrop-blur-sm group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
            {guests.map((g, i) => (
              <div key={i} className="flex items-center gap-6 group cursor-default">
                <span className="text-zinc-600 font-mono text-[11px] uppercase tracking-[0.3em]">{g.room}</span>
                <span className="text-zinc-300 text-lg font-serif italic group-hover:text-amber-500 transition-all duration-500 group-hover:scale-105">{g.name}</span>
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className="w-2 h-2 rounded-full bg-amber-500" 
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {guests.map((g, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-6 group cursor-default">
                <span className="text-zinc-600 font-mono text-[11px] uppercase tracking-[0.3em]">{g.room}</span>
                <span className="text-zinc-300 text-lg font-serif italic group-hover:text-amber-500 transition-all duration-500 group-hover:scale-105">{g.name}</span>
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  className="w-2 h-2 rounded-full bg-amber-500" 
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Guest Table - Desktop / Tablet */}
      <motion.div variants={itemVariants} className="hidden md:block overflow-x-auto -mx-6 px-6 scrollbar-hide">
        <div className="min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] border-b border-zinc-900 font-mono">
                <th className="py-6 px-4 font-bold">Guest</th>
                <th className="py-6 px-4 font-bold">Room</th>
                <th className="py-6 px-4 font-bold">ETA</th>
                <th className="py-6 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/30">
              {guests.map((guest, i) => (
                <motion.tr 
                  key={i} 
                  whileHover={{ backgroundColor: "rgba(24, 24, 27, 0.4)" }}
                  onClick={() => setSelectedGuest(guest)}
                  className="group transition-all duration-500 border-b border-zinc-900/50 cursor-pointer"
                >
                  <td className="py-8 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-xl font-serif italic group-hover:text-amber-500 transition-colors">{guest.name}</span>
                      <span className="text-zinc-500 text-[9px] uppercase tracking-[0.3em] font-mono">{guest.tier}</span>
                    </div>
                  </td>
                  <td className="py-8 px-4 font-mono text-base text-zinc-300">{guest.room}</td>
                  <td className="py-8 px-4 text-zinc-400 text-sm font-mono">{guest.eta}</td>
                  <td className="py-8 px-4">
                    <div className={cn("flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800/50", guest.color)}>
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={cn("w-2 h-2 rounded-full", guest.color.replace('text-', 'bg-'))} 
                      />
                      {guest.status}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Guest List - Mobile View (Cards) */}
      <motion.div variants={itemVariants} className="md:hidden space-y-4">
        {guests.map((guest, i) => (
          <Card 
            key={i} 
            onClick={() => setSelectedGuest(guest)}
            className="flex items-center justify-between p-6 active:scale-[0.98] transition-all border-zinc-800/50"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold text-lg font-serif italic">{guest.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">{guest.room}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-zinc-600 text-[9px] uppercase tracking-widest">{guest.tier}</span>
              </div>
            </div>
            <div className={cn("flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800/50", guest.color)}>
              {guest.status}
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Guest Details Sidebar Overlay */}
      <AnimatePresence>
        {selectedGuest && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGuest(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-zinc-950/80 border-l border-white/10 shadow-2xl z-[70] backdrop-blur-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2 text-amber-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                  <Brain size={14} /> Intelligence Profile
                </div>
                <button 
                  onClick={() => setSelectedGuest(null)}
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                   ✕
                </button>
              </div>

              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="text-5xl font-bold font-serif italic text-white leading-tight">{selectedGuest.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-amber-500 font-mono font-bold text-xs uppercase tracking-[0.2em]">{selectedGuest.room} · {selectedGuest.tier}</span>
                    <div className={cn("flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest", selectedGuest.color)}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", selectedGuest.color.replace('text-', 'bg-'))} />
                      {selectedGuest.status}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] border-b border-zinc-900 pb-3">Physical Preferences</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Temperature", value: selectedGuest.details.temp, icon: Thermometer },
                      { label: "Lighting", value: selectedGuest.details.lighting, icon: Lightbulb },
                      { label: "Pillow", value: selectedGuest.details.pillow, icon: Shield },
                      { label: "Wake-up", value: selectedGuest.details.wakeUp, icon: Clock },
                    ].map((pref, i) => (
                      <div key={i} className="bg-zinc-900/40 p-5 rounded-2xl border border-white/5 space-y-2">
                        <pref.icon size={16} className="text-amber-500/60" />
                        <p className="text-zinc-500 text-[9px] uppercase tracking-[0.2em]">{pref.label}</p>
                        <p className="text-white font-bold text-lg font-serif italic">{pref.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] border-b border-zinc-900 pb-3">Stay Context</h4>
                  <div className="bg-zinc-900/40 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-xs">Primary Purpose</span>
                      <span className="text-white font-bold font-serif italic">{selectedGuest.details.purpose}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-xs">Estimated Arrival</span>
                      <span className="text-amber-500 font-mono font-bold">{selectedGuest.eta}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-12">
                  <button className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition-all accent-glow">
                    Deploy AI Configuration
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-8"
        >
          <Logo className="w-32 h-32" />
          <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
            Initializing ORIN
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black">
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <LandingPage onNavigate={setView} />
          </motion.div>
        )}
        {view === "guest" && (
          <motion.div 
            key="guest"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GuestExperience onBack={() => setView("landing")} />
          </motion.div>
        )}
        {view === "hardware" && (
          <motion.div 
            key="hardware"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <HardwareSetup onBack={() => setView("landing")} />
          </motion.div>
        )}
        {view === "staff" && (
          <motion.div 
            key="staff"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <StaffDashboard onBack={() => setView("landing")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
