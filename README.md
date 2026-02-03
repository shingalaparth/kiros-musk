# Kiros Musk | Premium Refreshment 🍾

A luxury web experience for **Kiros Musk**, a premium beverage brand known for its authentic fruit flavors and zero-sugar refreshment. This project is built to deliver a cinematic, high-performance, and fully responsive user experience.

## ✨ Key Features

- **Cinematic Hero Section**: 
  - Custom 3D-like bottle carousel with smooth pixel-based scrolling.
  - Interactive callout animations (desktop & mobile).
  - Ambient lighting and parallax effects.
- **Dynamic Product Showcase**: 
  - Interactive product grid with auto-rotation.
  - Snap-scrolling thumbnail navigation.
  - Category-based filtering and rich hover effects.
- **Immersive Video Sections**: 
  - Lazy-loaded background videos for different beverage lines (Cold Cocoa, Cold Coffee).
  - Smooth transitions between media.
- **Mobile-First Design**: 
  - Fully responsive layout from 320px to 4K.
  - Touch-optimized controls, swipe gestures, and hamburger navigation.
- **Performance Optimized**: 
  - **Code Splitting**: Routes and heavy sections loaded lazily via `React.lazy`.
  - **Asset Optimization**: `loading="lazy"` on images, `preload="metadata"` on videos.
  - **Smooth Animations**: 60fps animations using `framer-motion`.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shingalaparth/KIROS-MUSK.git
    cd kiros-musk
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── assets/         # Images, videos, logos
├── components/     # Reusable UI components (Navbar, Button, etc.)
├── constants/      # App-wide constants (data, brand info)
├── sections/       # Main page sections (Hero, Product, Contact, etc.)
├── utils/          # Helper functions (animations, logic)
├── App.jsx         # Main application layout
└── main.jsx        # Entry point
```

## ⚡ Performance

The site achieves high performance scores through:
- **Lazy Loading**: Sections below the fold are loaded only when needed.
- **Efficient Rendering**: Heavy animations are optimized to run off the main thread where possible.
- **Smart Asset Loading**: Videos are paused when out of viewport, and images use native lazy loading.

## 📱 Mobile Optimizations

- **Navigation**: Custom hamburger menu with backdrop blur.
- **Touch**: Larger tap targets for buttons and thumbnails.
- **Layout**: Adaptive grids (single column on mobile -> multi-column on desktop).
- **Hero**: Reduced complexity and optimized callouts for small screens.

---

© 2026 Kiros Musk LLP. All Rights Reserved.
