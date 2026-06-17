# 🛒 MotionCart — Interactive E-Commerce UI Showcase

> A high-performance e-commerce UI playground built with **React 19**, **TypeScript**, **GSAP**, and **Supabase** — featuring 16 animation variants, A/B testing, cart/checkout flows, and live portfolio previews.

---

## 🚀 Live Demo

> Coming soon — deploy to Vercel or Netlify using the steps below.

---

## ✨ Features

### 🎬 16 GSAP Animation Variants
- Full slideshow engine powered by GSAP with race-condition prevention
- Smooth transitions with `isAnimating` lock via Zustand global state
- Fixes for black-screen bugs, z-index layering, and React lifecycle conflicts

### 🧪 A/B Testing System
- Session-based variant assignment (50/50 split)
- 150+ categorized marketing taglines across 4 portfolio design variations
- Supports independent test groups stored in `sessionStorage`

### 🖼️ Custom Image Upload (Alt + I)
- Replace all 16 product images client-side without any backend
- Persisted via `localStorage` using Zustand persist middleware
- FileReader API + validation (format, size, count)

### 🛍️ Cart & Checkout Flow
- Animated cart slider with real-time item management
- Full checkout slider with order summary
- 5 add-to-cart animation variants

### 💼 Portfolio Preview System
- Local proxy server (port 3010) loads external portfolio sites inside laptop frames
- Injects resume data into live portfolio sites via DOM manipulation
- Supports multiple portfolio design variations (Variation 1–5)

### 🎨 UI Customization Engine
- 30+ live-swappable UI variants (typography, layout, color selectors, footer styles)
- Weighted random config on load to simulate real A/B traffic

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Animation** | GSAP 3.13 + Framer Motion 12 |
| **State Management** | Zustand 5 |
| **Backend / DB** | Supabase (Auth + Storage) |
| **Styling** | Tailwind CSS 3 |
| **Routing** | React Router DOM 7 |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Clone the repo
```bash
git clone https://github.com/DINESH-PULAPA/MotionCart.git
cd MotionCart
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```
> Get these from your [Supabase project settings](https://supabase.com/dashboard).

### 4. Run the development server
```bash
npm run dev
```
App runs at → **http://localhost:5173**

### 5. Run the Portfolio Proxy Server *(for laptop preview feature)*
Open a **second terminal** and run:
```bash
node debug_proxy_poc.cjs
```
Proxy runs at → **http://localhost:3010**

> This proxy is required to display live portfolio websites inside the laptop preview frames on the Portfolio page.

---

## 📁 Project Structure

```
MotionCart/
├── src/
│   ├── components/          # Shared UI components (AnimatedPage, Tooltip)
│   ├── features/
│   │   ├── cart/            # Cart slider & add-to-cart animations
│   │   ├── checkout/        # Checkout slider flow
│   │   ├── customizer/      # Image upload modal (Alt+I)
│   │   ├── gallery/         # Supabase image gallery
│   │   ├── imageHover/      # Hover animation system
│   │   ├── portfolio/       # Portfolio variations (1–5) + A/B testing
│   │   ├── slideshow/       # 16 GSAP animation variants
│   │   └── upload/          # Image upload utilities
│   ├── pages/               # Route-level pages
│   ├── store/               # Zustand stores (slideshow, cart, image upload)
│   ├── utils/               # A/B testing, weighted randomizer, image replacer
│   └── data/                # Marketing taglines, product data
├── functions/               # Supabase edge functions
├── debug_proxy_poc.cjs      # Portfolio proxy server (port 3010)
└── .env.example             # Environment variable template
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Alt + I` | Open image upload modal |
| `Alt + Q` | Toggle customizer panel |
| `Escape` | Close any open modal |

---

## 📄 Pages & Routes

| Route | Description |
|---|---|
| `/` | Main e-commerce slideshow with 16 animation variants |
| `/portfolio` | Portfolio design showcase with laptop previews |
| `/gallery` | Supabase-powered user image gallery |
| `/image-testing` | Image upload testing page |

---

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## 🌟 Resume Highlights

- Engineered **16 GSAP-powered slideshow animation variants** with race-condition prevention using animation locks in Zustand global state
- Implemented **session-based A/B testing system** from scratch with 150+ categorized marketing taglines across 4 portfolio design variations
- Built **client-side image replacement pipeline** using FileReader API and localStorage persistence — no backend required
- Integrated **Supabase backend** for user image gallery with full CRUD operations
- Architected **weighted random UI configuration** system simulating real-world A/B traffic distribution across 30+ component variants

---

## 📝 License

MIT License — feel free to use this project for learning and portfolio purposes.

---

## 🙋‍♂️ Author

**Dinesh Pulapa**
- GitHub: [@DINESH-PULAPA](https://github.com/DINESH-PULAPA)
