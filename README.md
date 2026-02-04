# Windows Background Changer (Core)

A modern, fast, and lightweight Node.js library to change the Windows desktop wallpaper using direct FFI with `koffi`. Supports various fill modes.

## Features

- **Direct FFI**: Calls Windows `SystemParametersInfoW` directly via `koffi`.
- **Fill Modes**: Supports `Fill`, `Fit`, `Stretch`, `Tile`, `Center`, and `Span`.
- **Typings Included**: Clean TypeScript definitions generated via `tsup`.
- **ESM & CJS Support**: Dual-format build for modern and legacy projects.

## Installation

```bash
npm install windows-background-changer
```

## Usage

```typescript
import { setWallpaper, FillMode } from "windows-background-changer";

async function main() {
  try {
    // Basic usage
    await setWallpaper("C:\\path\\to\\image.jpg");

    // With specific fill mode
    await setWallpaper("C:\\path\\to\\image.jpg", { mode: FillMode.Fit });

    console.log("Wallpaper changed successfully!");
  } catch (error) {
    console.error("Failed to change wallpaper:", error);
  }
}

main();
```

### Supported Fill Modes

- `FillMode.Fill`: Fills the screen, may crop.
- `FillMode.Fit`: Fits the image inside the screen, avoids cropping.
- `FillMode.Stretch`: Stretches image to fill screen.
- `FillMode.Center`: Centers image on screen.
- `FillMode.Tile`: Tiles image across screen.
- `FillMode.Span`: Spans image across multiple monitors.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (Compatible with v18+)
- [Windows OS](https://www.microsoft.com/windows) (Native API required)

### Build

```bash
npm run build
```

### Test

```bash
# Basic test (checks if file exists)
npm test

# Real test (changes actual wallpaper)
npm test -- path/to/your/image.jpg [Fill|Fit|Stretch|Tile|Center|Span]
```

## License

ISC
