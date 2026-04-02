import fs from 'fs';
import path from 'path';

const colorMap: Record<string, string> = {
  '\\[#05060a\\]': 'surface',
  '\\[#f6851b\\]': 'hyper-gold',
  '\\[#93c5fd\\]': 'blue-300',
};

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
      callback(dirPath);
    }
  });
}

walkDir('./components', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const [hex, name] of Object.entries(colorMap)) {
    const regex = new RegExp(hex, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, name);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
