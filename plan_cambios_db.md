# Plan de Implementación: Refactorización de Base de Datos

Este documento detalla los pasos necesarios para implementar los cambios solicitados en la base de datos y cómo esto impactará en el backend. 

## Objetivo

1.  **Consolidar Personal y Docentes**: Crear una única tabla `personal_docente` que reemplace a `profesores` y centralice los datos personales (incluyendo `dni`, `nombre`, `apellido` que antes estaban en `usuarios`). Todas las relaciones partirán de aquí.
2.  **Ajustar Designaciones**: Vincular las designaciones al nuevo `id_personal`, manteniendo el requerimiento estricto del `cupof` ya que todo el personal docente (profesores, directivos, preceptores) debe tener uno asociado.
3.  **Refactorizar Calificaciones**: Cambiar el texto libre de `condicion_materia` por una tabla paramétrica `condicion_materia` y agregar el campo `nota_final`.
4.  **Superusuario Oculto**: Crear un usuario especial de sistema (para el programador) que no esté vinculado a un `personal_docente` y que no sea visible en las listas de usuarios finales.

## ⚠️ Preguntas Abiertas

**Sobre `nota_final`**: ¿Debería ser un tipo numérico (`DECIMAL`/`INTEGER`) o de texto (`VARCHAR`) para soportar letras como "S/CALIFICAR"? (Asumiré `VARCHAR` como el resto de las notas).

**Sobre Asistencia**: ¿Deseas llevar el registro de asistencia de forma **general/diaria** por alumno (una sola falta al día) o es por **materia/hora** (faltar a Matemática pero asistir a Lengua)? En el plan asumí que es un registro general diario.
SÍ, ES UN REGISTRO GENERA DIARIO
---

## Cambios Propuestos

### 1. Base de Datos (`database/schema.sql` y `prisma/schema.prisma`)

#### [NEW / MODIFY] Tabla `personal_docente` (Reemplaza a `profesores`)
- **Renombrar** `profesores` a `personal_docente`.
- **Campos**: `id_personal` (PK, reemplaza a `id_profesor`), `dni`, `nombre`, `apellido`, `cuil`, `fecha_nacimiento`, `direccion`, `localidad`, `distrito`, `mail_abc`, `mail_personal`, `telefono`, `titulo_habilitante`, `titulo_docente`, `activo`.
- **Restricciones**: Agregar `UNIQUE(dni)` y `UNIQUE(cuil)`.
- **Encriptación**: Se deben almacenar encriptados los campos: `cuil`, `fecha_nacimiento`, `direccion`, `localidad`, `mail_personal`, `mail_abc` y `telefono`. (todos deben ser varchar y de un tamaño adecuado para que entren encriptados)

#### [MODIFY] Tabla `alumnos`
- **Agregar**: `cuil`
- **Restricciones**: Asegurar que el campo `dni` y `cuil` tenga el constraint `UNIQUE` (deber ser varchar y de un tamaño adecuado para que entre encriptado)
- **Encriptación**: Se deben almacenar encriptados los campos: `dni` y `cuil`. (deber ser varchar y de un tamaño adecuado para que entren encriptados)

#### [MODIFY] Tabla `usuarios`
- **Eliminar**: `dni`, `nombre`, `apellido`, `id_profesor`.
- **Agregar**: `id_personal` (Foreign Key hacia `personal_docente`). Este campo debe ser **opcional (NULLable)** para permitir la existencia del superusuario.
- **Agregar**: `username` (VARCHAR, UNIQUE). Como el DNI ya no estará en usuarios y el superusuario no tiene DNI de docente, usaremos este campo para el login (para los docentes el username será igual a su DNI).

#### [MODIFY] Tabla `designaciones`
- **Eliminar**: `id_profesor`.
- **Agregar**: `id_personal` (Foreign Key hacia `personal_docente`).
- **Modificar Relación con Materias**: Agregar `id_materia` (Foreign Key hacia `materias`). El campo `cupof` actual permanece, pero deja de ser FK.
- **Encriptación**: El campo `cuil_profesor_reemplazado` debe almacenarse encriptado. (deber ser varchar y de un tamaño adecuado para que entre encriptado)

#### [MODIFY] Tabla `materias_cupof`
- **Renombrar**: Pasa a llamarse `materias`.
- **Primary Key**: El campo `cupof` deja de ser PK y se reemplaza por una nueva PK llamada `id_materia` (SERIAL).

#### [NEW] Nueva tabla paramétrica `condicion_materia`
- **Campos**: `id_condicion` (PK), `nombre` (exclusivamente APROBADO o PENDIENTE), `detalle`.

#### [MODIFY] Tabla `cursadas_notas`
- **Eliminar**: `condicion_materia` (VARCHAR).
- **Modificar Relación**: Renombrar o reemplazar el campo `cupof` por `id_materia` (Foreign Key hacia `materias`).
- **Agregar**: `id_condicion_materia` (Foreign Key hacia `condicion_materia`).
- **Agregar**: `nota_final` (VARCHAR).

#### [NEW] Nueva tabla `datos_institucion`
- **Descripción**: Configuración y datos de la escuela (suele ser un único registro).
- **Campos con tipos corregidos**: 
  - `id_datos` (PK, SERIAL)
  - `nombre_completo` (VARCHAR(150))
  - `nombre_siglas` (VARCHAR(50))
  - `numero` (VARCHAR(50)) - *Usamos Varchar para tolerar formatos como "N° 1".*
  - `descripcion` (TEXT o VARCHAR(255))
  - `direccion` (VARCHAR(200))
  - `localidad` (VARCHAR(100))
  - `distrito` (VARCHAR(100))
  - `mail` (VARCHAR(120))
  - `icono` (VARCHAR(255)) - *Guardará la URL o ruta del archivo.*
  - `imagen_sello` (VARCHAR(255)) - *Guardará la URL o ruta del archivo.*
  - **[Sugerencia]** `telefono` (VARCHAR(50))
  - **[Sugerencia]** `cue` (VARCHAR(20))

#### [NEW] Nueva tabla `historial_cambios` (Auditoría)
- **Descripción**: Registro (Log) de quién hizo qué y cuándo.
- **Campos con tipos corregidos**: 
  - `id_historial` (PK, SERIAL)
  - `fecha` (TIMESTAMP o DATETIME) - *Reemplazado el Varchar(100) sugerido en la imagen para poder ordenar por fechas en la BD.*
  - `modulo` (VARCHAR(100)) - *Ej: "Usuarios", "Calificaciones".*
  - `detalle` (TEXT o VARCHAR(500))
  - `id_usuario` (INTEGER) - **Foreign Key** hacia `usuarios(id_usuario)`.
  - **[Sugerencia]** `accion` (VARCHAR(50)) - *Ej: "CREATE", "UPDATE", "DELETE".*

#### [NEW] Nueva tabla `estado_asistencia_curso` (Registro de carga)
- **Descripción**: Responde a tu excelente sugerencia de optimización. Para no guardar miles de registros de "Presente", esta tabla marcará que el preceptor **ya tomó lista** en un curso y día específicos. Si un alumno no está en la tabla `inasistencia_alumnos`, el sistema asume nativamente que estuvo presente.
- **Campos**: `id_estado` (PK), `id_curso_seccion` (FK hacia `curso_seccion`), `fecha` (DATE), `id_usuario` (FK hacia el usuario preceptor que tomó lista).
*(Respuesta a tu pregunta: Sí, exactamente. Relacionamos la asistencia con `id_curso_seccion` ya que la lista se toma por curso/división).*

#### [NEW] Nueva tabla `inasistencia_alumnos`
- **Descripción**: Solo se insertan registros aquí si el alumno faltó. Mejora radicalmente la performance y el uso de disco.
- **Campos**:
  - `id_inasistencia` (PK, SERIAL)
  - `id_alumno` (INTEGER) - **Foreign Key** hacia `alumnos`.
  - `fecha` (DATE)
  - `id_causa` (INTEGER) - **Foreign Key** hacia `causa_inasistencia_alumnos`. (Obligatorio).
  - `observaciones` (TEXT, NULLable)
- **Restricciones**: `UNIQUE(id_alumno, fecha)`.

#### [NEW] Nueva tabla `inasistencias_diarias_docentes`
- **Descripción**: Registro de inasistencias del personal docente. Indispensable para que el Directivo pueda llenar el S.E.T. 4.
- **Campos**: `id_inasistencia` (PK, SERIAL), `id_personal` (FK hacia `personal_docente`), `fecha` (DATE), `id_motivo` (FK hacia `motivo_inasistencias_docentes`), `observaciones` (TEXT, NULLable).

#### [NEW] Nueva tabla `motivo_inasistencias_docentes`
- **Descripción**: Lista de motivos de inasistencias del personal docente.(ej: Enfermedad, causas privadas, otras causas, injustificadas, que en la sumatoria a fin de año sirven para completar la tabla inasistencias_docentes para el SET 4)
- **Campos**: `id_motivo` (PK, SERIAL), `nombre` (VARCHAR), `detalle` (TEXT, NULLable).

#### [NEW] Nueva tabla `calendario_academico`
- **Descripción**: Hitos del año escolar para automatizar validaciones (cierres de cuatrimestre, fechas límite).
- **Campos**: `id_calendario` (PK), `evento` (VARCHAR), `fecha_inicio` (DATE), `fecha_fin` (DATE, NULLable).

#### [NEW] Nueva tabla `notificaciones`
- **Descripción**: Almacena las alertas del sistema (Cierre de notas, ceses de suplentes, etc).
- **Campos**:
  - `id_notificacion` (PK, SERIAL)
  - `id_usuario` (INTEGER, NULLable) - Destinatario específico.
  - `id_rol` (INTEGER, NULLable) - Destinatarios por rol (ej. "A todos los preceptores").
  - `titulo` (VARCHAR(150)), `mensaje` (TEXT), `tipo` (VARCHAR(50) ej: WARNING, DANGER, INFO).
  - `leida` (BOOLEAN) default `false`, `fecha_creacion` (TIMESTAMP).
---

### 2. Semillas / Seeders (`backend/prisma/seed.ts`)

#### [MODIFY] `seed.ts`
- Modificar la creación de roles para incluir un rol `SUPERADMIN` (o similar) con permisos totales.
- Crear el **Superusuario** (con `username` secreto y `id_personal = null`).
- Modificar la creación de usuarios normales (docentes/directivos) para que primero cree un registro en `PersonalDocente` y luego asocie su `id_personal` al `Usuario`, usando su DNI como `username`, de manera inicial, pero puede ser modificado a otro username que elija el usuario en el futuro.
- Agregar un seeder para insertar los motivos de baja de alumnos en `motivo_baja_alumnos`: 'TRASLADO', 'LIBERTAD', 'BAJA VOLUNTARIA', 'FALTAS ACUMULADAS', 'MUERTE'.
- Agregar un seeder para la tabla `causa_inasistencia_alumnos` ('VISITA', 'COMPARENDO', 'ENFERMEDAD', 'INJUSTIFICADA').
- Agregar un seeder para insertar exclusivamente dos condiciones en `condicion_materia` ('APROBADO', 'PENDIENTE').

---

### 3. Backend (Controladores, Servicios y DTOs)

#### [MODIFY] Módulo Auth (`src/auth/`)
- `auth.service.ts`: El método `login` actualmente busca al usuario por `dni`. Ahora deberá buscar por el nuevo campo `username` directamente en la tabla `usuarios`.
- El payload del JWT y la respuesta del login deberán extraer el `nombre` y `apellido` desde la relación `personal_docente` (si existe, para el superusuario puede devolver "Super Admin").

#### [MODIFY] Módulo Users (`src/users/`)
- `dto/create-user.dto.ts`: Ajustar para enviar `username` (o generarlo automáticamente desde el DNI) e `id_personal`.
- `users.service.ts`: Actualizar las consultas `findMany` y `findOne` para hacer un `include` de `personal_docente`. **Filtrar** en los listados para que el superusuario (ej. donde `id_personal == null` o por rol) no sea devuelto al frontend.

#### [MODIFY] Módulo Teachers/Personal (`src/teachers/`)
- **Renombrar/Refactorizar**: Idealmente renombrar el módulo de `teachers` a `personal` o adaptar el servicio para que opere sobre `PersonalDocente`.
- `dto/create-assignment.dto.ts`: Asegurar que el campo `cupof` siga siendo **obligatorio** (`@IsNotEmpty()`), ya que no hay personal auxiliar contemplado en esta versión. Adaptar también para recibir el nuevo `id_materia`.
- **Validación DNI/CUIL (Protección Backend)**: En el método de creación/edición, antes de insertar en Prisma, verificar que el `dni` o `cuil` no existan en otro registro. Si existen, lanzar un `ConflictException` (HTTP 409) para evitar un error duro de base de datos.
- **Encriptación**: Integrar el `crypto.service.ts` para encriptar los datos personales sensibles antes de enviar a Prisma, y desencriptarlos al leer. Aplicar esto a: `cuil`, `fecha_nacimiento`, `direccion`, `localidad`, `mail_personal`, `mail_abc`, `telefono` (y `cuil_profesor_reemplazado` en designaciones).

#### [MODIFY] Módulo Students (`src/students/`)
- **Validación DNI/CUIL**: Misma lógica que en docentes, chequear previamente con Prisma si existe el DNI/CUIL y lanzar `ConflictException` para evitar duplicados, mostrando un mensaje claro al usuario.

#### [MODIFY] Módulo Grades (`src/grades/`)
- `dto/create-grade.dto.ts` y `update-grade.dto.ts`: Reemplazar `condicion_materia` (String) por `id_condicion_materia` (Number). Agregar `nota_final`.
- `grades.service.ts`: Actualizar la lógica de negocio para que el `id_condicion_materia` se asigne estrictamente bajo estas reglas:
  - **APROBADO**: Sólo si ambas notas cuatrimestrales son numéricas y >= 4. Si se asigna APROBADO, el sistema debe exigir como obligatorio completar Mes y Año de acreditación.
  - **PENDIENTE**: Se asigna cuando el alumno no alcanza la calificación numérica de 4 en ambos cuatrimestres. Si es PENDIENTE, se deben limpiar o ignorar por completo los campos de mes y año de acreditación final.

#### [NEW] Módulo Institution / Config (`src/institution/`)
- Crear módulo para gestionar `datos_institucion`.
- **Lógica**: Solo existirá un registro. El método `GET` lo devuelve. El método `PATCH` o `PUT` actualiza el registro ID=1. Debe incluir manejo de carga de archivos (Multer) para guardar el `icono` y el `imagen_sello`.

#### [NEW] Módulo Audit / History (`src/audit/`)
- Crear módulo para exponer el `historial_cambios` (vía `GET`) a los administradores.
- **Lógica Backend**: Implementar un **Interceptor Global** o **Subscriber** que registre 100% automático los cambios, **PERO aplicando un filtro** para interceptar solo ciertas rutas/módulos importantes:
  - **INCLUIR**: Configuración, Usuarios/Roles, Designaciones, Calificaciones, Altas/Bajas, Evaluación.
  - **INCLUIR ASISTENCIAS**: Solo registrar en el historial las inasistencias con sus causas involucradas (cuando se agregan o se borran), ignorando la marca general diaria de "toma de lista".
  - **EXCLUIR**: Materias, Años, Turnos, Horarios, Cuatrimestres, Grupos, Cursos, Datos personales del alumno.

#### [NEW] Módulo Attendance (`src/attendance/`)
- Crear módulo para gestionar la asistencia diaria de los alumnos.
- **Lógica Backend**:
  - `POST /attendance/bulk`: Guarda el registro en `estado_asistencia_curso` y solo inserta en `inasistencia_alumnos` a los que faltaron.
  - `GET /attendance/calendar`: Cruza la tabla de estado (días tomados) con las inasistencias para construir la matriz mensual en el frontend.

#### [NEW] Módulo Notifications & Alertas (`src/notifications/`)
- **Lógica Automática (Cron Jobs - `@nestjs/schedule`)**: Procesos que corren todos los días a medianoche:
  - Leer `calendario_academico`: 7 días y 24hs antes del límite de notas, generar notificación a Profesores faltantes.
  - Leer `designaciones`: 30 días antes de `fecha_cese`, notificar a Directivos/Secretarios.
  - Sumar `inasistencia_alumnos` y generar alerta a Preceptores si se alcanza el límite.
  - Alerta anual de confección S.E.T. 4 para Directivos analizando inasistencias de docentes (Recordatorio para cargar faltas de los profes y generar la planilla).
- **Lógica Reactiva (Eventos - `@nestjs/event-emitter`)**:
  - Al crear `designacion`: Disparar alerta "Toma de posesión" al profesor.
  - Al cerrarse todas las actas de un curso: Disparar alerta "Impresión de Boletines" a Preceptores.
  - Al atrapar errores críticos (ej. fallo criptográfico, registros huérfanos): Notificar inmediatamente al Superusuario.
  - Validaciones en tiempo real: Las alertas de "inconsistencia normativa" al tipear se manejan con validaciones DTO y BadRequestException devueltas al frontend al momento.

## Plan de Verificación

### Pruebas Manuales
1.  **Migraciones**: Ejecutar `npx prisma db push` o generar migraciones.
2.  **Seeders**: Ejecutar `npx prisma db seed` y verificar que el usuario admin y las condiciones se creen correctamente.
3.  **Login**: Iniciar sesión para validar la extracción de datos de la nueva tabla.
4.  **Designaciones**: Crear designaciones asegurando que el sistema requiere estrictamente el `cupof` asociado al `id_personal`.
5.  **Grades**: Cargar una calificación asegurando el funcionamiento correcto de `id_condicion_materia` y `nota_final`.
