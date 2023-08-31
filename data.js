const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

const filePath = path.join(__dirname, 'data', 'try.json');

// 创建可读流
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

// 创建 JSONStream 解析器
const parser = JSONStream.parse('*');

// 监听解析器的 data 事件
parser.on('data', (data) => {
  console.log(data);
});

// 监听可读流的 error 事件
readStream.on('error', (err) => {
  console.error(err);
});

// 将可读流通过解析器进行解析
readStream.pipe(parser);