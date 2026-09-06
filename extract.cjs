const fs = require('fs');
const content = fs.readFileSync('C:/Users/hiren/.gemini/antigravity/brain/1ab33d0f-b226-4c39-8720-73a165418315/.system_generated/logs/transcript_full.jsonl', 'utf-8');
const lines = content.split('\n');
let maxLen = 0;
let jsonStr = '';

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('movie-to-lottie')) {
    if (lines[i].length > maxLen) {
      maxLen = lines[i].length;
      try {
        const obj = JSON.parse(lines[i]);
        if (obj.content) {
          const match = obj.content.match(/\{"v":"5\.5\.2".*\}/s);
          if (match) {
            jsonStr = match[0];
          }
        }
      } catch (e) {
        console.log('Error parsing JSON on line ' + i);
      }
    }
  }
}

console.log('Max length found: ' + maxLen);

if (jsonStr) {
  if (!fs.existsSync('src/assets')) fs.mkdirSync('src/assets');
  fs.writeFileSync('src/assets/animation.json', jsonStr);
  console.log('Successfully wrote JSON, length: ' + jsonStr.length);
} else {
  console.log('No JSON match found in content');
}
