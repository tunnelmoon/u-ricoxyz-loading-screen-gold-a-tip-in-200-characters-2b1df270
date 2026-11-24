import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Loading tip: The agent finished your code in 4 seconds. It is now waiting on you to decide what you actually wanted.";

const MAX_CHARS = 200;

function main(): void {
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line with no newline characters");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== LINE) {
    throw new Error("round-trip check failed: written entry differs from the line");
  }
  console.log(`wrote ${outPath} (${LINE.length} characters)`);
}

main();
