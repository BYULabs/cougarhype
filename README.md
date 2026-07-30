# CougarHype 🐾🏈

> **Live Application:** [cougarhype.onrender.com](https://cougarhype.onrender.com/)

**CougarHype** is a full-stack Express.js web application built to bring high-energy sports data, game analytics, and team insights together in one seamless portal. By leveraging third-party sports APIs (College Football Data API and TheSportsDB API), CougarHype provides dynamic views, schedules, and stats rendered server-side via EJS.

---

## 🚀 Features

- **Real-Time Sports Data:** Integration with **College Football Data (CFBD)** and **TheSportsDB** APIs for live-updated stats and scores.
- **Server-Side Rendering:** Clean component-based rendering powered by **EJS** templates and modular partials.
- **Modular Architecture:** Clean separation of concerns adhering to the MVC pattern (Controllers, Services, Views, Routes).
- **Custom Error Handling:** Dedicated error handling middleware and polished 404/500 view pages.
- **Production Ready:** Optimized and configured for seamless continuous deployment on **Render**.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend / Templating:** EJS (Embedded JavaScript), Vanilla JavaScript, CSS3
- **Services & APIs:** 
  - [College Football Data API (CFBD)](https://collegefootballdata.com/)
  - [TheSportsDB API](https://www.thesportsdb.com/)
- **Hosting / PaaS:** [Render](https://render.com)

---

## 📂 Project Structure

```text
cougarhype/
├── public/                 # Static assets directory
│   ├── css/
│   │   └── main.css        # Application styling
│   └── js/
│       └── main.js         # Client-side JavaScript
├── src/                    # Backend source directory
│   ├── controllers/        # Request handlers & logic
│   │   ├── errors.js       # Error rendering controllers
│   │   └── index.js        # Main route controllers
│   ├── services/           # Third-party API integrations
│   │   ├── cfbdService.js  # College Football Data API service
│   │   └── sportsDbService.js # TheSportsDB API service
│   ├── views/              # EJS template views
│   │   ├── errors/         # 404 & 500 error view pages
│   │   │   ├── 404.ejs
│   │   │   └── 500.ejs
│   │   ├── partials/       # Reusable UI partials (header, footer, etc.)
│   │   │   ├── footer.ejs
│   │   │   └── header.ejs
│   │   └── index.ejs       # Main homepage view
│   └── routes.js           # Route definitions & mapping
├── .gitignore              # Files to ignore in Git repository
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── README.md               # Project documentation
└── server.js               # Application entry point
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/BYULabs/cougarhype.git
   cd cougarhype
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables Configuration:**
   Create a `.env` file in the root of the project (or set variables in your server environment):
   ```env
   PORT=3000
   CFBD_API_KEY=your_college_football_data_api_key
   ```

4. **Run the Application:**
   - **Development Mode** (with auto-reload if nodemon is installed):
     ```bash
     npm run dev
     ```
   - **Production Mode:**
     ```bash
     npm start
     ```

5. **Access in Browser:**
   Open your browser and navigate to `http://localhost:3000`.

---

## ☁️ Deployment on Render

This application is deployed as a Web Service on **Render**.

### Environment Setup on Render:
1. Connect your repository to Render.
2. Set the build and start commands:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
3. Add any required environment keys (such as `CFBD_API_KEY`) under **Environment Variables**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.