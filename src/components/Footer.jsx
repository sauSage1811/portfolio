import { motion } from 'framer-motion';
import { Heart, Code2, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from './Icons';
import { personalInfo } from '../data/portfolio';

const socials = [
  { icon: <GithubIcon size={18} />, href: personalInfo.social.github, label: 'GitHub' },
  { icon: <LinkedinIcon size={18} />, href: personalInfo.social.linkedin, label: 'LinkedIn' },
  { icon: <FacebookIcon size={18} />, href: personalInfo.social.facebook, label: 'Facebook' },
  { icon: <InstagramIcon size={18} />, href: personalInfo.social.instagram, label: 'Instagram' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-slate-800/60">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-bold font-mono gradient-text">{'<DS />'}</span>
            <p className="text-slate-500 text-xs text-center md:text-left">
              {personalInfo.name} · {personalInfo.universityShort}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 glass rounded-xl border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 text-xs font-mono transition-colors"
            whileHover={{ y: -2 }}
          >
            <ArrowUp size={14} />
            Lên đầu trang
          </motion.button>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            Made with <Heart size={12} className="text-red-500" fill="currentColor" /> and{' '}
            <Code2 size={12} className="text-indigo-400" /> by {personalInfo.name}
          </p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
