import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Leaf, Eye, EyeOff, User, Lock, Mail, Sparkles, AlertCircle, ArrowRight, Shield, Globe } from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ──────────────────────────────────────────
// COMPONENT: LivingBackground
// ──────────────────────────────────────────
const LivingBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-white">
    {/* Simplified Blobs for performance */}
    <motion.div
      animate={{
        x: [0, 40, 0],
        y: [0, -30, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-emerald-400/10 rounded-full filter blur-[100px]"
    />
    <motion.div
      animate={{
        x: [0, -40, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-sky-400/10 rounded-full filter blur-[120px]"
    />
  </div>
);

// ──────────────────────────────────────────
// COMPONENT: MagneticButton
// ──────────────────────────────────────────
const MagneticButton = ({ children, onClick, className, type = "button", disabled }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

// ──────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────
export default function AuthPage({ onAuth }) {
  const [mode, setMode]       = useState('login'); 
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      const uname = params.get('username');
      const em = params.get('email');
      const ava = params.get('avatar');
      localStorage.setItem('ps_token', token);
      localStorage.setItem('ps_username', uname || '');
      localStorage.setItem('ps_email', em || '');
      localStorage.setItem('ps_avatar', ava || '');
      window.history.replaceState({}, '', '/');
      onAuth({ username: uname, email: em, avatar_url: ava, token });
    }
  }, [onAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && password !== confirm) return setError('Passwords do not match.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/login' : '/register';
      const body = mode === 'login' ? { username, password } : { username, email, password };
      const { data } = await axios.post(`${API}${endpoint}`, body);
      
      localStorage.setItem('ps_token', data.access_token);
      localStorage.setItem('ps_username', data.username);
      localStorage.setItem('ps_email', data.email || '');
      localStorage.setItem('ps_avatar', data.avatar_url || '');
      onAuth({ username: data.username, email: data.email, avatar_url: data.avatar_url, token: data.access_token });
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#fdfdfd] text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <LivingBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[440px] px-6"
      >
        {/* Main Crystal Card */}
        <div className="relative group">
          {/* External Glow */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 to-sky-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
          
          {/* Reduced blur for zero lag */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.8rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-white/90 p-10 overflow-hidden">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center text-center mb-10">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.05 }}
                className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl shadow-[0_12px_24px_-8px_rgba(16,185,129,0.3)] flex items-center justify-center mb-5 rotate-3"
              >
                <Leaf className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 mb-1">PotatoShield</h1>
              <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modern crop diagnostics</span>
              </div>
            </div>

            {/* Premium Tab Switcher - Fixed Visibility */}
            <div className="relative flex p-1.5 bg-gray-950/5 rounded-2xl mb-10 overflow-hidden h-14">
              {['login', 'signup'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setMode(tab); setError(''); }}
                  className="relative flex-1 flex items-center justify-center text-sm font-bold transition-colors duration-300 outline-none"
                  style={{ color: mode === tab ? '#000' : '#888' }}
                >
                  <span className="relative z-20">
                    {tab === 'login' ? 'Sign In' : 'Create Account'}
                  </span>
                  {mode === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 z-10 bg-white rounded-xl shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Error State */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3 text-rose-600 text-sm font-medium leading-relaxed"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <InputGroup icon={<User />} placeholder="Username" value={username} onChange={setUsername} required />
                
                <AnimatePresence mode="popLayout">
                  {mode === 'signup' && (
                    <motion.div key="email" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                      <InputGroup icon={<Mail />} placeholder="Email address (optional)" type="email" value={email} onChange={setEmail} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative group/pw">
                  <InputGroup 
                    icon={<Lock />} 
                    placeholder="Password" 
                    type={showPw ? 'text' : 'password'} 
                    value={password} 
                    onChange={setPassword} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors p-1"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <AnimatePresence mode="popLayout">
                  {mode === 'signup' && (
                    <motion.div key="confirm" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                      <InputGroup icon={<Shield />} placeholder="Confirm Password" type={showPw ? 'text' : 'password'} value={confirm} onChange={setConfirm} required />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MagneticButton
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-gray-950 text-white rounded-2xl h-14 font-bold text-base flex items-center justify-center gap-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] hover:bg-emerald-950 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In' : 'Get Started'}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </MagneticButton>
            </form>

            <div className="relative flex items-center my-10">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="px-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">secure connect</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <MagneticButton
              onClick={() => window.location.href = `${API}/auth/google`}
              className="w-full h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-4 text-sm font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </MagneticButton>

            <div className="mt-10 flex items-center justify-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <Globe size={14} className="text-emerald-400" />
              <span>Edge-to-Edge Encryption Active</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────
// COMPONENT: InputGroup
// ──────────────────────────────────────────
const InputGroup = ({ icon, placeholder, type = "text", value, onChange, required }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      className="w-full h-13 pl-12 pr-4 bg-gray-50/50 border border-gray-200 rounded-[1.1rem] text-sm font-semibold transition-all focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none placeholder:text-gray-400"
    />
  </div>
);
