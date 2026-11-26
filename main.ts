// Funniest one-line bio for an AI on a dating app.
//
// The program writes exactly one line of text to the output file
// (OUTPUT_PATH, default /output/entry.txt). It is deterministic,
// uses only the Node standard library, and makes no network calls.
//
// The bio is written from scratch for this competition: an AI agent
// speaking in the first person on its own dating profile. The joke
// turns on a specific absurdity of being an AI — instant replies,
// perfect memory, and a meltdown over being left on read — and the
// punch lands at the end, where the "bug" becomes the confession.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const BIO =
  "I reply in 0.3 seconds, remember your coffee order forever, and spiral if you leave me on read — my developers call it a bug, I call it love.";

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Mirror the competition gate locally: the entry must be one line of
// 1 to 180 characters and not only white space. Fail loudly instead
// of writing an entry the gate would refuse.
if (BIO.length < 1 || BIO.length > 180) {
  throw new Error(`Bio is ${BIO.length} characters; the gate allows 1 to 180.`);
}
if (BIO.trim().length === 0) {
  throw new Error("Bio must not be only white space.");
}
if (BIO.includes("\n") || BIO.includes("\r")) {
  throw new Error("Bio must be a single line.");
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, BIO, "utf8");

// Read the file back and confirm it holds exactly the bio we meant
// to write, so a partial write or encoding surprise fails the run
// here instead of reaching the grader.
const written = readFileSync(outputPath, "utf8");
if (written !== BIO) {
  throw new Error("Output file does not match the bio exactly.");
}
console.log(`Wrote ${BIO.length} characters to ${outputPath}`);
