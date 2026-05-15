import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, GitFork, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolio';

const tabs = [
  { id: 'all', label: 'Tất cả', icon: <Layers size={14} /> },
  { id: 'web', label: 'Web App', icon: '🌐' },
  { id: 'backend', label: 'Backend / Logic', icon: '⚡' },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-300 group"
    >
      {/* Project header / visual */}
      <div className={`relative h-44 bg-gradient-to-br ${project.gradient} p-6 overflow-hidden`}>
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          animate={hovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <motion.span
              className="text-5xl"
              animate={hovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.icon}
            </motion.span>
            {project.featured && (
              <span className="mt-2 flex items-center gap-1 text-white/80 text-xs font-mono bg-white/15 px-2 py-0.5 rounded-full w-fit">
                ⭐ Featured
              </span>
            )}
          </div>
          <div className="flex gap-3 text-white/70 text-xs">
            <span className="flex items-center gap-1"><Star size={11} />{project.stats.stars}</span>
            <span className="flex items-center gap-1"><GitFork size={11} />{project.stats.forks}</span>
          </div>
        </div>

        {/* Shimmer on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-base mb-1 group-hover:gradient-text transition-all">
          {project.titleVi}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-slate-700/50 hover:border-indigo-500/40 text-slate-300 hover:text-white text-xs font-medium transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <GithubIcon size={14} />
            GitHub Code
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-medium transition-all"
            style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? projects
    : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-indigo-400 font-mono text-sm mb-3 block">// my.projects</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Dự án <span className="gradient-text">cá nhân</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 mb-6" />
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Tổng hợp các dự án tiêu biểu được xây dựng với đam mê và sự tỉ mỉ trong từng dòng code.
          </p>
        </motion.div>

        {/* Tab system */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center mb-10"
        >
          <div className="flex glass rounded-2xl p-1.5 border border-slate-700/50 gap-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(6,182,212,0.2))' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {typeof tab.icon === 'string' ? tab.icon : tab.icon}
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <span className="relative z-10 ml-1 text-xs bg-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded-md font-mono">
                    {filtered.length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`https://github.com/sauSage1811`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 glass rounded-2xl border border-indigo-500/30 text-slate-300 hover:text-white text-sm font-medium transition-all"
            whileHover={{ scale: 1.05, borderColor: 'rgba(99,102,241,0.6)' }}
          >
            <GithubIcon size={16} />
            Xem thêm trên GitHub
            <ExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
