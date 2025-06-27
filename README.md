# unreferenced-files-webpack-plugin

一个用于检测（并可选删除）未被 Webpack 构建引用文件的 Webpack 插件和 CLI 工具。

## 🔧 安装

```bash
npm install --save-dev unreferenced-files-webpack-plugin
```

## 🧩 在 Webpack 中使用

```js
const UnreferencedFilesPlugin = require('unreferenced-files-webpack-plugin');

module.exports = {
  plugins: [
    new UnreferencedFilesPlugin({
      root: './src', // 需要检测的根目录
      output: 'unreferenced-files.log', // 输出未引用文件的日志文件名
      outputJson: true, // 是否输出 JSON 格式
      autoDelete: false, // 是否自动删除未引用文件
      extensions: ['.js', '.vue', '.css', '.png'] // 需要检测的文件扩展名
    })
  ]
};
```

## 🖥️ CLI 命令行用法

```bash
node ./bin/cli.js --root ./src --extensions .js,.vue,.png --json --delete
```

## ⚠️ 注意

使用 `--delete` 参数时请谨慎，文件会被直接从磁盘删除！

## 📄 许可证

MIT
