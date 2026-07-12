# 🛡️ Plan de Implementación: Sistema de Accesos y Roles (RBAC)

## 1. Objetivo
Implementar un sistema de Control de Acceso Basado en Roles (RBAC) dinámico. Esto permitirá que el Director administre qué puede hacer cada tipo de usuario en el sistema, cumpliendo con las reglas de negocio solicitadas (Profesor = Notas, Preceptor = Asistencia, Director = Control Total).

## 2. Diseño de la Base de Datos (Nuevas Tablas)

Para lograr que los accesos sean dinámicos y escalables en el futuro (ej. crear rol "Vicedirector"), utilizaremos 4 tablas clave:

### `usuarios`
Almacena las credenciales de acceso y los datos básicos para quienes no son profesores.
- `id_usuario` (PK)
- `dni` (Único) -> **Se utilizará para el inicio de sesión**.
- `password_hash` (Contraseña encriptada)
- `nombre` (Para identificar al director/preceptor)
- `apellido` (Para identificar al director/preceptor)
- `id_rol` (FK a `roles`)
- `id_profesor` (FK opcional a `profesores`. Si el usuario es un profesor, se enlaza aquí. Si es Director o Preceptor, este campo queda en `null` y usamos el nombre/apellido de esta misma tabla).
- `activo` (Boolean)

### `roles`
Almacena los niveles de jerarquía.
- `id_rol` (PK)
- `nombre` (Ej: 'DIRECTOR', 'PRECEPTOR', 'PROFESOR')
- `descripcion`

### `permisos`
Catálogo estático de acciones posibles en el sistema.
- `id_permiso` (PK)
- `codigo` (Ej: `MODIFICAR_CALIFICACIONES`, `MODIFICAR_ASISTENCIA`, `GESTIONAR_ROLES`, `GESTIONAR_USUARIOS`)
- `modulo` (Ej: 'ACADEMICO', 'CONFIGURACION')
- `descripcion`

### `rol_permisos` (Tabla Intermedia)
Define qué permisos tiene cada rol de manera dinámica.
- `id_rol` (FK)
- `id_permiso` (FK)
- *(Primary Key compuesta por ambos campos)*

---

## 3. Lógica de Negocio y Seguridad (Backend NestJS)

1. **Autenticación (JWT):** 
   - Al iniciar sesión con el **DNI** y la contraseña, el backend verificará las credenciales y devolverá un token JWT.
   - El JWT contendrá el `id_usuario`, `id_rol` y una lista de los `códigos de permisos` que posee.

2. **Validación de Rutas (Guards):**
   - Se creará un decorador personalizado `@RequirePermissions('MODIFICAR_CALIFICACIONES')`.
   - Cualquier endpoint que modifique notas estará protegido por este decorador.

3. **Módulo de Gestión de Accesos (Solo Director):**
   - Endpoints para **CRUD de Roles**.
   - Endpoints para **Asignación de Permisos**.
   - Endpoints para **Gestión de Usuarios**.

---

## 4. Pasos de Implementación Propuestos

1. **Paso 1: Actualizar Esquema (Base de Datos)**
   - Agregar las tablas a `database/schema.sql`.
   - Agregar los modelos a `backend/prisma/schema.prisma`.
   - Crear semillas (`seeds.sql` y `seed.ts`) con los roles base, los permisos y el usuario Director super-admin.

2. **Paso 2: Desarrollar Módulo Auth y RBAC (NestJS)**
   - Instalar dependencias JWT y encriptación de contraseñas (`bcrypt`).
   - Crear el `AuthGuard` y `PermissionsGuard`.
   - Implementar el decorador `@RequirePermissions()`.

3. **Paso 3: Desarrollar Módulo de Usuarios**
   - Endpoints para listar, crear, modificar y desactivar usuarios y roles.

4. **Paso 4: Actualizar Reglas de Negocio en `business_rules.md`**
   - Documentar formalmente la matriz de accesos y el nuevo esquema de seguridad.

> [!NOTE]
> **Plan Aprobado:** El diseño ha sido validado. El inicio de sesión será mediante **DNI** y la tabla `usuarios` absorberá los nombres y apellidos de aquellos empleados que no son docentes (Director, Preceptores), mientras que los profesores seguirán vinculados mediante el campo opcional `id_profesor`.