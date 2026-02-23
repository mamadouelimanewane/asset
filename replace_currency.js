const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Replace various forms of hardcoded USD to FCFA
            // "M $" or "M$" -> "M FCFA"
            // "K $" or "K$" -> "K FCFA"
            // "Md $" or "Md$" -> "Md FCFA"
            // " $" -> " FCFA"
            // "$ " -> "FCFA "

            // This regex looks for digits or M/K followed by space and $
            let originalContent = content;
            content = content.replace(/(\d([ ,.]\d+)*)\s*\$/g, '$1 FCFA');
            content = content.replace(/([MK]|Md)\s*\$/g, '$1 FCFA');
            content = content.replace(/\$([\d ,.]+)/g, '$1 FCFA');

            // Also specific instances like ` ${status === 'scanning' ? '#E9A319' : 'rgba(255,255,255,0.2)'}` should NOT be touched, 
            // the regex above only handles numbers and M/K/Md.

            if (originalContent !== content) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${file}`);
            }
        }
    });
}

processDir(pagesDir);
