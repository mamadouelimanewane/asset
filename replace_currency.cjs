const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            let originalContent = content;
            // 4 200 $ -> 4 200 FCFA
            content = content.replace(/(\d(?:[ \u00A0,\.]\d+)*)\s*\$/g, '$1 FCFA');
            // M $ or K $ -> M FCFA
            content = content.replace(/([MK]|Md)\s*\$/g, '$1 FCFA');
            // $12,50 -> 12,50 FCFA
            // be careful with \$ variables in strings like `... ${var}`
            // only match $ immediately followed by digit
            content = content.replace(/\$(\d(?:[ ,\.]\d+)*)/g, '$1 FCFA');

            // Revert mistakenly matched string templates if any:
            // e.g. } FCFA{ -> } ${ (though this shouldn't happen with the digit requirement)

            if (originalContent !== content) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${file}`);
            }
        }
    });
}

processDir(pagesDir);
