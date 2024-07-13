#!/usr/bin/env zx

// 引入 Node.js 的 http 模块
import http from 'http'

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

// 监听端口默认 3000
export async function initServer(port = 3000) {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
  })
}