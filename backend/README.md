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
- **Seguridad y Criptografía:** Encriptación bidireccional AES-256 para datos sensibles del personal y alumnos (DNI, CUIL, correos, domicilios).
- **Control de Asistencia Avanzado:** Registro de ausentismos, inasistencias docentes (con motivos predefinidos) y estado de los cursos.
- **Módulo de Notificaciones y Alertas:** Sistema de avisos automatizados (CronJobs) y alertas configurables por email y panel web (ej. recordatorio de carga de notas o inasistencias).
- **Trazabilidad y Auditoría:** Registro detallado en el `historial_cambios` de cada acción realizada en la plataforma, permitiendo rastrear quién hizo qué y cuándo.
- **Gestión Documental Estratégica:** Carga y manejo seguro de firmas digitales e imágenes institucionales.

---

## 🛠️ Stack Tecnológico

- **Framework:** [NestJS](https://nestjs.com/) (Node.js con TypeScript)
- **Base de Datos:** PostgreSQL
- **ORM:** [Prisma ORM](https://www.prisma.io/)
- **Autenticación:** JWT (JSON Web Tokens)
- **Encriptación:** Bcrypt (contraseñas) y AES-256-CBC (datos personales)
- **Correos:** Nodemailer
- **Gestor de Tareas/Cron:** NestJS Schedule

---

## 🗄️ Arquitectura de la Base de Datos

La base de datos relacional está optimizada para la integridad académica y la seguridad del usuario. A continuación, se presenta un diagrama Entidad-Relación simplificado de los módulos principales:

```mermaid
erDiagram
    %% Gestión de Usuarios y Personal
    USUARIO {
        int id_usuario PK
        string username
        string password_hash
        int id_rol FK
        int id_personal FK
        boolean activo
    }
    PERSONAL_DOCENTE {
        int id_personal PK
        string dni "ENCRIPTADO"
        string cuil "ENCRIPTADO"
        string nombre
        string apellido
        string mail_abc "ENCRIPTADO"
    }
    ROL {
        int id_rol PK
        string nombre
    }
    
    %% Gestión Académica
    ALUMNO {
        int id_alumno PK
        string dni "ENCRIPTADO"
        string nombre
        string apellido
    }
    MATERIA {
        int id_materia PK
        string materia_nombre
        string area
        int anio
        int id_orientacion FK
    }
    CURSO_SECCION {
        int id_curso_seccion PK
        string curso
        string seccion
        string turno
    }
    
    %% Operaciones Diarias
    DESIGNACION {
        int id_designacion PK
        int id_personal FK
        int id_materia FK
        date fecha_posesion
    }
    CURSADA {
        int id_cursada PK
        int id_alumno FK
        int id_curso_seccion FK
    }
    NOTIFICACION {
        int id_notificacion PK
        string titulo
        string mensaje
        int id_usuario FK
        boolean leida
    }

    %% Relaciones
    USUARIO ||--o| PERSONAL_DOCENTE : "tiene"
    USUARIO }o--|| ROL : "posee"
    DESIGNACION }o--|| PERSONAL_DOCENTE : "asignada a"
    DESIGNACION }o--|| MATERIA : "imparte"
    CURSADA }o--|| ALUMNO : "inscripto"
    CURSADA }o--|| CURSO_SECCION : "pertenece"
    NOTIFICACION }o--o| USUARIO : "recibe"
```

---

## 🚀 Instalación y Despliegue

### Requisitos Previos
- [Node.js](https://nodejs.org/en/) (v18 o superior)
- [PostgreSQL](https://www.postgresql.org/) (v14 o superior)

### Pasos de Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Modularis/backend
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```

3. **Configurar las Variables de Entorno**
   Renombra el archivo `.env.example` a `.env` y configura los accesos a tu base de datos y credenciales criptográficas:
   ```env
   # Base de Datos
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/modularis_db?schema=public"
   
   # JWT & Encriptación
   JWT_SECRET="super_secret_jwt"
   ENCRYPTION_KEY="llave_de_32_caracteres_exactos_!"
   ENCRYPTION_IV="vector_de_16_caracteres_!"
   
   # SMTP Correo
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="tucorreo@gmail.com"
   SMTP_PASS="tu_contraseña_de_aplicacion"
   ```

4. **Preparar la Base de Datos**
   Ejecuta las migraciones/esquema y la semilla inicial (cargará orientaciones, roles, materias y permisos básicos):
   ```bash
   npx prisma generate
   npm run prisma:seed
   ```
   *(Nota: Asegúrate de crear a los administradores manualmente siguiendo la guía interna de seguridad).*

5. **Iniciar el Servidor**
   ```bash
   # Desarrollo
   npm run start:dev

   # Producción
   npm run build
   npm run start:prod
   ```

---

## 🛡️ Seguridad y Buenas Prácticas

- **Cifrado en Reposo:** Las consultas de inserción y recuperación pasan por un `CryptoInterceptor` a nivel global. Un atacante con acceso al volcado SQL no podrá leer la información privada de los docentes o alumnos.
- **Control de Acceso basado en Roles (RBAC):** Múltiples Guardias (`AuthGuard`, `PermissionsGuard`) evalúan dinámicamente si el token posee el rol y permisos requeridos para la ruta específica.
- **Filtros de Subida Seguros:** Se utiliza `Multer` para restringir el tamaño y el formato (solo imágenes) al gestionar logos e identidades visuales institucionales.

---

> Creado con ❤️ para potenciar la educación de jóvenes y adultos en entornos CENS.
