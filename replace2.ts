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

const filesToCheck = ['./App.tsx', './index.html'];

filesToCheck.forEach((filePath) => {
  if (!fs.existsSync(filePath)) return;
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
