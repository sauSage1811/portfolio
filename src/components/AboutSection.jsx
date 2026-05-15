import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Mail, Briefcase, Award, Calendar, Star } from 'lucide-react';
import { personalInfo, experiences } from '../data/portfolio';

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const end = parseFloat(value);
    const duration = 2000;
    const step = 16;
    const increment = end / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCount(current);
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(2)}{suffix}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle bg accent */}
      <div className="absolute right-0 top-1/2 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm mb-3 block">// about.me</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Về <span className="gradient-text">bản thân</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Profile card */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-1 glass rounded-2xl p-6 border border-indigo-500/15 gradient-border"
          >
            {/* Avatar */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <img
                src="/src/assets/avatar.jpg"
                alt={personalInfo.name}
                className="w-24 h-24 rounded-2xl object-cover shadow-2xl shadow-indigo-500/30 ring-2 ring-indigo-500/40"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#0f172a]" />
            </div>

            <h3 className="text-xl font-bold text-white text-center mb-1">{personalInfo.name}</h3>
            <p className="text-indigo-400 text-sm text-center font-mono mb-6">{personalInfo.title}</p>

            <div className="space-y-3 text-sm">
              {[
                { icon: <MapPin size={14} />, text: personalInfo.location },
                { icon: <Mail size={14} />, text: personalInfo.email },
                { icon: <Briefcase size={14} />, text: personalInfo.availability },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-400">
                  <span className="text-indigo-400 flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: 'Dự án', value: '5+' },
                { label: 'Năm học', value: '4th' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0f172a]/60 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main info */}
          <motion.div variants={cardVariants} className="lg:col-span-2 space-y-4">
            {/* Bio */}
            <div className="glass rounded-2xl p-6 border border-indigo-500/15">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Giới thiệu
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Xin chào! Mình là <span className="text-indigo-300 font-medium">{personalInfo.name}</span>, sinh viên năm 4 ngành Công nghệ Thông tin tại{' '}
                <span className="text-cyan-400 font-medium">{personalInfo.universityShort}</span>. Mình có niềm đam mê mãnh liệt với việc xây dựng các ứng dụng web hiện đại, từ thiết kế giao diện đẹp mắt đến kiến trúc backend mạnh mẽ.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base mt-3">
                Ngoài việc học, mình luôn tìm kiếm cơ hội để áp dụng kiến thức vào các dự án thực tế, đóng góp cho cộng đồng open-source và không ngừng cập nhật công nghệ mới nhất trong ngành.
              </p>
            </div>

            {/* Education + GPA Badge */}
            <div className="glass rounded-2xl p-6 border border-indigo-500/15 gradient-border">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-indigo-400" />
                Học vấn
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold">{personalInfo.university}</p>
                  <p className="text-slate-400 text-sm mt-1">{personalInfo.major} · {personalInfo.graduationYear}</p>
                </div>
                {/* GPA Badge */}
                <div className="flex-shrink-0 relative">
                  <motion.div
                    className="px-5 py-3 rounded-2xl text-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))',
                      border: '1px solid rgba(99,102,241,0.4)',
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-black gradient-text">
                      <AnimatedNumber value={personalInfo.gpa} />
                    </div>
                    <div className="text-slate-400 text-xs mt-1 font-mono">GPA / {personalInfo.gpaMax}</div>
                  </motion.div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star size={12} className="text-yellow-900" fill="currentColor" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-6 border border-indigo-500/15">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award size={18} className="text-violet-400" />
                Thành tựu & Hoạt động
              </h3>
              <div className="space-y-3">
                {experiences.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        exp.type === 'work'
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'bg-violet-500/20 text-violet-400'
                      }`}>
                        {exp.type === 'work' ? <Briefcase size={14} /> : <GraduationCap size={14} />}
                      </div>
                      {i < experiences.length - 1 && (
                        <div className="w-px flex-1 bg-slate-700/50 mt-2" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm">{exp.role}</span>
                        <span className="text-indigo-400 text-xs">@ {exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-xs mb-2">
                        <Calendar size={11} />
                        {exp.period}
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
