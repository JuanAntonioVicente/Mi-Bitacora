<p align="center">
  <img src="public/logo.svg" alt="Logo de Mi Bitácora" width="80" />
</p>

<h1 align="center">Mi Bitácora</h1>

<p align="center">
  Aplicación para llevar un registro personal de lo que haces: juegos terminados, películas vistas, planes, libros… lo que quieras.<br />
  Instalable en el móvil y funciona sin conexión.
</p>

<p align="center">
  <a href="https://mi-bitacora-xi.vercel.app"><strong>Ver la aplicación en vivo</strong></a>
</p>

---

## Capturas

<table>
  <tr>
    <th>Escritorio</th>
    <th>Móvil</th>
  </tr>
  <tr>
    <td valign="top"><img src="docs/escritorio.png" alt="Vista de escritorio" /></td>
    <td valign="top"><img src="docs/movil.png" alt="Vista móvil" width="250" /></td>
  </tr>
</table>

## ¿Qué es?

Mi Bitácora nace de una necesidad personal: llevar la cuenta de cosas que hago y poder consultarlas por fecha. Cada usuario crea sus propias **listas** (por ejemplo, "Juegos 2026" o "Películas vistas") y dentro anota **entradas** con fecha, horas dedicadas y una puntuación.

Los datos se guardan **en el propio dispositivo**: no hay cuentas ni registro, y nadie más puede verlos.

## Funcionalidades

- **Listas personalizadas** con nombre y color propio (se propone un color aleatorio al crearlas).
- **Entradas** con fecha, nombre, horas y puntuación del 0 al 10. Horas y puntuación son opcionales.
- **Edición y borrado** de listas y entradas, con confirmación antes de borrar. Solo se puede editar un elemento a la vez.
- **Calendario mensual** que marca con el color de cada lista los días con entradas, con información al pasar el ratón o tocar.
- **Resumen** con el total de entradas por lista, tanto histórico como del mes seleccionado.
- **Exportar e importar** todos los datos en un archivo JSON, para hacer copias de seguridad o cambiar de dispositivo.
- **Instalable como aplicación (PWA)** en Android e iPhone, con funcionamiento sin conexión.
- **Diseño adaptado a móvil**, con tema oscuro.

## Tecnologías

**Frontend**
- React + Vite
- CSS propio por componente, sin librerías de estilos
- `vite-plugin-pwa` para el service worker y el manifest

**Backend** (API REST, incluida en el repositorio)
- Node.js + Express
- PostgreSQL con el conector `pg`
- Consultas parametrizadas para evitar inyección SQL

**Infraestructura**
- Docker y Docker Compose para levantar base de datos, backend y frontend
- Vercel (frontend), Render (backend) y Neon (PostgreSQL) para el despliegue

## Arquitectura

La aplicación separa la interfaz del origen de los datos mediante una **capa de acceso a datos**. Existen dos implementaciones con exactamente la misma interfaz de funciones:

- `src/api.js` → trabaja contra la API REST del backend (PostgreSQL).
- `src/local.js` → guarda los datos en `localStorage`, en el propio dispositivo.

`App.jsx` no sabe de dónde vienen los datos: solo llama a funciones como `obtenerListas()` o `apiCrearEntrada()`. Cambiar de una fuente a otra es cambiar una sola línea de import.

**La versión publicada usa `local.js`.** Es una decisión de producto: al ser una app de uso personal, se prioriza la privacidad, que funcione sin conexión y que no haga falta registrarse. El backend sigue completo en el repositorio y desplegado como demostración de la API.

## Estructura del proyecto

```
mi-bitacora/
├── backend/
│   ├── index.js          # Servidor Express y rutas de la API
│   ├── db.js             # Conexión a PostgreSQL
│   ├── schema.sql        # Creación de las tablas
│   └── Dockerfile
├── public/               # Logo e iconos de la PWA
├── src/
│   ├── components/       # Componentes de React y sus estilos
│   ├── api.js            # Capa de datos: API REST
│   ├── local.js          # Capa de datos: localStorage
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile            # Imagen del frontend (build + nginx)
├── docker-compose.yml
└── vite.config.js        # Configuración de Vite y de la PWA
```

## Cómo ejecutarlo en local

### Solo la aplicación (versión local)

Necesitas Node.js 20 o superior.

```bash
git clone https://github.com/JuanAntonioVicente/mi-bitacora.git
cd mi-bitacora
npm install
npm run dev
```

Abre `http://localhost:5173`.

Para probar la PWA (el service worker solo funciona en la versión construida):

```bash
npm run build
npm run preview
```

### Todo el proyecto con Docker

Levanta base de datos, backend y frontend con un solo comando. Las tablas se crean automáticamente a partir de `backend/schema.sql`.

```bash
docker compose up --build
```

| Servicio | Dirección |
|---|---|
| Frontend | `http://localhost:5173` |
| API | `http://localhost:3001` |
| PostgreSQL | `localhost:5433` |

### Variables de entorno

El backend lee su configuración de `backend/.env`:

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión de PostgreSQL |
| `FRONTEND_URL` | Origen permitido por CORS |

Para usar la versión con API, el frontend necesita un `.env` en la raíz con:

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | Dirección del backend |

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/listas` | Obtiene todas las listas |
| POST | `/listas` | Crea una lista |
| PUT | `/listas/:id` | Edita una lista |
| DELETE | `/listas/:id` | Borra una lista y sus entradas |
| GET | `/entradas` | Obtiene todas las entradas |
| POST | `/entradas` | Crea una entrada |
| PUT | `/entradas/:id` | Edita una entrada |
| DELETE | `/entradas/:id` | Borra una entrada |

Al borrar una lista, sus entradas se eliminan automáticamente gracias a la restricción `ON DELETE CASCADE` de la base de datos.

## Lo que he aprendido

Este es mi primer proyecto completo fuera de la formación. Lo construí desde cero para consolidar lo aprendido y aprender lo que me faltaba:

- Diseñar un modelo de datos relacional con claves foráneas e integridad referencial.
- Estado, props y flujo de datos en React; cuándo subir el estado a un componente padre.
- Construir una API REST con Express y conectarla a PostgreSQL.
- Separar la lógica de datos de la interfaz para poder cambiar la fuente sin tocar los componentes.
- Contenerizar una aplicación completa con Docker Compose.
- Desplegar frontend, backend y base de datos en servicios distintos, con variables de entorno y CORS.
- Convertir una web en una PWA instalable que funciona sin conexión.

## Próximas mejoras

- Estadísticas: horas totales y puntuación media por lista.
- Sincronización opcional entre dispositivos con cuentas de usuario.

## Autor

**Juan Antonio Vicente Ruiz** — [GitHub](https://github.com/JuanAntonioVicente) · [LinkedIn](https://www.linkedin.com/in/juanantoniovicente/)
