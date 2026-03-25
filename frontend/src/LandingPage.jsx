import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Menu, X, Zap, Shield, Smartphone,
  ChevronRight, ArrowRight, Globe, Sparkles
} from 'lucide-react';

// ── Scrolling stat items ──────────────────────────────────────────────────────
const STATS = [
  '🥔 Potatoes are the 4th most important food crop on Earth',
  '🌍 Over 1.3 billion people depend on potatoes for daily nutrition',
  '📉 Late Blight can destroy an entire field within days',
  '💰 Potato diseases cost farmers $5 billion+ in losses every year',
  '⚡ PotatoShield diagnoses disease in under 3 seconds',
  '🧠 97–100% AI diagnostic accuracy powered by deep learning',
  '📱 Works on iOS, Android & Windows — completely free',
  '🌿 Early detection prevents Late Blight from spreading across fields',
];

// ── Feature cards ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Zap className="w-7 h-7 text-amber-500" />,
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    title: 'Instant AI Diagnosis',
    desc: 'Upload a photo of your potato leaves and receive a full AI-powered disease report in under 3 seconds. No lab, no expertise, no waiting.',
  },
  {
    icon: <Shield className="w-7 h-7 text-emerald-500" />,
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    title: 'Detect Before It Spreads',
    desc: 'PotatoShield identifies Early Blight, Late Blight and Healthy plants — so you can take action before the disease destroys your entire harvest.',
  },
  {
    icon: <Smartphone className="w-7 h-7 text-sky-500" />,
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    title: 'Works on Any Device',
    desc: 'Runs in your browser on any smartphone or desktop. Install it as an app on iOS or Android for a native, offline-ready experience — for free.',
  },
];

// ── Stat cards ────────────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    value: '$5B+',
    label: 'Lost annually to potato disease worldwide',
    gradient: 'from-rose-50 to-rose-100',
    border: 'border-rose-200',
    text: 'text-rose-600',
  },
  {
    value: '30%',
    label: 'Of global yield destroyed by Late Blight',
    gradient: 'from-amber-50 to-amber-100',
    border: 'border-amber-200',
    text: 'text-amber-600',
  },
  {
    value: '< 3s',
    label: 'PotatoShield diagnosis — faster than any lab',
    gradient: 'from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
  },
];

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Features', href: '#features' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function LandingPage({ onGetStarted }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── Scrolling marquee keyframe ─────────────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 42s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header>
        <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-3.5">
          <div className="mx-auto max-w-6xl flex items-center justify-between gap-6">

            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-gradient-to-tr from-emerald-600 to-emerald-400 p-1.5 rounded-[10px] shadow-sm flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">PotatoShield</span>
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center bg-gray-100/50 rounded-full px-1 border border-gray-200/50">
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-5 py-1.5 text-sm font-semibold rounded-full m-1 text-gray-500 hover:text-gray-900 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Auth buttons + hamburger */}
            <div className="flex items-center gap-2">
              <button
                onClick={onGetStarted}
                className="hidden sm:block px-5 py-2 text-sm font-semibold text-gray-700 border border-gray-200/80 rounded-full hover:bg-gray-50 transition-all bg-white/60 backdrop-blur"
              >
                Login
              </button>
              <button
                onClick={onGetStarted}
                className="px-5 py-2 text-sm font-semibold bg-gray-900 text-white rounded-full hover:bg-emerald-700 transition-all shadow-sm"
              >
                Sign Up
              </button>
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="lg:hidden p-2 text-gray-600"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[60px] left-0 right-0 z-40 glass-nav border-t border-gray-100 px-6 py-5 lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={onGetStarted}
                  className="text-left text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Login / Sign Up →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-white to-sky-50/40 -z-10" />
        <div className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full bg-emerald-400/8 blur-[120px] -z-10 pointer-events-none" />

        {/* Hero image — right side (large screens) */}
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&q=80"
          alt="Green potato field at golden hour"
          className="pointer-events-none hidden lg:block absolute inset-y-0 right-0 w-[55%] h-full object-cover opacity-[0.25]"
          style={{ objectPosition: 'center center' }}
        />
        {/* Gradient mask over image */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent -z-0 pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-6xl w-full px-6 pt-32 pb-28 lg:py-44">
          <div className="max-w-lg lg:max-w-xl">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100/80 mb-8 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Crop Protection
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] text-gray-900 mb-8">
                Guard every leaf.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-500">
                  Protect every harvest.
                </span>
              </h1>

              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10 max-w-md">
                Potato blight destroys millions of tonnes of food every year — the same disease that caused the Irish Famine of 1845. PotatoShield uses deep learning to identify disease in seconds, giving every farmer the power to act before it's too late.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="ios-button px-8 py-4 text-base flex items-center justify-center group"
                >
                  Get Started Free
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#about"
                  className="ios-secondary-button px-8 py-4 text-base flex items-center justify-center bg-white"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INFINITE STATS TICKER ─────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50/60 py-4 overflow-hidden relative">
        {/* Fade masks on edges */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-gray-50/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-gray-50/90 to-transparent z-10" />

        {/* Duplicated items for seamless loop (CSS marquee) */}
        <div className="flex">
          <div className="marquee-track flex shrink-0 items-center gap-14">
            {[...STATS, ...STATS].map((s, i) => (
              <span key={i} className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT POTATOES ────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-gray-200/80 mb-6 shadow-sm">
              <Globe className="w-3.5 h-3.5" />
              Global Food Security
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Potatoes feed the world.<br />
              <span className="text-gray-400">Disease threatens it all.</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              The potato is the 4th most important food crop on Earth — after wheat, rice, and maize.
              Over <strong className="text-gray-700">1.3 billion people</strong> rely on it daily for sustenance.
              Yet Early Blight and Late Blight still devastate crops worldwide, with the same pathogen
              responsible for the catastrophic Irish Famine of 1845 costing farmers over
              <strong className="text-gray-700"> $5 billion every year</strong>.
            </p>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STAT_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`bento-card bg-gradient-to-br ${card.gradient} border ${card.border} p-10 text-center`}
              >
                <p className={`text-5xl font-bold mb-3 ${card.text}`}>{card.value}</p>
                <p className="text-sm font-semibold text-gray-600 leading-snug">{card.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section id="features" className="py-28 px-6 bg-gray-50/60">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5">
              How PotatoShield helps farmers
            </h2>
            <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
              Precision-grade disease detection that any farmer can use — directly from a smartphone, anywhere in the field.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bento-card bg-white p-8 flex flex-col"
              >
                <div className={`w-14 h-14 ${feat.bg} border ${feat.border} rounded-2xl flex items-center justify-center mb-6 shrink-0`}>
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{feat.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/8 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Ready to protect<br />your harvest?
            </h2>
            <p className="text-gray-400 text-lg font-medium mb-10 max-w-sm mx-auto leading-relaxed">
              Join farmers already using PotatoShield to detect disease early and keep their crops healthy.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-white text-gray-900 font-bold px-8 py-4 rounded-full text-base hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-xl shadow-white/10"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="bg-gradient-to-tr from-emerald-600 to-emerald-400 p-1 rounded-lg">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">PotatoShield</span>
        </div>
        <p className="text-sm text-gray-400 font-medium">
          Precision diagnostics for global food security. Free forever.
        </p>
      </footer>

    </div>
  );
}
