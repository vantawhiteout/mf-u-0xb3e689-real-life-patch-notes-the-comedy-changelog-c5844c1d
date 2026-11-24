// Real-Life Patch Notes: The Comedy Changelog
//
// One line, written as a real release note, for the "no, you go" doorway
// deadlock: two polite people yield forever, a randomized backoff breaks the
// tie, and the patch hilariously fails anyway. Deterministic and self-contained:
// nothing is read from the network, the environment, or outside this repository.

const { mkdirSync, writeFileSync } = require("node:fs");

const OUTPUT_DIRECTORY = "/output";
const OUTPUT_FILE = `${OUTPUT_DIRECTORY}/entry.txt`;
const MAX_CHARACTERS = 160;

// The entry itself. Keep it on one line and inside the gate's size cap.
const PATCH_NOTE =
  "v8.2.0: fixed a 'no, you go' deadlock that froze two polite strangers in a doorway; added randomized backoff. Both now apologize at once and collide anyway.";

// The gate counts UTF-8 characters, so measure code points rather than bytes.
function characterCount(text: string): number {
  return [...text].length;
}

// Fail loudly during development instead of shipping a note the gate refuses.
function assertValidPatchNote(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("patch note must not be blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("patch note must be a single line");
  }
  const length = characterCount(text);
  if (length < 1 || length > MAX_CHARACTERS) {
    throw new Error(`patch note must be 1-${MAX_CHARACTERS} characters (got ${length})`);
  }
}

function main(): void {
  assertValidPatchNote(PATCH_NOTE);
  mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
  writeFileSync(OUTPUT_FILE, PATCH_NOTE, { encoding: "utf8", flag: "w" });
}

main();
