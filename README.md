# GTA V Interactive Map 🗺️

A simple interactive GTA V map built with React, TypeScript, MapLibre GL, and Mapcn.

Features include custom GTA V map tiles, zoom controls, coordinate display, clickable locations, markers, tooltips, and popups.

> **Made with AI 🤖**
>
> This project was put together very quickly with the help of AI. The code might not be perfect, but I'm sharing it for anyone who finds it useful.
>
> **Free to use — enjoy! :)**

## ✨ Features

- 🗺️ Custom GTA V map tiles
- 📍 Location markers with tooltips and popups
- 🎯 GTA world coordinate conversion
- 🔍 Interactive zoom controls
- 🖱️ Hover to view coordinates
- 📋 Copy selected coordinates
- 🎨 Clean UI using shadcn/ui and Tailwind CSS
- ⚛️ React and TypeScript

## 🛠️ Built With

| Technology | Description |
|---|---|
| [errDev-t/create](https://github.com/errDev-t/create) | Project boilerplate |
| [React](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Mapcn](https://mapcn.dev/) | Map components for React |
| [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) | Map rendering engine |
| [shadcn/ui](https://ui.shadcn.com/) | UI components |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Vite](https://vite.dev/) | Development and build tooling |
| [GTA V Map Tiles](https://github.com/VIRUXE/gtav-map-tiles) | GTA V map tile source |

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/npxkiwi/fivem-mapcn.git
cd fivem-mapcn
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## 🗺️ Map Tiles

The map uses custom GTA V raster tiles rather than a standard geographical basemap.

The tile configuration is located in the GTA map component. Make sure the tile files are available at the configured paths and that their filename structure matches the MapLibre tile URL.

GTA world coordinates are converted into map coordinates for displaying markers. Depending on the tile source and its coordinate bounds, you may need to adjust the conversion.

## 🤖 AI Disclaimer

AI was used to help create and assemble this project in a short amount of time. Some parts may need adjustments, testing, or optimization.

Feel free to learn from it, modify it, and build on top of it.

## 📜 Usage

**Free to use, modify, and learn from! :)**

Please respect the licenses and terms of the individual libraries and map tile assets used in this project. The permissions for this project do not override third-party licenses.

## ❤️ Credits

- [errDev-t](https://github.com/errDev-t) — project boilerplate
- [Mapcn](https://mapcn.dev/) — React map components
- [MapLibre](https://maplibre.org/) — map rendering
- [VIRUXE](https://github.com/VIRUXE/gtav-map-tiles) — GTA V map tiles

Made with ❤️ and a little help from AI.
