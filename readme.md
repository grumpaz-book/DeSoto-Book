# DeSoto Console Interface

An interactive, retro-styled fleet control console built with modular HTML, CSS, and JavaScript. This interface simulates a shipboard command terminal—complete with button-based input, prompt feedback, and future state toggling capabilities.

## 🚀 Current Features

- Structured menu interface with selectable options
- Clean grid layout optimized for both keyboard and touch
- Version-controlled baseline interface (v0.1) locked on `main`
- Ready for expansion with JavaScript-based handlers

## 🎯 Roadmap

- Add interactive button logic with modular event handlers
- Expand panel-based UI responses for each menu option
- Deploy live preview via GitHub Pages
- Integrate state persistence or mock backend endpoints (optional)

## 🧰 Project Structure
DeSoto-Book/
├── index.html                  # Main interface entry point
├── README.md                   # Project documentation
├── changes.md                  # Log of notable project changes
├── .nojekyll                   # Prevents GitHub Pages from using Jekyll
├── styles/
│   └── style.css               # Primary stylesheet
├── scripts/
│   └── boot-loader.js          # Startup logic or JS payload
├── data/
│   └── boot-sequence.json      # Startup configuration or command set
├── fonts/
│   └── Sono-VariableFont_MONO,wght.ttf  # Terminal-style typeface
└── pages/
    ├── logs.html               # Access logs or console history
    ├── press-release.html      # In-universe comms or narrative drops
    └── tech-docs.html          # System overview or engineering notes



## 🗂️ Branch Strategy

- `main`: Locked-down baseline build
- `feature/button-interactions`: WIP branch for event scaffolding and menu logic

## 🌐 Live Preview

[https://grumpaz-book.github.io/DeSoto-Book/](https://grumpaz-book.github.io/DeSoto-Book/)

---

> Built for immersive storytelling, prototyping, and a touch of console nostalgia.
