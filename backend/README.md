<p align="center">
  <h1 align="center">🏫 Modularis - Backend API</h1>
</p>

<p align="center">
  <strong>Sistema integral de gestión escolar diseñado específicamente para Centros Educativos de Nivel Secundario (CENS).</strong>
</p>

---

## 📖 Sobre el Proyecto

**Modularis** es una plataforma moderna y escalable concebida para digitalizar, agilizar y asegurar los procesos administrativos y académicos de las instituciones educativas. 

Este repositorio contiene la **API RESTful (Backend)** construida con tecnologías de vanguardia que soporta toda la lógica de negocio, reglas académicas, sistemas de notificaciones, y auditorías estrictas necesarias para la gestión docente y del alumnado.

### 🌟 Características Principales

- **Gestión Académica Integral:** Control de currículos, orientaciones, cursos, materias y correlatividades.
- **Seguridad y Criptografía:** Encriptación bidireccional AES-256 para datos sensibles del personal y alumnos (DNI, CUIL, correos, domicilios, etc.).
- **Control de Asistencia Avanzado:** Registro de ausentismos, inasistencias docentes (con motivos predefinidos) y de alumnos (justificadas, injustificadas, etc).
- **Módulo de Notificaciones y Alertas:** Sistema de avisos automatizados (CronJobs) y alertas configurables por email y panel web (ej. recordatorio de carga de notas o inasistencias).
- **Trazabilidad y Auditoría:** Interceptores automáticos registran en el `historial_cambios` cada acción de escritura realizada en la plataforma, rastreando quién hizo qué y cuándo.
- **Gestión Documental Estratégica:** Subida segura de imágenes institucionales y de firmas digitales (usando `Multer`).

---

## 🛠️ Stack Tecnológico

- **Framework:** [NestJS](https://nestjs.com/) (Node.js v18+ con TypeScript)
- **Base de Datos:** PostgreSQL v14+
- **ORM:** [Prisma ORM](https://www.prisma.io/)
- **Autenticación y Autorización:** JWT, RBAC (Role-Based Access Control) y ABAC adaptado a Permisos.
- **Seguridad de Datos:** `bcrypt` para contraseñas, Módulo Crypto custom con `AES-256-CBC` para PII (Personal Identifiable Information).
- **Notificaciones por Email:** `@nestjs-modules/mailer` con `Nodemailer`
- **Gestor de Tareas:** `@nestjs/schedule` (CronJobs)

---

## 📂 Arquitectura de Módulos (NestJS)

El backend está construido bajo una arquitectura altamente modular.

| Módulo | Descripción |
|---|---|
| **`Academics`** | Gestiona Orientaciones, Cursos, Secciones y Materias. |
| **`Assignments`** | Administra las Designaciones docentes (qué profesor dicta qué materia y cuándo). |
| **`Attendance`** | Control masivo e individual de asistencia para Alumnos y Personal Docente. |
| **`Audit`** | Provee interceptores (`AuditInterceptor`) que registran automáticamente cambios (POST/PATCH/DELETE) en la base de datos. |
| **`Auth`** | Maneja login, emisión de JWT y contiene las guardas (`AuthGuard`, `PermissionsGuard`). |
| **`ConfigAlertas`** | Permite a directivos activar/desactivar cronjobs de notificaciones y cambiar anticipación de avisos. |
| **`Crypto`** | Servicio core que provee encriptación y desencriptación transparente para PII. |
| **`Grades`** | Manejo de Cursadas, notas cuatrimestrales, cierres de actas y condición de la materia. |
| **`Institution`** | Gestión de datos del colegio (CUE, nombre) y subida de Logos y Firmas Directorales. |
| **`Notifications`** | Tareas automatizadas (Cron) y gestión de notificaciones web y correos. |
| **`Students`** | CRUD y gestión académica-administrativa del alumnado. |
| **`Teachers`** | CRUD del Personal Docente (títulos, licencias, situaciones de revista). |
| **`Users`** | Gestión de cuentas de acceso, roles, y permisos de sistema. |

---

## 🗄️ Esquema de Base de Datos (ERD)

La base de datos relacional está optimizada para la integridad académica y la seguridad del usuario. 

```mermaid
erDiagram
    %% Gestión de Seguridad y Usuarios
    USUARIOS {
        int id_usuario PK
        string username
        string password_hash
        int id_rol FK
        int id_personal FK
        boolean activo
    }
    ROLES {
        int id_rol PK
        string nombre
        string descripcion
    }
    PERMISOS {
        int id_permiso PK
        string codigo
        string modulo
        string descripcion
    }
    ROL_PERMISOS {
        int id_rol PK,FK
        int id_permiso PK,FK
    }
    
    %% Gestión de Personal e Institución
    PERSONAL_DOCENTE {
        int id_personal PK
        string dni "AES-256"
        string cuil "AES-256"
        string nombre "AES-256"
        string apellido "AES-256"
        string fecha_nacimiento "AES-256"
        string direccion "AES-256"
        string localidad "AES-256"
        string distrito "AES-256"
        string mail_abc "AES-256"
        string mail_personal "AES-256"
        string telefono "AES-256"
        string titulo_habilitante
        boolean titulo_docente
        boolean activo
    }
    DATOS_INSTITUCION {
        int id_datos PK
        string nombre_completo
        string nombre_siglas
        string numero
        string descripcion
        string direccion
        string localidad
        string distrito
        string mail
        string icono
        string imagen_sello
        string telefono
        string cue
    }
    
    %% Gestión Académica Central
    ALUMNOS {
        int id_alumno PK
        string dni "AES-256"
        string cuil "AES-256"
        string nombre "AES-256"
        string apellido "AES-256"
        string fecha_nacimiento 
        int edad 
        string lugar_nacimiento 
        string nacionalidad 
        string primaria_origen 
        string secundario_incompleto 
        boolean analitico_parcial 
        int id_estado FK
        int id_motivo_baja FK
    }
    MATERIAS {
        int id_materia PK
        string materia_nombre
        string area
        string modulo
        int anio
        int horas_catedra
        int id_orientacion FK
        string codigo_pid
        boolean activo
    }
    CURSO_SECCION {
        int id_curso_seccion PK
        string nombre
        string detalle
    }
    ORIENTACIONES {
        int id_orientacion PK
        string nombre
        string detalle
    }
    CALENDARIO_ACADEMICO {
        int id_calendario PK
        string evento
        date fecha_inicio
        date fecha_fin
    }
    
    %% Operativa: Designaciones, Cursadas y Asistencias
    DESIGNACIONES {
        int id_designacion PK
        int id_personal FK
        int id_materia FK
        string cupof
        int id_curso_seccion FK
        date fecha_posesion
        date fecha_cese
        int id_situacion_revista FK
        string cuil_profesor_reemplazado
        decimal nota_desempeno
        text fundamentacion_baja_nota
    }
    CURSADAS_NOTAS {
        int id_cursada PK
        int id_alumno FK
        int id_materia FK
        int ciclo_lectivo
        string nota_cuat1
        int faltas_cuat1
        string nota_cuat2
        int faltas_cuat2
        id_condicion_materia INTEGER REFERENCES condicion_materia(id_condicion),
        string nota_final
        string mes_acreditacion
        int anio_acreditacion
        text observaciones
    }
    INASISTENCIA_ALUMNOS {
        int id_inasistencia PK
        int id_alumno FK
        date fecha
        int id_causa FK
    }
    INASISTENCIAS_DIARIAS_DOCENTES {
        int id_inasistencia PK
        int id_personal FK
        date fecha
        int id_motivo FK
        text observaciones
    }
    ESTADO_ASISTENCIA_CURSO {
        int id_estado PK
        int id_curso_seccion FK
        date fecha
        int id_usuario FK
    }
    
    %% Catálogos
    ESTADO_ALUMNOS {
        int id_estado PK
        string nombre
        string detalle
    }
    MOTIVO_BAJA_ALUMNOS {
        int id_motivo_baja PK
        string nombre
        string detalle
    }
    SITUACION_REVISTA_DOCENTES {
        int id_situacion_revista PK
        string nombre
        string detalle
    }
    CONDICION_MATERIA {
        int id_condicion PK
        string nombre
        string detalle
    }
    CAUSA_INASISTENCIA_ALUMNOS {
        int id_causa PK
        string nombre
        string detalle
    }
    MOTIVO_INASISTENCIAS_DOCENTES {
        int id_motivo PK
        string nombre
        string detalle
    }

    LIMITES_CALIFICACION_DOCENTES {
        int limite_superior
        int limite_inferior
    }
    LIMITES_CALIFICACION_ALUMNOS {
        int limite_superior
        int limite_inferior
    }
    
    %% Trazabilidad
    HISTORIAL_CAMBIOS {
        int id_historial PK
        timestamp fecha
        string modulo
        string detalle
        int id_usuario FK
    }
    NOTIFICACIONES {
        int id_notificacion PK
        string titulo
        string mensaje
        int id_usuario FK
        int id_rol FK
        tipo string
        fecha_creacion timestamp
        boolean leida
    }
    CONFIGURACION_ALERTAS {
        int id_config PK
        string tipo_alerta
        boolean activa
        jsonb parametros
    }

    %% Relaciones Principales
    USUARIOS ||--o| PERSONAL_DOCENTE : "pertenece a"
    USUARIOS }o--|| ROLES : "posee"
    ROLES ||--o{ ROL_PERMISOS : "tiene"
    PERMISOS ||--o{ ROL_PERMISOS : "asignado a"
    
    DESIGNACIONES }o--|| MATERIAS : "sobre"
    DESIGNACIONES }o--|| PERSONAL_DOCENTE : "asignada a"
    DESIGNACIONES }o--o| SITUACION_REVISTA_DOCENTES : "tiene"
    DESIGNACIONES }o--o| CURSO_SECCION : "curso"
    DESIGNACIONES }o--o| LIMITES_CALIFICACION_DOCENTES : "tiene"
        
    MATERIAS }o--o| ORIENTACIONES : "pertenece"
    
    CURSADAS_NOTAS }o--|| ALUMNOS : "inscripto"
    CURSADAS_NOTAS }o--|| MATERIAS : "cursa"
    CURSADAS_NOTAS }o--o| CONDICION_MATERIA : "condicion"
    
    ALUMNOS }o--o| ESTADO_ALUMNOS : "estado"
    ALUMNOS }o--o| MOTIVO_BAJA_ALUMNOS : "motivo_baja"
    
    INASISTENCIA_ALUMNOS }o--|| ALUMNOS : "registra"
    INASISTENCIA_ALUMNOS }o--|| CAUSA_INASISTENCIA_ALUMNOS : "causa"
    
    INASISTENCIAS_DIARIAS_DOCENTES }o--|| PERSONAL_DOCENTE : "registra"
    INASISTENCIAS_DIARIAS_DOCENTES }o--o| MOTIVO_INASISTENCIAS_DOCENTES : "motivo"
    
    ESTADO_ASISTENCIA_CURSO }o--|| CURSO_SECCION : "sobre"
    ESTADO_ASISTENCIA_CURSO }o--|| USUARIOS : "registrado por"
    
    HISTORIAL_CAMBIOS }o--o| USUARIOS : "realizado por"
    NOTIFICACIONES }o--o| USUARIOS : "recibe"
    NOTIFICACIONES }o--o| ROLES : "dirigido a"
```

---

## 🚀 Instalación y Despliegue

### 1. Clonar el Repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd Modularis/backend
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Copia el archivo `.env.example` a `.env` y configura tus accesos. 

> [!WARNING]
> Las variables `ENCRYPTION_KEY` e `ENCRYPTION_IV` son críticas. Si las pierdes, la base de datos se volverá ilegible. `KEY` requiere exactamente 32 bytes y `IV` exactamente 16 bytes.

```env
# Base de Datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/modularis_db?schema=public"

# JWT & Encriptación
JWT_SECRET="super_secret_jwt"
ENCRYPTION_KEY="llave_de_32_caracteres_exactos_!"
ENCRYPTION_IV="vector_de_16_caracteres_!"

# SMTP Correo (Ej: App Passwords de Gmail)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tucorreo@gmail.com"
SMTP_PASS="tu_contraseña_de_aplicacion"
```

### 4. Preparar la Base de Datos
Carga la estructura en PostgreSQL, sincroniza Prisma y siembra los datos iniciales obligatorios.
```bash
npx prisma generate
npm run prisma:seed
```
*(Para más detalles sobre la creación del Superusuario, refiérase al archivo interno `database/crear_usuarios_maestros.sql` que se mantiene ignorado en Git).*

### 5. Iniciar el Servidor
```bash
# Desarrollo con Auto-Reload
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📜 Licencia
Este proyecto es de uso exclusivo y cerrado para la institución educativa asignada. Todos los derechos reservados.
