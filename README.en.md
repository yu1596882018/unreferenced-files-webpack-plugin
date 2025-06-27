# unreferenced-files-webpack-plugin

A Webpack plugin and CLI tool to detect (and optionally delete) files that are not referenced by your Webpack build.

## 🔧 Installation

```bash
npm install --save-dev unreferenced-files-webpack-plugin
```

## 🧩 Usage in Webpack

```js
const UnreferencedFilesPlugin = require('unreferenced-files-webpack-plugin');

module.exports = {
  plugins: [
    new UnreferencedFilesPlugin({
      root: './src',
      output: 'unreferenced-files.log',
      outputJson: true,
      autoDelete: false,
      extensions: ['.js', '.vue', '.css', '.png']
    })
  ]
};
```

## 🖥️ Usage via CLI

```bash
node ./bin/cli.js --root ./src --extensions .js,.vue,.png --json --delete
```

## ⚠️ Warning

Use `--delete` carefully — files will be removed from disk!

## 📄 License

MIT 