import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy all root HTML files
const files = fs.readdirSync('.');
let htmlCount = 0;
for (const file of files) {
  if (file.endsWith('.html') && !file.startsWith('-')) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`✓ Copied ${file} -> dist/${file}`);
    htmlCount++;
  }
}

// Recursively copy directory
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy assets
if (fs.existsSync('assets')) {
  copyDir('assets', path.join(distDir, 'assets'));
  console.log('✓ Copied assets/ directory recursively -> dist/assets/');
}

console.log(`\n🎉 Build succeeded: ${htmlCount} HTML pages + assets bundled into dist/`);
