# Windows Background Changer

A lightweight Node.js library to change the Windows desktop wallpaper using a bundled native C# executable.

## Features

- Simple TypeScript API.
- No heavy dependencies.
- Bundled native C# implementation for reliable interaction with the Windows API (`SystemParametersInfo`).

## Installation

```bash
npm install windows-background-changer
```

## Usage

```typescript
import { setWallpaper } from "windows-background-changer";

async function main() {
  try {
    await setWallpaper("C:\\path\\to\\your\\image.jpg");
    console.log("Wallpaper changed successfully!");
  } catch (error) {
    console.error("Failed to change wallpaper:", error);
  }
}

main();
```

## Built-in Executable

This library includes a pre-built C# executable (`WallpaperChanger.exe`) that performs the actual system call.
The source code for this executable is located in the `native/` directory.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [.NET SDK](https://dotnet.microsoft.com/download) (to build the native component)

### Build

To build both the C# executable and the TypeScript code:

```bash
npm run build
```

### Test

To test the library with a local image:

```bash
npm test -- path/to/your/image.jpg
```

## License

ISC
