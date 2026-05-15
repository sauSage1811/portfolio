# Portfolio - Nguyen Van An

Personal portfolio website built with React + Vite + Tailwind CSS v4 + Framer Motion.

## 🚀 Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** — animations
- **Lucide React** — UI icons

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## ✏️ Customization

All personal data is in **`src/data/portfolio.js`**:
- Name, email, university, GPA
- Skills list with levels
- Projects (title, description, tags, links)
- Social media links

## 🌐 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Or connect GitHub repo at [vercel.com](https://vercel.com)

### Netlify
```bash
npm run build
# Drag-and-drop the /dist folder at app.netlify.com/drop
```

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── AboutSection.jsx
│   ├── SkillsSection.jsx
│   ├── ProjectsSection.jsx
│   ├── ContactSection.jsx
│   ├── Footer.jsx
│   └── Icons.jsx
├── data/
│   └── portfolio.js       ← Edit this file!
├── utils/
│   └── animations.js
├── App.jsx
└── index.css
```

## 📄 License

MIT
