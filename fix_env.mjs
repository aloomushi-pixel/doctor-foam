import { readFileSync, writeFileSync } from "fs";

let envContent = readFileSync(".env", "utf8");

// Remove any existing DATABASE_URL line
const lines = envContent.split("\n").filter(line => !line.startsWith("DATABASE_URL="));
lines.push("DATABASE_URL=postgresql://postgres:kdxUO0FVOnTUHld8h2hN@72.62.162.99:5432/drfoam_db");

writeFileSync(".env", lines.join("\n"));
console.log("Updated .env with clean DATABASE_URL");
