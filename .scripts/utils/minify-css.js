const fs = require('fs');
const sass = require('node-sass');
const uglifycss = require('uglifycss');
const path = require('path');

const scssFilePath = path.resolve(__dirname, '../../src/core.scss');
const cssFilePath = path.resolve(__dirname, '../../dist/css/core.css');

sass.render({
  file: scssFilePath,
  outFile: cssFilePath,
}, (error, result) => {
  if (error) {
    console.error('❌ Error compiling SCSS:', error);
    process.exit(1);
  }

  fs.writeFileSync(cssFilePath, result.css);

  const originalCss = fs.readFileSync(cssFilePath, 'utf8');

  const minifiedCss = uglifycss.processString(originalCss);

  const outputFilePath = path.resolve(__dirname, '../../dist/css/core.min.css');
  fs.writeFileSync(outputFilePath, minifiedCss);

  console.log('✅ SCSS compiled and core.css created. core.min.css generated successfully.');
});
