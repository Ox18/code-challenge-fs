
```markdown
# 🩺 Voycelink – Reto Técnico

Este proyecto consiste en una plataforma de comunicación en tiempo real entre clientes y doctores/trabajadores, implementando llamadas, eventos auditables y métricas SLA. Está compuesto por un **frontend (Next.js)**, un **backend (Express.js + Socket.io)** y una **base de datos MongoDB**. Todo el entorno se puede levantar fácilmente usando Docker.

---

## 🚀 Cómo levantar el proyecto

### ✅ Requisitos previos

- Tener Docker y Docker Compose instalados
- Tener Node.js (si querés correrlo local sin Docker)

---

### 🔧 Usando Docker (recomendado)

Levantar los servicios:

```bash
docker-compose up --build
```

Detener y eliminar volúmenes:

```bash
docker-compose down -v
```

Esto levantará:

- 🗃️ MongoDB en `localhost:27017`
- 🧠 Backend en `localhost:3001`
- 🖥️ Frontend en `localhost:3000`

---

## 👥 Acceso a la aplicación

- 🧑‍💼 **Clientes**  
  👉 Ir a: [http://localhost:3000](http://localhost:3000)

- 🩺 **Doctores/Trabajadores**  
  👉 Ingresar vía login: [http://localhost:3000/auth/login](http://localhost:3000/auth/login)  
  ⚠️ Es importante registrarte antes de iniciar sesión.

---

## 🛠️ Correr manualmente sin Docker

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

Para correr los tests del backend:

```bash
cd backend
npm run test
```

Incluye:

- ✅ Pruebas unitarias con Jest
- ✅ Pruebas de integración con Supertest

---

## 📁 Estructura del proyecto

```
project-root/
├── backend/          # Express + Socket.io + Mongo
├── frontend/         # Next.js + Socket.io client
├── mongo-init/       # Scripts de inicialización de MongoDB (opcional)
├── docker-compose.yml
```
```