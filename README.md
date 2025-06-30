# NoteUp

NoteUp es una aplicación web progresiva (PWA) que permite grabar audio desde el navegador y obtener una transcripción, traducción y resumen del mismo.

## Desarrollo

1. Instala las dependencias
   ```bash
   npm install
   ```
2. Crea un archivo `.env` basado en `.env.example` y define la URL de la API:
   ```bash
   VITE_API_BASE_URL=https://noteupapp.vercel.app
   ```
3. Inicia el servidor de desarrollo
   ```bash
   npm run dev
   ```

## Variables de entorno

- `VITE_API_BASE_URL` – Dirección base del backend que provee los endpoints `/api/transcribe`, `/api/translate` y `/api/summarize`.

## Construcción y despliegue

Ejecuta `npm run build` para generar los archivos estáticos. Asegúrate de que `VITE_API_BASE_URL` esté configurada en el entorno de producción.
