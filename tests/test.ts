import { setWallpaper } from "../src/index";
import path from "path";

async function runTest() {
  console.log("Testing wallpaper changer...");

  // For manual testing, you need an actual image.
  // We'll try to find a system image or ask the user to provide one.
  // As a default, we'll just check if the logic fails gracefully if file is missing,
  // or use a placeholder if we had one.

  const dummyPath = path.resolve("non_existent_image.jpg");

  try {
    await setWallpaper(dummyPath);
  } catch (err: any) {
    console.log(`Expected error caught: ${err.message}`);
  }

  console.log("\nTo test with a real image, run:");
  console.log("npx ts-node tests/test.ts path/to/your/image.jpg");

  const argPath = process.argv[2];
  if (argPath) {
    console.log(`\nAttempting to set wallpaper to: ${argPath}`);
    try {
      await setWallpaper(argPath);
      console.log("Success!");
    } catch (err: any) {
      console.error(`Failed: ${err.message}`);
    }
  }
}

runTest();
