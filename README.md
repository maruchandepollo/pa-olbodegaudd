# Sistema de Gestión de Pañol

Aplicación web diseñada para el control de inventario de productos y herramientas, permitiendo gestionar de forma simple y eficiente el ingreso y salida de artículos en un pañol.

---

## Descripción

Este sistema permite llevar un registro en tiempo real del stock disponible, así como el historial de movimientos (retiros y devoluciones), facilitando la trazabilidad y control de los recursos.

Está pensado para ser utilizado por múltiples usuarios de forma simultánea, con una interfaz intuitiva y rápida de usar.

---

## Funcionalidades

### Gestión de Inventario

* Registro de productos con:

  * Nombre
  * Modelo
  * Cantidad disponible
* Visualización en tabla ordenable
* Búsqueda por nombre o modelo

### Registro de Movimientos

* Salida de productos:

  * Producto
  * Cantidad
  * Persona que retira
  * Área solicitante
  * Fecha automática
* Ingreso de productos (devolución o reposición)

### Control en Tiempo Real

* Actualización automática del stock
* Validación de disponibilidad antes de retirar productos

### Multiusuario

* Uso simultáneo por múltiples personas
* Cambios sincronizados en tiempo real

### Historial y Trazabilidad

* Registro completo de movimientos
* Filtros por:

  * Fecha
  * Producto
  * Persona

---

## Interfaz

* Diseño moderno y minimalista
* Navegación simple e intuitiva
* Dashboard principal con:

  * Estado del inventario
  * Últimos movimientos

---

## Tecnologías (referenciales)

* Frontend: React
* Backend: Firebase / Supabase
* Base de datos en la nube
* Hosting web

---

## Instalación (si aplica)

```bash
# Clonar repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install

# Ejecutar en entorno local
npm run dev
```

---

## Acceso

* Sistema opcional de autenticación
* Usuarios autorizados para operar el sistema

---

## Estructura del Proyecto (ejemplo)

```
/src
  /components
  /pages
  /services
  /hooks
  /styles
```

---

## Mejoras Futuras

* Alertas de bajo stock
* Exportación a Excel
* Control de roles de usuario
* Notificaciones en tiempo real

---

## Uso

Este sistema está diseñado para facilitar el control de inventario en entornos donde múltiples personas gestionan herramientas o insumos compartidos.

---

## Licencia

Uso interno / privado (ajustar según necesidad).
