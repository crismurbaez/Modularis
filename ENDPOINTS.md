# Documentación de Endpoints (CRUD) - Backend Modularis

Este documento detalla todos los módulos CRUD implementados en el backend hasta la fecha, junto con las rutas (endpoints) disponibles y las tablas de la base de datos a las que afectan.

---

## 1. Módulo de Autenticación (`/auth`)
Maneja el inicio de sesión y la generación de tokens JWT.
* **POST `/auth/login`**: Valida credenciales y devuelve un token.
* **Tablas afectadas**: 
  * Lee de `usuarios` y cruza datos con `personal_docente` (vista).

## 2. Módulo de Personal Docente (`/staff`)
Administra el registro completo de los docentes (con campos encriptados).
* **GET `/staff`**: Obtiene todos los docentes.
* **GET `/staff/:id`**: Obtiene un docente específico con sus estadísticas.
* **POST `/staff`**: Crea un nuevo docente (encripta DNI y CUIL).
* **PATCH `/staff/:id`**: Actualiza datos de un docente.
* **POST `/staff/:id/absence`**: Registra una inasistencia para el docente.
* **Tablas afectadas**:
  * Lee/Escribe en la VISTA `personal_docente` (la cual intercepta y encripta datos hacia `personal_docente_raw`).
  * Escribe en `inasistencias_diarias_docentes`.

## 3. Módulo de Alumnos (`/students`)
Administra el registro completo de los alumnos (con campos encriptados) y calcula su edad en tiempo real.
* **GET `/students`**: Obtiene todos los alumnos.
* **GET `/students/:id`**: Obtiene un alumno específico.
* **POST `/students`**: Crea un nuevo alumno.
* **PATCH `/students/:id`**: Actualiza datos de un alumno.
* **Tablas afectadas**:
  * Lee/Escribe en la VISTA `alumnos` (la cual intercepta y encripta datos hacia `alumnos_raw`).

## 4. Módulo de Usuarios (`/users`)
Gestión de accesos al sistema. Cada usuario debe pertenecer a un `id_personal` (Relación 1 a 1).
* **GET `/users`**: Obtiene todos los usuarios del sistema (excepto el Superadmin oculto).
* **GET `/users/:id`**: Obtiene un usuario y sus datos personales asociados.
* **POST `/users`**: Crea un nuevo usuario validando que el `id_personal` no esté repetido.
* **PATCH `/users/:id/status`**: Activa o inactiva a un usuario.
* **PATCH `/users/:id/role`**: Cambia el rol del usuario (Ej. de Preceptor a Director).
* **Tablas afectadas**:
  * Lee/Escribe en `usuarios`.
  * Lee de la VISTA `personal_docente`.

## 5. Módulo de Materias (`/subjects`)
Administración de las materias dictadas en la institución.
* **GET `/subjects`**: Lista todas las materias.
* **GET `/subjects/:id`**: Obtiene una materia específica.
* **POST `/subjects`**: Crea una nueva materia.
* **PATCH `/subjects/:id`**: Modifica una materia existente.
* **DELETE `/subjects/:id`**: Elimina una materia.
* **Tablas afectadas**:
  * Lee/Escribe en `materias`.

## 6. Módulo de Designaciones (`/assignments`)
Maneja las designaciones (asignación de cargos o materias a docentes).
* **GET `/assignments`**: Obtiene todas las designaciones.
* **GET `/assignments/:id`**: Obtiene una designación específica.
* **POST `/assignments`**: Crea una nueva designación. Si es una suplencia, requiere encriptar el CUIL del reemplazado. Además, genera una **notificación automática** al docente.
* **PATCH `/assignments/:id`**: Modifica una designación.
* **Tablas afectadas**:
  * Lee/Escribe en `designaciones` (Encripta el campo `cuil_profesor_reemplazado`).
  * Escribe en `notificaciones` (trigger automático de aviso).

## 7. Módulo de Notificaciones (`/notifications`)
Sistema de avisos internos para los usuarios (campanita del frontend).
* **GET `/notifications/my-notifications`**: Devuelve las notificaciones del usuario logueado.
* **GET `/notifications/unread-count`**: Devuelve la cantidad de notificaciones sin leer.
* **PATCH `/notifications/:id/read`**: Marca una notificación específica como leída.
* **PATCH `/notifications/mark-all-read`**: Marca todas las notificaciones del usuario como leídas.
* **Tablas afectadas**:
  * Lee/Escribe en `notificaciones`.

## 8. Módulo de Catálogos Dinámicos (`/catalogs`)
Es un módulo genérico e inteligente diseñado para ahorrar código. Administra múltiples tablas simples que sirven para rellenar listas desplegables en el frontend.
La ruta es dinámica: `/catalogs/{nombre_del_catalogo}`

* **Endpoints soportados para CUALQUIER catálogo**:
  * **GET** `/catalogs/{nombre}`
  * **GET** `/catalogs/{nombre}/:id`
  * **POST** `/catalogs/{nombre}`
  * **PATCH** `/catalogs/{nombre}/:id`
  * **DELETE** `/catalogs/{nombre}/:id`

* **Catálogos disponibles y sus tablas correspondientes en la Base de Datos**:
  * `orientacion` ➔ Tabla `orientaciones`
  * `cursoSeccion` ➔ Tabla `cursos_secciones`
  * `situacionRevistaDocente` ➔ Tabla `situacion_revista_docentes`
  * `estadoAlumno` ➔ Tabla `estado_alumnos`
  * `motivoBajaAlumno` ➔ Tabla `motivo_baja_alumnos`
  * `condicionMateria` ➔ Tabla `condicion_materias`
  * `causaInasistenciaAlumnos` ➔ Tabla `causa_inasistencia_alumnos`
  * `motivoInasistenciasDocentes` ➔ Tabla `motivo_inasistencias_docentes`
  * `calendarioAcademico` ➔ Tabla `calendario_academico`

---

*Documento generado automáticamente para reflejar el estado actual de la API del proyecto.*
