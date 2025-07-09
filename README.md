# 🎼 Backend - Convocatoria de Instrumentos 🎺

Este es el backend del sistema de gestión para convocatorias de instrumentos musicales. Está construido con **Node.js**, utilizando **Express.js** y una base de datos como **MongoDB** o **SQL Server**, según la configuración.

---

## 🚀 Tecnologías principales

- 🟩 Node.js – Entorno de ejecución de JavaScript
- ⚡ Express.js – Framework para APIs REST
- 🛢️ DB – Base de datos
- 📄 Dotenv – Manejo de variables de entorno
- 📦 Axios / CORS – Middleware para llamadas HTTP

---

## 📁 Estructura del proyecto

* controllers/ # Lógica para cada recurso (Usuarios, Convocatorias, etc.)
* models/ # Modelos de datos (Mongoose o Sequelize)
* routes/ # Rutas de la API
* services/ # Lógica externa o reusable (tokens, correos, etc.)
* middleware/ # Middlewares personalizados
* config/ # Conexión a base de datos y configuración global
* .env # Variables de entorno (no se sube al repo)
* app.js / index.js # Punto de entrada de la aplicación
* package.json # Dependencias y scripts

---

```env

PORT=3000
DB_SERVER=databaserverlab-01.database.windows.net
DB_PORT=1433
DB_USER=Geraldine-Rocha
DB_PASSWORD=rootData!
DB_NAME=conservatorio_musica

```

## ⚙️ Variables de entorno

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Iniciar en producción
npm start

# Lint opcional
npm run lint
