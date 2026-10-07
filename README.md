# Fontana — Aula de formación

App de escritorio para Windows con Electron y TypeScript. La interfaz usa HTML, CSS y Vite, con dorado (#D4AF37), rojo vino (#8B1538), azul (#1F2A37), gris oscuro (#111827) y fondo claro (#F9F9F9).

## Ver los avances en la app de escritorio

En la terminal de Visual Studio Code, dentro de esta carpeta:

```powershell
npm.cmd run desktop:dev
```

Se abre una ventana de Fontana. Mantén la terminal abierta y guarda tus cambios para verlos automáticamente. Cierra la ventana o presiona Ctrl + C para terminar. Si modificas `electron/main.mts`, reinicia el comando.

Para abrir la versión compilada desde archivos locales, sin servidor de desarrollo:

```powershell
npm.cmd run desktop:start
```

Esta integración permite ejecutar la aplicación durante el desarrollo. Todavía no incluye un instalador `.exe` para distribuir a los agentes.

## Ejecutar en Visual Studio Code

Abre esta carpeta y luego **Terminal > Nueva terminal**:

```powershell
npm.cmd install
npm.cmd run dev
```

Abre la dirección que aparezca en la terminal. Mantén esa terminal abierta mientras trabajas. Los cambios se reflejan al guardar. Para detener el servidor, presiona Ctrl + C.

## Dónde modificar cada parte

| Archivo o carpeta | Contenido |
| --- | --- |
| `index.html` | Estructura, bienvenida, navegación e historia. Los comentarios separan las secciones. |
| `src/styles.css` | Diseño, colores y adaptación a celulares, organizados por secciones con comentarios. |
| `src/content.ts` | Títulos, descripciones y notas de las cinco etapas del método. |
| `src/main.ts` | Interacciones en TypeScript. El tiempo del carrusel está en `CAROUSEL_INTERVAL`. |
| `public/imagenes` | Logo y las tres fotografías. |
| `electron/main.mts` | Ventana y configuración de Electron, en TypeScript. |
| `scripts/desktop-dev.mjs` | Inicio conjunto de Vite y la ventana de escritorio. |

Las carpetas `dist`, `desktop` y `node_modules` se ocultan en el explorador de Visual Studio Code para facilitar el trabajo. Se conservan porque contienen archivos compilados y dependencias; no hay que editarlas. El punto de entrada es el `index.html` de la raíz.

La carpeta `.openai` conserva la referencia del sitio creado inicialmente; no interviene en la ejecución de Electron.

## Verificar y compilar

```powershell
npm.cmd run check
npm.cmd run desktop:build
npm.cmd run preview
```

La historia oficial y el método interno siguen pendientes de validación por la empresa. No se incluyen datos de clientes ni conexiones a sistemas de cobranza.
