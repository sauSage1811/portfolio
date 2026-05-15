import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

const categoryConfig = {
  frontend: { label: 'Frontend', color: '#61DAFB', accent: 'indigo' },
  backend: { label: 'Backend', color: '#339933', accent: 'green' },
  database: { label: 'Database', color: '#4169E1', accent: 'blue' },
  tools: { label: 'Tools & DevOps', color: '#F05032', accent: 'orange' },
};

function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-mono text-slate-500">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.05, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group glass rounded-2xl p-4 border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-300 cursor-default text-center"
    >
      <div className="text-3xl mb-2">{skill.icon}</div>
      <p className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">{skill.name}</p>
      <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.06 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const categories = Object.keys(categoryConfig);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm mb-3 block">// my.skills</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Công nghệ & <span className="gradient-text">Kỹ năng</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
        </motion.div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => {
            const catSkills = skills.filter((s) => s.category === cat);
            const config = categoryConfig[cat];

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.6 }}
                className="glass rounded-2xl p-6 border border-slate-700/50 hover:border-indigo-500/20 transition-all duration-300"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: `${config.color}22`, color: config.color }}
                  >
                    {ci + 1}
                  </div>
                  <h3 className="text-white font-bold">{config.label}</h3>
                  <span className="ml-auto text-xs text-slate-500 font-mono">{catSkills.length} skills</span>
                </div>

                {/* Skill list */}
                <div className="space-y-4">
                  {catSkills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All skills icon grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 glass rounded-2xl p-6 border border-indigo-500/15"
        >
          <h3 className="text-center text-slate-400 text-sm font-mono mb-6">// tech stack overview</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
