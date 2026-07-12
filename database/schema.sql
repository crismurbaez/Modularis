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

-- Tablas de límites paramétricos que ideaste
CREATE TABLE limites_calificacion_alumnos (
    limite_superior INTEGER NOT NULL,
    limite_inferior INTEGER NOT NULL
);

CREATE TABLE limites_calificacion_docentes (
    limite_superior INTEGER NOT NULL,
    limite_inferior INTEGER NOT NULL
);

-- ===========================================================================
-- 2. ENTIDADES PRINCIPALES
-- ===========================================================================

CREATE TABLE profesores (
    id_profesor SERIAL PRIMARY KEY,
    dni VARCHAR(50) NOT NULL UNIQUE, -- Varchar para soportar encriptación AES/Crypto
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    cuil VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE,
    direccion VARCHAR(200),
    localidad VARCHAR(100),
    distrito VARCHAR(100),
    mail_abc VARCHAR(120),
    mail_personal VARCHAR(120),
    telefono VARCHAR(30),
    titulo_habilitante VARCHAR(150),
    titulo_docente BOOLEAN DEFAULT FALSE
);

CREATE TABLE alumnos (
    id_alumno SERIAL PRIMARY KEY,
    dni VARCHAR(50) NOT NULL UNIQUE, -- Varchar para soportar encriptación AES/Crypto
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    fecha_nacimiento DATE,
    edad INTEGER,
    lugar_nacimiento VARCHAR(120),
    nacionalidad VARCHAR(80),
    primaria_origen VARCHAR(150),
    secundario_incompleto VARCHAR(150),
    analitico_parcial BOOLEAN DEFAULT FALSE,
    id_estado INTEGER REFERENCES estado_alumnos(id_estado),
    id_motivo_baja INTEGER REFERENCES motivo_baja_alumnos(id_motivo_baja)
);

CREATE TABLE materias_cupof (
    cupof VARCHAR(50) PRIMARY KEY, -- El CUPOF es la clave natural presupuestaria
    materia_nombre VARCHAR(150) NOT NULL,
    area VARCHAR(100),
    modulo VARCHAR(50),
    año INTEGER,
    horas_catedra INTEGER,
    id_orientacion INTEGER REFERENCES orientaciones(id_orientacion),
    codigo_pid VARCHAR(50)
    activo BOOLEAN DEFAULT TRUE
);

-- ===========================================================================
-- 3. TABLAS INTERMEDIAS Y TRANSACCIONALES (Relaciones N:M e Historiales)
-- ===========================================================================

CREATE TABLE designaciones (
    id_designacion SERIAL PRIMARY KEY,
    id_profesor INTEGER NOT NULL REFERENCES profesores(id_profesor) ON DELETE CASCADE,
    cupof VARCHAR(50) NOT NULL REFERENCES materias_cupof(cupof) ON DELETE CASCADE,
    curso_seccion VARCHAR(50), -- Identificador de la cursada física (ej: 1°A)
    fecha_posesion DATE,
    fecha_cese DATE,
    id_situacion_revista INTEGER REFERENCES situacion_revista_docentes(id_situacion_revista),
    cuil_profesor_reemplazado VARCHAR(20),
    nota_desempeño DECIMAL(4,2)
);

CREATE TABLE cursadas_notas (
    id_cursada SERIAL PRIMARY KEY,
    id_alumno INTEGER NOT NULL REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    cupof VARCHAR(50) NOT NULL REFERENCES materias_cupof(cupof) ON DELETE CASCADE,
    ciclo_lectivo INTEGER NOT NULL,
    nota_cuat1 VARCHAR(15), -- Recomendado VARCHAR para absorber "S/CALIFICAR"
    faltas_cuat1 INTEGER DEFAULT 0,
    nota_cuat2 VARCHAR(15),
    faltas_cuat2 INTEGER DEFAULT 0,
    condicion_materia VARCHAR(80),
    mes_acreditacion VARCHAR(30),
    anio_acreditacion INTEGER
);

CREATE TABLE inasistencias_docentes (
    id_asistencia_doc SERIAL PRIMARY KEY,
    id_profesor INTEGER NOT NULL REFERENCES profesores(id_profesor) ON DELETE CASCADE,
    periodo_calificacion VARCHAR(50) NOT NULL,
    faltas_enfermedad INTEGER DEFAULT 0,
    faltas_causas_priv INTEGER DEFAULT 0,
    faltas_otras_causas INTEGER DEFAULT 0,
    faltas_injustificadas INTEGER DEFAULT 0
);