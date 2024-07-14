#!/usr/bin/env zx

// 引入 Node.js 的 http 模块
import http from 'http'
import * as env from '../../index.mjs'

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api') && req.method === 'POST') {
    handleApiRequest(req, res);
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  }
})

async function handleApiRequest(req, res) {
  const jsonData = await getJsonData(req);

  switch(req.url) {
    case '/api/node/exec':
      const nodeName = jsonData.nodeName;
      const cmd = jsonData.cmd;
      if (!nodeName || !env[nodeName]) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: `module ${nodeName} is not exists` }));
        return;
      }
      if (!cmd) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: `cmd is empty` }));
        return;
      }

      const nodeEnv = await env[nodeName].info()
      const execCmd = `${nodeEnv.path} ${cmd}`
      $.verbose = true
      console.log({execCmd})
      const execRes = await $`cd / && ${execCmd}`
      $.verbose = false

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ data: execRes }));
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
      break;
  }
}

async function getJsonData(req) {
  return new Promise(resolve => {
    let body = '';
    let jsonData = {};

    req.on('data', chunk => {
      body += chunk.toString();
    })

    req.on('end', () => {
      try {
        jsonData = JSON.parse(body);
        console.log('Received JSON data:', jsonData);
      } catch (error) {
        console.error(`Error parsing JSON data: ${error}`);
      }
      
      resolve(jsonData)
    })
  })
}

// 监听端口默认 3000
export async function initServer(port = 3000) {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
  })
}