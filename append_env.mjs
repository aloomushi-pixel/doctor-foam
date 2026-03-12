import crypto from 'crypto';
import fs from 'fs';

const secret = crypto.randomBytes(32).toString('base64');
fs.appendFileSync('.env', `\nNEXTAUTH_SECRET="${secret}"\nNEXTAUTH_URL="http://localhost:3000"\n`);
console.log('Appended secret to .env');
