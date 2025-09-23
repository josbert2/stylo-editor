const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const packagePath = path.resolve(__dirname, '../../packages/stylo-editor');

console.log('👀 Watching for changes in stylo-editor package...');

// Observar cambios en el directorio src de tu paquete
chokidar.watch(`${packagePath}/src/**/*`, {
  ignored: /(^|[\/\\])\../, // Ignorar archivos ocultos
  persistent: true
}).on('change', (filepath) => {
  console.log(`📦 File changed: ${filepath}`);
  console.log('🔄 Rebuilding stylo-editor...');
  
  // Ejecutar el build del paquete
  exec('npm run build', { cwd: packagePath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Warning: ${stderr}`);
      return;
    }
    console.log(`✅ Package rebuilt successfully:\n${stdout}`);
    console.log('🔄 Reloading Vite...');
    
    // Tocar un archivo para forzar a Vite a recargar
    exec('touch src/App.jsx', { cwd: __dirname }, (error) => {
      if (error) {
        console.error(`❌ Error forcing reload: ${error.message}`);
      }
    });
  });
});