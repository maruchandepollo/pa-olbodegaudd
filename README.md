# Frontend - Sistema de Gestión de Pañol

Aplicación web para la gestión de inventario y movimientos de productos en un pañol. Permite visualizar stock, registrar entradas y salidas, y consultar el historial de movimientos de forma simple e intuitiva.

---

## Tecnologías utilizadas

* React
* JavaScript (ES6+)
* HTML5
* CSS3
* Fetch API / Axios
* Vite

---

## Estructura del proyecto

```
src/
├── components/
├── pages/
├── services/
├── hooks/
├── styles/
└── App.jsx
```

---

## Instalación

1. Clonar repositorio

```
git clone <url-del-repo>
cd frontend-panol
```

2. Instalar dependencias

```
npm install
```

3. Ejecutar aplicación

```
npm run dev
```

---

## Configuración

Configurar la URL del backend en los servicios:

Ejemplo:

```
const API_URL = "http://localhost:3000";
```

---

## Funcionalidades

* Visualización de inventario en tiempo real
* Registro de productos
* Registro de movimientos (entrada y salida)
* Actualización automática del stock
* Interfaz simple y rápida de usar

---

## Integración con backend

El frontend consume la API REST del backend:

* GET /productos
* POST /productos
* POST /movimientos

---

## Estado del proyecto

En desarrollo

Incluye:

* Vista de productos
* Registro básico de productos
* Registro de movimientos
* Conexión con backend

Pendiente:

* Historial de movimientos
* Filtros y búsqueda avanzada
* Manejo de errores en interfaz
* Notificaciones al usuario
* Mejora de UI/UX
* Deploy

---

## Notas

* Diseñado para uso interno en gestión de pañol
* Enfocado en simplicidad y rapidez de uso
* Integrado con backend propio desarrollado en Node.js
