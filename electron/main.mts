import { app, BrowserWindow, dialog, Menu, net, protocol, session } from 'electron';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Ventana de escritorio. La interfaz sigue en index.html y src/.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const developmentUrl = process.env.FONTANA_DEV_URL;
const appOrigin = 'fontana://aula';
let mainWindow: BrowserWindow | null = null;

app.setName('Fontana');

protocol.registerSchemesAsPrivileged([
  { scheme: 'fontana', privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

function allowedNavigation(url: string): boolean {
  const parsed = new URL(url);
  return developmentUrl
    ? parsed.origin === new URL(developmentUrl).origin
    : parsed.protocol === 'fontana:' && parsed.host === 'aula';
}

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    title: 'Fontana · Aula de formación',
    icon: path.join(projectRoot, 'public/imagenes/fontana-logo.png'),
    width: 1360,
    height: 920,
    minWidth: 800,
    minHeight: 620,
    backgroundColor: '#f9f9f9',
    show: false,
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true },
  });
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!allowedNavigation(url)) event.preventDefault();
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    console.log('Ventana de Fontana lista.');
  });
  mainWindow.webContents.on('did-fail-load', (_event, code, description) => {
    console.error(`No se pudo cargar la interfaz (${code}): ${description}`);
  });
  mainWindow.on('closed', () => { mainWindow = null; });
  await mainWindow.loadURL(developmentUrl ?? `${appOrigin}/index.html`);
}

app.whenReady().then(async () => {
  // Solo aceptamos una vista de desarrollo local, nunca una página externa.
  if (developmentUrl) {
    const parsed = new URL(developmentUrl);
    if (parsed.protocol !== 'http:' || parsed.hostname !== '127.0.0.1') {
      throw new Error('La vista de desarrollo debe usar http://127.0.0.1.');
    }
  }
  Menu.setApplicationMenu(null);
  session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  session.defaultSession.setPermissionCheckHandler(() => false);
  const distRoot = path.join(projectRoot, 'dist');
  protocol.handle('fontana', async (request) => {
    const url = new URL(request.url);
    if (url.host !== 'aula') return new Response('No encontrado', { status: 404 });
    const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    const target = path.resolve(distRoot, relativePath);
    const relative = path.relative(distRoot, target);
    if (relative.startsWith('..') || path.isAbsolute(relative)) return new Response('No permitido', { status: 403 });
    try {
      const response = await net.fetch(pathToFileURL(target).href);
      const headers = new Headers(response.headers);
      headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'");
      return new Response(response.body, { status: response.status, headers });
    } catch {
      return new Response('Archivo no encontrado', { status: 404 });
    }
  });
  await createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) void createWindow();
  });
}).catch((error: unknown) => {
  dialog.showErrorBox('No se pudo abrir Fontana', String(error));
  app.quit();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
