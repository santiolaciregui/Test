# 📖 Blog Personal - Full Stack con TypeScript

Este es un **Blog Personal** desarrollado con **TypeScript**, utilizando **Node.js y Express** en el backend y **Next.js** en el frontend. La aplicación permite a los usuarios registrarse, iniciar sesión, crear, editar, eliminar y buscar publicaciones. Se implementa **autenticación con JWT** y conexión con **MySQL** como base de datos.

---

## ⚙️ Configuración del Backend

### 1️⃣ Requisitos Previos

- Tener **Node.js** y **npm** instalados.
- Tener **MySQL** instalado y configurado.

### 2️⃣ Instalación

1. Clona este repositorio y accede al directorio `backend`:
   ```bash
   git clone https://github.com/santiolaciregui/Test.git
   cd backend

2.	Instala las dependencias:
    ```bash
    npm install
   

3.	Crea un archivo .env en la raíz del proyecto y configura las variables de entorno:
    ```bash
    PORT=4000
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_password
    DB_NAME=blog_db_ts
    JWT_SECRET=clave_secreta_para_tokens

4.	Crea la base de datos ejecutando este script en MySQL:
    ```bash
    node config/initDB.js

5.	Inicia el servidor:
    ```bash
    npm run dev

El servidor estará disponible en `http://localhost:4000`.

---

## 🌐 Configuración del Frontend

### 1️⃣ Instalación

1. Accede a la carpeta del frontend:
   ```bash
   cd ../frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El frontend estará disponible en `http://localhost:3000`.

---

## 🔌 API Endpoints

### 🔑 Autenticación (`/api/auth`)

| Método | Ruta       | Descripción                      | Requiere Token |
|--------|-----------|----------------------------------|---------------|
| POST   | `/register` | Registra un nuevo usuario      | ❌ No |
| POST   | `/login`    | Inicia sesión y devuelve token | ❌ No |

### 📝 Publicaciones (`/api/posts`)

| Método  | Ruta       | Descripción                            | Requiere Token |
|---------|-----------|----------------------------------------|---------------|
| GET     | `/`       | Obtiene todas las publicaciones con paginación | ❌ No |
| GET     | `/:id`    | Obtiene una publicación por su ID      | ❌ No |
| POST    | `/`       | Crea una nueva publicación            | ✅ Sí |
| PUT     | `/:id`    | Edita una publicación existente (solo autor) | ✅ Sí |
| DELETE  | `/:id`    | Elimina una publicación (solo autor)  | ✅ Sí |

---

## 🌍 Despliegue en Producción

El proyecto ha sido desplegado y puede probarse en los siguientes enlaces:

🔹 **Frontend (Next.js en Vercel)**:  
👉 [https://test-jhmfpgklz-santiolacireguis-projects.vercel.app/](https://test-jhmfpgklz-santiolacireguis-projects.vercel.app/)

🔹 **Backend (Node.js en Render)**:  
👉 [https://test-nz8m.onrender.com/api](https://test-nz8m.onrender.com/api)

### 📝 Registro de usuario

Para registrarse por primera vez en el sistema, acceda al frontend y agregue `/register` en la URL:

👉 [https://test-jhmfpgklz-santiolacireguis-projects.vercel.app/register](https://test-jhmfpgklz-santiolacireguis-projects.vercel.app/register)

