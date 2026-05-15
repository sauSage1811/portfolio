import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from './Icons';
import { personalInfo } from '../data/portfolio';

const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    url: personalInfo.social.github,
    icon: <GithubIcon size={20} />,
    color: '#f0f6fc',
    bg: 'from-slate-700 to-slate-600',
    username: '@sauSage1811',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: personalInfo.social.linkedin,
    icon: <LinkedinIcon size={20} />,
    color: '#0A66C2',
    bg: 'from-blue-700 to-blue-600',
    username: 'in/sausage',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: personalInfo.social.facebook,
    icon: <FacebookIcon size={20} />,
    color: '#1877F2',
    bg: 'from-blue-600 to-blue-500',
    username: '/Ntds.Hn206',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: personalInfo.social.instagram,
    icon: <InstagramIcon size={20} />,
    color: '#E1306C',
    bg: 'from-pink-600 to-orange-500',
    username: '@dsausage_',
  },
];

function SocialCard({ social }) {
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass rounded-2xl p-4 border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-300 flex items-center gap-4"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${social.bg} flex items-center justify-center text-white flex-shrink-0 group-hover:shadow-lg transition-all`}
      >
        {social.icon}
      </div>
      <div>
        <p className="text-white font-medium text-sm">{social.label}</p>
        <p className="text-slate-500 text-xs font-mono">{social.username}</p>
      </div>
      <motion.div
        className="ml-auto text-slate-600 group-hover:text-indigo-400 transition-colors"
        whileHover={{ x: 3 }}
      >
        →
      </motion.div>
    </motion.a>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const subject = encodeURIComponent(form.subject.trim());
    const body = encodeURIComponent(
      `Họ và tên: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    await new Promise((r) => setTimeout(r, 500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm mb-3 block">// contact.me</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Hãy <span className="gradient-text">kết nối</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 mb-6" />
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Mình luôn mở cửa cho các cơ hội hợp tác, trao đổi kiến thức, hoặc chỉ đơn giản là một cuộc trò chuyện thú vị về công nghệ!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact info + Social */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact info */}
            <div className="glass rounded-2xl p-6 border border-indigo-500/15">
              <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Thông tin liên hệ
              </h3>
              <div className="space-y-4">
                {[
                  { icon: <Mail size={16} />, label: 'Email', value: personalInfo.email },
                  { icon: <MapPin size={16} />, label: 'Địa điểm', value: personalInfo.location },
                  { icon: <Phone size={16} />, label: 'Trạng thái', value: personalInfo.availability },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">{item.label}</p>
                      <p className="text-slate-300 text-sm mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <p className="text-slate-500 text-xs font-mono px-1">// social links</p>
              {socialLinks.map((s) => (
                <SocialCard key={s.id} social={s} />
              ))}
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 md:p-8 border border-indigo-500/15">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <Send size={16} className="text-indigo-400" />
                Gửi tin nhắn
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: 'name', label: 'Họ và tên', placeholder: 'Nguyen Van B', type: 'text' },
                    { name: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="text-slate-400 text-xs mb-1.5 block font-mono">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-[#0f172a]/60 border border-slate-700/50 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block font-mono">Chủ đề</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Cơ hội thực tập / Hợp tác dự án / ..."
                    required
                    className="w-full bg-[#0f172a]/60 border border-slate-700/50 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs mb-1.5 block font-mono">Nội dung</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Xin chào! Mình muốn trao đổi về..."
                    required
                    className="w-full bg-[#0f172a]/60 border border-slate-700/50 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                  />
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3"
                  >
                    <CheckCircle size={16} />
                    Tin nhắn đã được gửi! Mình sẽ phản hồi sớm nhất có thể. 🎉
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                  >
                    <AlertCircle size={16} />
                    Có lỗi xảy ra. Vui lòng thử lại hoặc email trực tiếp.
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
                  whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 10px 30px rgba(99,102,241,0.4)' } : {}}
                  whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Gửi tin nhắn
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
