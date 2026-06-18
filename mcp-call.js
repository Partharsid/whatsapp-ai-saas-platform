const { spawn } = require('child_process');

const toolName = process.argv[2];
const toolArgs = JSON.parse(process.argv[3]);

const server = spawn('npx', ['-y', '@21st-dev/magic'], {
  env: { ...process.env, "21ST_API_KEY": "cba680b10e09022c0d8a81ee68c1e11059d6d385b3fafca3eb19f6bf8f825f09" },
  stdio: ['pipe', 'pipe', 'inherit'],
  shell: true
});

let output = '';

server.stdout.on('data', (data) => {
  const messages = data.toString().split('\n').filter(Boolean);
  for (const msg of messages) {
    try {
      const parsed = JSON.parse(msg);
      if (parsed.id === 1) {
        server.stdin.write(JSON.stringify({
          jsonrpc: "2.0",
          method: "notifications/initialized"
        }) + '\n');
        
        server.stdin.write(JSON.stringify({
          jsonrpc: "2.0",
          id: 2,
          method: "tools/call",
          params: {
            name: toolName,
            arguments: toolArgs
          }
        }) + '\n');
      } else if (parsed.id === 2) {
        console.log(JSON.stringify(parsed.result, null, 2));
        process.exit(0);
      }
    } catch (e) {
      // ignore non-json
    }
  }
});

server.stdin.write(JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test", version: "1.0.0" }
  }
}) + '\n');

setTimeout(() => {
  console.log("Timeout waiting for MCP server");
  process.exit(1);
}, 30000);
