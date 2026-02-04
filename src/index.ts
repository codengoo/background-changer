import { execFile } from "child_process";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

/**
 * Changes the Windows desktop wallpaper.
 * @param imagePath Absolute path to the image file.
 * @returns A promise that resolves when the wallpaper is changed.
 */
export async function setWallpaper(imagePath: string): Promise<void> {
  if (!imagePath) {
    throw new Error("Image path is required.");
  }

  const absoluteImagePath = path.resolve(imagePath);

  if (!fs.existsSync(absoluteImagePath)) {
    throw new Error(`Image file not found: ${absoluteImagePath}`);
  }

  // Resolve the path to the bundled executable
  // In development (ts-node), it's in bin/
  // In production (npm package), it will also be in bin/ relative to the package root
  let exePath = path.join(__dirname, "..", "bin", "WallpaperChanger.exe");

  // If we are in 'dist', __dirname is 'dist', so '..' goes back to root
  // If we are running via ts-node from 'src', __dirname is 'src', so '..' goes back to root

  if (!fs.existsSync(exePath)) {
    // Fallback for different structures if necessary
    exePath = path.resolve(process.cwd(), "bin", "WallpaperChanger.exe");
  }

  if (!fs.existsSync(exePath)) {
    throw new Error(`WallpaperChanger.exe not found at ${exePath}`);
  }

  try {
    const { stdout, stderr } = await execFileAsync(exePath, [
      absoluteImagePath,
    ]);

    if (stderr) {
      console.warn(`WallpaperChanger stderr: ${stderr}`);
    }

    // The C# app returns 0 on success. execFileAsync will throw if it returns non-zero.
  } catch (error: any) {
    throw new Error(`Failed to change wallpaper: ${error.message}`);
  }
}
