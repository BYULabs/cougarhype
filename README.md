# 🏈 CougarStats | 2026 BYU Football Fan Central

> **Modern 2026 BYU football fan hub & analytics site built with Vite, vanilla JS, and modular CSS.**

CougarStats is a high-performance, mobile-responsive web application designed for BYU football fans. It features game countdowns, live standings, interactive fan polls, player spotlights, and a dark mode toggle—all built with component-driven architecture in Vite.

---

## ✨ Features

- **⚡ Instant Build & HMR:** Powered by **Vite** for near-instant development reloads.
- **📱 Mobile-First Responsive Design:** Clean mobile header with slide-out drawer menu and horizontal touch swiper for player spotlights.
- **🌙 Night / Day Mode:** Custom BYU color-system themes that persist across dark and light modes.
- **⏱️ Live Matchup Countdown:** Dynamic JavaScript timer counting down to Game Week 1 kickoff against Utah Tech.
- **📊 Interactive Fan Poll:** Real-time percentage visualization for fan season projections.
- **🧩 Component-Level CSS Architecture:** Zero monolithic stylesheets—each JS module owns its template, interactivity, and CSS file.

---

## 📁 Project Architecture

```
cougar-stats/
├── index.html                  # App shell & Google Fonts imports
├── src/
│   ├── style.css               # Global design tokens & BYU color variables
│   ├── main.js                 # App entry point
│   ├── views/
│   │   ├── HomeView.js         # Assembles all homepage modules
│   │   └── HomeView.css        # Page container layout rules
│   └── components/
│       ├── Header/             # Brand logo, nav drawer, & marquee ticker
│       ├── CountdownHero/      # Matchup card & live countdown timer
│       ├── SeasonPulse/        # Big 12 standings & Pop-Tarts Bowl result
│       ├── PlayerSpotlights/   # Touch-friendly player cards swiper
│       ├── FanPoll/            # Dynamic voting widget & percentage fills
│       └── Footer/             # Social links & legal attribution
```

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have **Node.js (v18 or higher)** installed on your system.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BYULabs/cougarstats.git
cd cougarstats
```

2. Install dependencies:
```bash
npm install
```

3. Start the local development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`.

5. Build for production:
```bash
npm run build
```

> The production-ready assets will be compiled into the `dist/` directory.

---

## 🎨 Tech Stack

- **Build Tool:** Vite
- **Language:** JavaScript (ES6+ Native Modules)
- **Styling:** CSS3 (Custom Properties & Modular Component CSS)
- **Typography:** Oswald, Inter, & Roboto Condensed (via Google Fonts)

---

## 📝 License & Attribution

Built for WDD 330. Data compiled from public sports information collections. This is an open-source fan-made project and is not officially affiliated with BYU Athletics.