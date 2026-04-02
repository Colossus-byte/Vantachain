import fs from 'fs';
import path from 'path';

const colorMap: Record<string, string> = {
  '\\[#020205\\]': 'void',
  '\\[#0a0a0f\\]': 'surface',
  '\\[#ccff00\\]': 'cyber-lime',
  '\\[#8b5cf6\\]': 'electric-violet',
  '\\[#fbbf24\\]': 'hyper-gold',
  '\\[#f59e0b\\]': 'hyper-gold',
  '\\[#ff0055\\]': 'neon-rose',
  '\\[#3b82f6\\]': 'blue-500',
  '\\[#050508\\]': 'surface',
  '\\[#08080c\\]': 'surface',
  '\\[#0c0e14\\]': 'surface',
  '\\[#050608\\]': 'surface',
  '\\[#0c0e12\\]': 'surface',
  '\\[#080810\\]': 'surface',
  '\\[#0a0c12\\]': 'surface',
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
  
  // Also replace opacity modifiers like bg-[#ccff00]/10 -> bg-cyber-lime/10
  // Wait, the regex above replaces the bracketed hex, so `bg-[#ccff00]/10` becomes `bg-cyber-lime/10`. This is correct!
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});
