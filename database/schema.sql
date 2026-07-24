-- ===========================================================================
-- 1. TABLAS MAESTRAS (Catálogos Independientes)
-- ===========================================================================

CREATE TABLE orientaciones (
    id_orientacion SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    detalle VARCHAR(200)
);

CREATE TABLE curso_seccion (
    id_curso_seccion SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    detalle VARCHAR(200)
);

CREATE TABLE situacion_revista_docentes (
    id_situacion_revista SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    detalle VARCHAR(200)
);

CREATE TABLE estado_alumnos (
    id_estado SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    detalle VARCHAR(200)
);

CREATE TABLE motivo_baja_alumnos (
    id_motivo_baja SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    detalle VARCHAR(200)
);

CREATE TABLE condicion_materia (
    id_condicion SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    detalle VARCHAR(200)
);

CREATE TABLE causa_inasistencia_alumnos (
    id_causa SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    detalle TEXT
);

CREATE TABLE motivo_inasistencias_docentes (
    id_motivo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    detalle TEXT
);

CREATE TABLE limites_calificacion_alumnos (
    limite_superior INTEGER NOT NULL,
    limite_inferior INTEGER NOT NULL
);

CREATE TABLE limites_calificacion_docentes (
    limite_superior INTEGER NOT NULL,
    limite_inferior INTEGER NOT NULL
);

-- ===========================================================================
-- 1.5. SISTEMA DE ROLES Y PERMISOS (RBAC)
-- ===========================================================================

CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200)
);

CREATE TABLE permisos (
    id_permiso SERIAL PRIMARY KEY,
    codigo VARCHAR(100) NOT NULL UNIQUE,
    modulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200)
);

CREATE TABLE rol_permisos (
    id_rol INTEGER REFERENCES roles(id_rol) ON DELETE CASCADE,
    id_permiso INTEGER REFERENCES permisos(id_permiso) ON DELETE CASCADE,
    PRIMARY KEY (id_rol, id_permiso)
);

-- ===========================================================================
-- 2. ENTIDADES PRINCIPALES
-- ===========================================================================

CREATE TABLE personal_docente (
    id_personal SERIAL PRIMARY KEY,
    dni VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    cuil VARCHAR(255) NOT NULL UNIQUE,
    fecha_nacimiento VARCHAR(255),
    direccion VARCHAR(255),
    localidad VARCHAR(255),
    distrito VARCHAR(100),
    mail_abc VARCHAR(255),
    mail_personal VARCHAR(255),
    telefono VARCHAR(255),
    titulo_habilitante VARCHAR(150),
    titulo_docente BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol INTEGER NOT NULL REFERENCES roles(id_rol),
    id_personal INTEGER REFERENCES personal_docente(id_personal) ON DELETE SET NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE alumnos (
    id_alumno SERIAL PRIMARY KEY,
    dni VARCHAR(255) NOT NULL UNIQUE,
    cuil VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    fecha_nacimiento VARCHAR(255),
    edad INTEGER,
    lugar_nacimiento VARCHAR(120),
    nacionalidad VARCHAR(80),
    primaria_origen VARCHAR(150),
    secundario_incompleto VARCHAR(150),
    analitico_parcial BOOLEAN DEFAULT FALSE,
    id_estado INTEGER REFERENCES estado_alumnos(id_estado),
    id_motivo_baja INTEGER REFERENCES motivo_baja_alumnos(id_motivo_baja)
);

CREATE TABLE materias (
    id_materia SERIAL PRIMARY KEY, 
    materia_nombre VARCHAR(150) NOT NULL,
    area VARCHAR(100),
    modulo VARCHAR(50),
    anio INTEGER,
    horas_catedra INTEGER,
    id_orientacion INTEGER REFERENCES orientaciones(id_orientacion),
    codigo_pid VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE datos_institucion (
    id_datos SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(150),
    nombre_siglas VARCHAR(50),
    numero VARCHAR(50),
    descripcion TEXT,
    direccion VARCHAR(200),
    localidad VARCHAR(100),
    distrito VARCHAR(100),
    mail VARCHAR(120),
    icono VARCHAR(255),
    imagen_sello VARCHAR(255),
    telefono VARCHAR(50),
    cue VARCHAR(20)
);

CREATE TABLE calendario_academico (
    id_calendario SERIAL PRIMARY KEY,
    evento VARCHAR(150) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE
);

CREATE TABLE notificaciones (
    id_notificacion SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_rol INTEGER REFERENCES roles(id_rol) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para configuración dinámica de alertas
CREATE TABLE configuracion_alertas (
    id_config SERIAL PRIMARY KEY,
    tipo_alerta VARCHAR(100) UNIQUE NOT NULL,
    activa BOOLEAN DEFAULT TRUE,
    parametros JSONB
);

CREATE TABLE historial_cambios (
    id_historial SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modulo VARCHAR(100) NOT NULL,
    detalle TEXT NOT NULL,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

-- ===========================================================================
-- 3. TABLAS INTERMEDIAS Y TRANSACCIONALES (Relaciones N:M e Historiales)
-- ===========================================================================

CREATE TABLE designaciones (
    id_designacion SERIAL PRIMARY KEY,
    id_personal INTEGER NOT NULL REFERENCES personal_docente(id_personal) ON DELETE CASCADE,
    id_materia INTEGER NOT NULL REFERENCES materias(id_materia) ON DELETE CASCADE,
    cupof VARCHAR(50), 
    curso_seccion VARCHAR(50), 
    fecha_posesion DATE,
    fecha_cese DATE,
    id_situacion_revista INTEGER REFERENCES situacion_revista_docentes(id_situacion_revista),
    cuil_profesor_reemplazado VARCHAR(255),
    nota_desempeno DECIMAL(4,2),
    fundamentacion_baja_nota TEXT
);

CREATE TABLE cursadas_notas (
    id_cursada SERIAL PRIMARY KEY,
    id_alumno INTEGER NOT NULL REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    id_materia INTEGER NOT NULL REFERENCES materias(id_materia) ON DELETE CASCADE,
    ciclo_lectivo INTEGER NOT NULL,
    nota_cuat1 VARCHAR(15), 
    faltas_cuat1 INTEGER DEFAULT 0,
    nota_cuat2 VARCHAR(15),
    faltas_cuat2 INTEGER DEFAULT 0,
    id_condicion_materia INTEGER REFERENCES condicion_materia(id_condicion),
    nota_final VARCHAR(15),
    mes_acreditacion VARCHAR(30),
    anio_acreditacion INTEGER
);

CREATE TABLE inasistencias_diarias_docentes (
    id_inasistencia SERIAL PRIMARY KEY,
    id_personal INTEGER NOT NULL REFERENCES personal_docente(id_personal) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    id_motivo INTEGER REFERENCES motivo_inasistencias_docentes(id_motivo),
    observaciones TEXT
);

CREATE TABLE inasistencia_alumnos (
    id_inasistencia SERIAL PRIMARY KEY,
    id_alumno INTEGER NOT NULL REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    id_causa INTEGER NOT NULL REFERENCES causa_inasistencia_alumnos(id_causa),
    observaciones TEXT,
    UNIQUE(id_alumno, fecha)
);

CREATE TABLE estado_asistencia_curso (
    id_estado SERIAL PRIMARY KEY,
    id_curso_seccion INTEGER NOT NULL REFERENCES curso_seccion(id_curso_seccion) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    UNIQUE(id_curso_seccion, fecha)
);