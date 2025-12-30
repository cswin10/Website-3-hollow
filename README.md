# Hollow

A cinematic 3D product showcase built with React and Three.js. Features dramatic lighting, smooth rotation controls, and interactive feature hotspots.

## Features

- Interactive 3D model with smooth orbit controls
- Auto-rotation with pause on interaction
- Clickable feature hotspots with elegant callout panels
- Cinematic lighting setup (key, fill, rim, ambient)
- Responsive design for mobile and desktop
- Loading progress indicator

## Tech Stack

- React + Vite
- Three.js via React Three Fiber
- React Three Drei for helpers

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
  App.jsx              # Main application
  components/
    Scene.jsx          # 3D canvas and lighting
    Model.jsx          # GLB model loader
    Hotspots.jsx       # Interactive 3D hotspots
    FeaturePanel.jsx   # Feature callout UI
    ProductHeader.jsx  # Product title overlay
    InteractionHint.jsx # Usage hint
    Loader.jsx         # Loading progress
  hooks/
    useAutoRotate.js   # Auto-rotation control
  data/
    hotspots.js        # Hotspot configuration
  styles/
    global.css         # All styling
public/
  model.glb            # 3D model file
```
