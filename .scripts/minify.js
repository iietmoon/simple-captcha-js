const fs = require('fs');
const uglify = require('uglify-js');

// Read the contents of dis/core.js
const code = fs.readFileSync('dist/core.js', 'utf8');

// Minify the code
const result = uglify.minify(code);

// Write the minified code to dist/core.min.js
fs.writeFileSync('dist/core.min.js', result.code);

console.log('dist/core.js has been minified ✅');
