const fs = require('fs');
const uglify = require('uglify-js');

const code = fs.readFileSync('dist/js/core.js', 'utf8');

const result = uglify.minify(code);

fs.writeFileSync('dist/js/core.min.js', result.code);

console.log('✅ JS compiled.');
