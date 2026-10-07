import { spawn } from 'node:child_process';
import electron from 'electron';

const desktopEnv = { ...process.env };
delete desktopEnv.FONTANA_DEV_URL;
delete desktopEnv.ELECTRON_RUN_AS_NODE;
const child = spawn(electron, ['.'], { stdio: 'inherit', env: desktopEnv });
child.on('exit', (code) => { process.exitCode = code ?? 0; });
child.on('error', (error) => { console.error(error.message); process.exitCode = 1; });
process.on('SIGINT', () => child.kill());
