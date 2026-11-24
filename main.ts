// Real-Life Patch Notes: The Comedy Changelog
//
// The whole entry is one terse release note for a bug in human social hardware:
// the "no, you go" doorway deadlock, fixed with an engineering-style backoff.
// Nothing is read from the network, the environment, or outside this repository.

const { mkdirSync, writeFileSync } = require("node:fs");

const PATCH_NOTE =
  "v8.2.0: fixed a bug where 'no, you go' deadlocked two people in every doorway; deployed randomized backoff to break ties.";

function main(): void {
  const length = [...PATCH_NOTE].length;
  if (length < 1 || length > 160 || !PATCH_NOTE.trim() || PATCH_NOTE.includes("\n")) {
    throw new Error("patch note must be a single, non-blank line of 1-160 characters");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", PATCH_NOTE, { encoding: "utf8", flag: "w" });
}

main();
