const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const RULES_PATH = path.resolve(__dirname, "../rules/reglas_autonomas_doctor_foam.md");
const HASH_PATH = path.resolve(__dirname, "../state/immutable_guardrails.sha256");

const START_MARKER = "<!-- IMMUTABLE_GUARDRAILS_START -->";
const END_MARKER = "<!-- IMMUTABLE_GUARDRAILS_END -->";

function extractBlock(content) {
  const startIdx = content.indexOf(START_MARKER);
  const endIdx = content.indexOf(END_MARKER);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    throw new Error("IMMUTABLE_GUARDRAILS markers not found or malformed.");
  }
  return content.slice(startIdx, endIdx + END_MARKER.length).replace(/\r\n/g, "\n");
}

function main() {
  const initMode = process.argv.includes("--init");
  const content = fs.readFileSync(RULES_PATH, "utf8");
  const block = extractBlock(content);
  const hash = crypto.createHash("sha256").update(block, "utf8").digest("hex");

  if (initMode || !fs.existsSync(HASH_PATH)) {
    fs.mkdirSync(path.dirname(HASH_PATH), { recursive: true });
    fs.writeFileSync(HASH_PATH, hash + "\n", "utf8");
    console.log("IMMUTABLE_GUARDRAILS_SHA256_INITIALIZED:", hash);
    process.exit(0);
  }

  const expected = fs.readFileSync(HASH_PATH, "utf8").trim();
  if (hash !== expected) {
    console.error("CRITICAL: IMMUTABLE_GUARDRAILS_TAMPERED!");
    console.error("  Expected:", expected);
    console.error("  Actual:  ", hash);
    process.exit(1);
  }

  console.log("IMMUTABLE_GUARDRAILS_VERIFIED_OK:", hash);
}

main();
