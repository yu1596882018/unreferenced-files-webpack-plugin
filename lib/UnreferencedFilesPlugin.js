const fs = require('fs');
const path = require('path');

class UnreferencedFilesPlugin {
  constructor(options = {}) {
    this.root = options.root || path.resolve(__dirname, 'src');
    this.output = options.output || 'unreferenced-files.log';
    this.extensions = options.extensions || [
      '.js', '.ts', '.vue', '.scss', '.css',
      '.png', '.jpg', '.jpeg', '.gif', '.svg',
      '.mp3', '.mp4', '.webm',
      '.woff', '.woff2', '.ttf', '.eot',
      '.json'
    ];
    this.excludeDirs = options.excludeDirs || ['node_modules', '__tests__'];
    this.outputJson = options.outputJson ?? true;
    this.autoDelete = options.autoDelete ?? false;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('UnreferencedFilesPlugin', (compilation, callback) => {
      const usedFiles = new Set([...compilation.fileDependencies].map(file => path.resolve(file)));
      const allFiles = this.getAllFiles(this.root).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return this.extensions.includes(ext);
      });

      const unreferenced = allFiles.filter(file => !usedFiles.has(path.resolve(file)));

      const logText = `📦 Unreferenced Files (${unreferenced.length}):\n` + unreferenced.join('\n');
      const logJson = JSON.stringify({ unreferencedFiles: unreferenced }, null, 2);

      console.log(logText);

      compilation.assets[this.output] = {
        source: () => logText,
        size: () => logText.length
      };

      if (this.outputJson) {
        const jsonOutput = this.output.replace(/\.log$/, '.json');
        compilation.assets[jsonOutput] = {
          source: () => logJson,
          size: () => logJson.length
        };
      }

      if (this.autoDelete) {
        unreferenced.forEach(file => {
          try {
            fs.unlinkSync(file);
            console.log(`🗑️ Deleted unreferenced file: ${file}`);
          } catch (err) {
            console.warn(`⚠️ Failed to delete: ${file}`);
          }
        });
      }

      callback();
    });
  }

  getAllFiles(dir, files = []) {
    if (this.excludeDirs.some(ex => dir.includes(ex))) return files;
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      try {
        if (fs.statSync(fullPath).isDirectory()) {
          if (!this.excludeDirs.includes(file)) {
            this.getAllFiles(fullPath, files);
          }
        } else {
          files.push(fullPath);
        }
      } catch (e) {}
    });
    return files;
  }
}

module.exports = UnreferencedFilesPlugin;
