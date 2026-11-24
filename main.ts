#!/usr/bin/env node
/**
 * make.fun entry: "How Many Tabs Do You Have Open?"
 *
 * The judge sees only the bytes in /output/entry.txt: one number, digits only.
 * Four is a small, tidy count that reads as a real, lived-in answer (a few
 * things kept open on purpose) while sitting far below the crowded high counts
 * and below the already-flooded zero/one/two/three answers. Byte-identical
 * entries share one rate and only the earliest receipt can place, so a
 * distinctive low number is worth more than the most extreme one.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_TEXT = "4";
const OUTPUT_PATH = "/output/entry.txt";

/** Mirror of the sealed gate: 1..5 bytes of UTF-8, digits only. */
function isValidEntry(text: string): boolean {
  return /^[0-9]{1,5}$/.test(text);
}

function main(): void {
  if (!isValidEntry(ENTRY_TEXT)) {
    throw new Error("entry text must be one number of 1 to 5 digits");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, { encoding: "utf8", flag: "w" });

  // Fail loudly rather than let an unexpected rewrite reach the judge.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== ENTRY_TEXT || !isValidEntry(written)) {
    throw new Error("entry.txt did not round-trip as the intended single number");
  }

  process.stdout.write(`wrote and verified ${written.length} byte(s) to ${OUTPUT_PATH}\n`);
}

main();
