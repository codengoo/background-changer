import { setWallpaper, FillMode } from "../src/index";

async function runTest() {
  console.log("Testing wallpaper changer with koffi...");

  const argPath = process.argv[2];
  const modeArg = process.argv[3] as FillMode;

  if (argPath) {
    const mode =
      modeArg && Object.values(FillMode).includes(modeArg)
        ? modeArg
        : FillMode.Fill;
    console.log(
      `\nAttempting to set wallpaper to: ${argPath} with mode: ${mode}`,
    );
    try {
      await setWallpaper(argPath, { mode });
      console.log("Success!");
    } catch (err: any) {
      console.error(`Failed: ${err.message}`);
    }
  } else {
    console.log("\nTo test with a real image, run:");
    console.log(
      "npx ts-node tests/test.ts path/to/your/image.jpg [Fill|Fit|Stretch|Tile|Center|Span]",
    );
  }
}

runTest();
