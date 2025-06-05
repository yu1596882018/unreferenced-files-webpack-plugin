const fs = require('fs');
const path = require('path');
const UnreferencedFilesPlugin = require('../lib/UnreferencedFilesPlugin');

const args = require('minimist')(process.argv.slice(2), {
  string: ['root', 'extensions'],
  boolean: ['json', 'delete'],
  default: {
    root: './src',
    json: true,
    delete: false,
    extensions: '.js,.ts,.vue,.css,.png,.jpg'
  }
});

const plugin = new UnreferencedFilesPlugin({
  root: path.resolve(process.cwd(), args.root),
  output: 'unreferenced-files-cli.log',
  outputJson: args.json,
  autoDelete: args.delete,
  extensions: args.extensions.split(',').map(e => e.trim())
});

plugin.apply({
  hooks: {
    emit: {
      tapAsync: (name, callback) => {
        const fakeCompilation = {
          fileDependencies: new Set(),
          assets: {}
        };
        callback(fakeCompilation, () => {
          console.log('✔️ CLI execution done.');
        });
      }
    }
  }
});
