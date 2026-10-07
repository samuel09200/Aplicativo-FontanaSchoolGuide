import { createServer } from 'vite';
import { spawn } from 'node:child_process';
import electron from 'electron';

// Abre su propio servidor sin interferir con la vista del navegador.
const server = await createServer({ server: { host: '127.0.0.1', port: 5180, strictPort: false } });
await server.listen();
const address = server.httpServer.address();
if (!address || typeof address === 'string') throw new Error('No se pudo iniciar la vista de desarrollo.');
const url = `http://127.0.0.1:${address.port}/`;
console.log(`Abriendo Fontana en una ventana de escritorio (${url}).`);
const desktopEnv = { ...process.env, FONTANA_DEV_URL: url };
delete desktopEnv.ELECTRON_RUN_AS_NODE;
const child = spawn(electron, ['.'], { stdio: 'inherit', env: desktopEnv });
let closing = false;
async function close(code = 0) {
  if (closing) return;
  closing = true;
  child.kill();
  await server.close();
  process.exitCode = code;
}
child.on('exit', (code) => void close(code ?? 0));
child.on('error', (error) => { console.error(error.message); void close(1); });
process.on('SIGINT', () => void close());
process.on('SIGTERM', () => void close());
