import koffi from "koffi";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Wallpaper fill modes for Windows.
 */
export enum FillMode {
  Center = "Center",
  Tile = "Tile",
  Stretch = "Stretch",
  Fit = "Fit",
  Fill = "Fill",
  Span = "Span",
}

const FillModeRegistry: Record<FillMode, { style: string; tile: string }> = {
  [FillMode.Center]: { style: "0", tile: "0" },
  [FillMode.Tile]: { style: "0", tile: "1" },
  [FillMode.Stretch]: { style: "2", tile: "0" },
  [FillMode.Fit]: { style: "6", tile: "0" },
  [FillMode.Fill]: { style: "10", tile: "0" },
  [FillMode.Span]: { style: "22", tile: "0" },
};

// Load user32.dll
const user32 = koffi.load("user32.dll");

// Define SystemParametersInfoW
const SystemParametersInfoW = user32.func(
  "int __stdcall SystemParametersInfoW(uint uAction, uint uParam, string16 lpvParam, uint fuWinIni)",
);

const SPI_SETDESKWALLPAPER = 0x0014;
const SPIF_UPDATEINIFILE = 0x01;
const SPIF_SENDWININICHANGE = 0x02;

/**
 * Updates the Windows Registry to set the wallpaper fill mode.
 * @param mode The fill mode to set.
 */
async function setRegistryFillMode(mode: FillMode): Promise<void> {
  const config = FillModeRegistry[mode];
  const desktopKey = '"HKCU\\Control Panel\\Desktop"';

  try {
    await execAsync(
      `reg add ${desktopKey} /v WallpaperStyle /t REG_SZ /d ${config.style} /f`,
    );
    await execAsync(
      `reg add ${desktopKey} /v TileWallpaper /t REG_SZ /d ${config.tile} /f`,
    );
  } catch (error: any) {
    throw new Error(`Failed to update registry: ${error.message}`);
  }
}

/**
 * Changes the Windows desktop wallpaper.
 * @param imagePath Absolute path to the image file.
 * @param options Optional configuration including fill mode.
 * @returns A promise that resolves when the wallpaper is changed.
 */
export async function setWallpaper(
  imagePath: string,
  options: { mode?: FillMode } = {},
): Promise<void> {
  if (!imagePath) {
    throw new Error("Image path is required.");
  }

  const absoluteImagePath = path.resolve(imagePath);

  if (!fs.existsSync(absoluteImagePath)) {
    throw new Error(`Image file not found: ${absoluteImagePath}`);
  }

  // Set fill mode in registry if provided
  if (options.mode) {
    await setRegistryFillMode(options.mode);
  }

  try {
    // Call the Windows API
    const result = SystemParametersInfoW(
      SPI_SETDESKWALLPAPER,
      0,
      absoluteImagePath,
      SPIF_UPDATEINIFILE | SPIF_SENDWININICHANGE,
    );

    if (result === 0) {
      throw new Error("SystemParametersInfoW failed to set wallpaper.");
    }
  } catch (error: any) {
    throw new Error(`Failed to change wallpaper: ${error.message}`);
  }
}
