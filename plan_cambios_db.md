# Plan de Implementación: Refactorización de Base de Datos

Este documento detalla los pasos necesarios para implementar los cambios solicitados en la base de datos y cómo esto impactará en el backend. 

## Objetivo

1.  **Refactorizar Usuarios y Personal**: Mover los datos personales (`dni`, `nombre`, `apellido`) de la tabla `usuarios` a una nueva tabla `personal_planta`.
2.  **Refactorizar Calificaciones**: Cambiar el texto libre de `condicion_materia` por una tabla paramétrica `condicion_materia` y agregar el campo `nota_final`.

## ⚠️ Preguntas Abiertas

**Sobre la tabla `profesores`**: Mencionaste crear `personal_planta` con los mismos campos que `profesores`. ¿La idea es que `personal_planta` **reemplace completamente** a la tabla `profesores`, o ambas deben coexistir? (Asumiré en el plan que la reemplaza para simplificar entidades, pero por favor confírmalo).

**Sobre `nota_final`**: ¿Debería ser un tipo numérico (`DECIMAL`/`INTEGER`) o de texto (`VARCHAR`) para soportar letras como "S/CALIFICAR"? (Asumiré `VARCHAR` como el resto de las notas).

---

## Cambios Propuestos

### 1. Base de Datos (`database/schema.sql` y `prisma/schema.prisma`)

#### [NEW] Nueva tabla `personal_planta`
- **Campos**: `id_personal` (PK), `dni`, `nombre`, `apellido`, `cuil`, `fecha_nacimiento`, `direccion`, `localidad`, `distrito`, `mail_abc`, `mail_personal`, `telefono`, `titulo_habilitante`, `titulo_docente`, `activo`.

#### [MODIFY] Tabla `usuarios`
- **Eliminar**: `dni`, `nombre`, `apellido`, `id_profesor`.
- **Agregar**: `id_personal` (Foreign Key hacia `personal_planta`).

#### [NEW] Nueva tabla paramétrica `condicion_materia`
- **Campos**: `id_condicion` (PK), `nombre` (ej. APROBADO, PENDIENTE), `detalle`.

#### [MODIFY] Tabla `cursadas_notas`
- **Eliminar**: `condicion_materia` (VARCHAR).
- **Agregar**: `id_condicion_materia` (Foreign Key).
- **Agregar**: `nota_final` (VARCHAR).

---

### 2. Semillas / Seeders (`backend/prisma/seed.ts`)

#### [MODIFY] `seed.ts`
- Modificar la creación del usuario administrador para que primero cree un registro en `PersonalPlanta` y luego asocie su `id_personal` al `Usuario`.
- Agregar un seeder para insertar las condiciones básicas en `condicion_materia` (ej: 1: 'APROBADO', 2: 'PENDIENTE', 3: 'REPROBADO').

---

### 3. Backend (Controladores, Servicios y DTOs)

#### [MODIFY] Módulo Auth (`src/auth/`)
- `auth.service.ts`: El método `login` actualmente busca al usuario por `dni`. Como el `dni` ahora estará en `personal_planta`, la consulta de Prisma deberá buscar mediante una relación (`where: { personal: { dni: loginDto.dni } }`).
- El payload del JWT y la respuesta del login deberán extraer el `nombre` y `apellido` desde la relación `personal_planta`.

#### [MODIFY] Módulo Users (`src/users/`)
- `dto/create-user.dto.ts`: Ajustar para que en lugar de enviar `id_profesor`, se envíe `id_personal` (o se cree el personal en cascada).
- `users.service.ts`: Actualizar las consultas `findMany` y `findOne` para hacer un `include` de `personal_planta` y poder devolver el nombre y DNI del usuario.

#### [MODIFY] Módulo Grades (`src/grades/`)
- `dto/create-grade.dto.ts` y `update-grade.dto.ts`: Reemplazar `condicion_materia` (String) por `id_condicion_materia` (Number). Agregar `nota_final`.
- `grades.service.ts`: Actualizar la lógica de negocio (las reglas de "si las notas son > 4, entonces aprueba"). En lugar de setear `data.condicion_materia = 'APROBADO'`, deberá asignar el `id_condicion_materia` que corresponda al estado "APROBADO".

## Plan de Verificación

### Pruebas Manuales
1.  **Migraciones**: Ejecutar `npx prisma db push` o generar migraciones para asegurar que la base de datos aplica los cambios sin pérdida de integridad.
2.  **Seeders**: Ejecutar `npx prisma db seed` y verificar que el usuario admin y las condiciones se creen correctamente.
3.  **Login**: Intentar iniciar sesión con un usuario existente y verificar que el token JWT contiene los datos correctos del usuario extraídos de `personal_planta`.
4.  **Grades**: Cargar una calificación mediante Swagger (con `nota_final` y `id_condicion_materia`) y verificar que la regla de autocalculado funcione correctamente.
