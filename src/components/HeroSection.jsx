import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Terminal, Code2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolio';

const TITLES = [
  'Fullstack Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Open Source Contributor',
];

function TypewriterText() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TITLES[idx];
    let timer;
    if (!deleting && displayed.length < target.length) {
      timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setIdx((i) => (i + 1) % TITLES.length);
      }, 40);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx]);

  return (
    <span className="text-cyan-400 font-mono">
      {displayed}
      <span className="cursor text-indigo-400">|</span>
    </span>
  );
}

// Floating code snippets
const floatingSnippets = [
  { code: 'const future = build();', x: '5%', y: '20%', delay: 0 },
  { code: 'git push origin main', x: '80%', y: '15%', delay: 0.5 },
  { code: 'npm run dev ✓', x: '75%', y: '70%', delay: 1 },
  { code: '<Portfolio />', x: '3%', y: '75%', delay: 1.5 },
  { code: 'await success()', x: '60%', y: '40%', delay: 0.3 },
];

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating code snippets */}
      {floatingSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block text-xs font-mono px-3 py-1.5 rounded-lg glass text-indigo-300/50 border border-indigo-500/10 select-none"
          style={{ left: snippet.x, top: snippet.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.7, 0.7, 0], y: [20, 0, 0, -20] }}
          transition={{
            duration: 5,
            delay: snippet.delay + 1,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          {snippet.code}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full border border-indigo-500/30 text-sm"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={14} className="text-yellow-400" />
          </motion.span>
          <span className="text-slate-300">Sẵn sàng cho cơ hội mới</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black mb-4 leading-tight"
        >
          <span className="text-white">{personalInfo.tagline.split(' ').slice(0, 3).join(' ')}</span>
          <br />
          <span className="gradient-text">{personalInfo.tagline.split(' ').slice(3).join(' ')}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center justify-center gap-3 text-xl md:text-2xl mb-6 font-medium"
        >
          <Code2 size={22} className="text-indigo-400" />
          <TypewriterText />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {personalInfo.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <motion.button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Terminal size={18} />
              Khám phá dự án
            </span>
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          <motion.button
            onClick={scrollToContact}
            className="px-8 py-4 rounded-2xl font-semibold text-white glass border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Liên hệ ngay ✉️
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { href: personalInfo.social.github, icon: <GithubIcon size={20} />, label: 'GitHub' },
            { href: personalInfo.social.linkedin, icon: <LinkedinIcon size={20} />, label: 'LinkedIn' },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-slate-400 hover:text-white border border-slate-700/50 hover:border-indigo-500/40 transition-all text-sm"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {s.icon}
              <span>{s.label}</span>
              <ExternalLink size={12} className="opacity-50" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="font-mono">scroll down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
