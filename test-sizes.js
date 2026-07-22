const fs = require('fs');
const child_process = require('child_process');

try {
  const imgBuffer = fs.readFileSync('public/hero-bg.png');
  // width at offset 16, height at 20 (4 bytes each, big endian)
  const imgWidth = imgBuffer.readUInt32BE(16);
  const imgHeight = imgBuffer.readUInt32BE(20);
  console.log(`🖼️ Imagen hero-bg.png: ${imgWidth} x ${imgHeight}`);
  
  const imgRatio = (imgWidth / imgHeight).toFixed(3);
  console.log(`Relación de aspecto: ${imgRatio}`);
} catch (e) {
  console.log('Error leyendo imagen');
}

console.log('---');

try {
  // We can use powershell's shell application object to get dimensions if ffprobe fails
} catch(e) {}
