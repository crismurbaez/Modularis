-- ===========================================================================
-- 0. EXTENSIONES
-- ===========================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

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

CREATE TABLE personal_docente_raw (
    id_personal SERIAL PRIMARY KEY,
    dni TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    cuil TEXT NOT NULL,
    fecha_nacimiento TEXT,
    direccion TEXT,
    localidad TEXT,
    distrito TEXT,
    mail_abc TEXT,
    mail_personal TEXT,
    telefono TEXT,
    titulo_habilitante VARCHAR(150),
    titulo_docente BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol INTEGER NOT NULL REFERENCES roles(id_rol),
    id_personal INTEGER REFERENCES personal_docente_raw(id_personal) ON DELETE SET NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE alumnos_raw (
    id_alumno SERIAL PRIMARY KEY,
    dni TEXT NOT NULL,
    cuil TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
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
    id_personal INTEGER NOT NULL REFERENCES personal_docente_raw(id_personal) ON DELETE CASCADE,
    id_materia INTEGER REFERENCES materias(id_materia) ON DELETE CASCADE,
    cupof VARCHAR(50), 
    id_curso_seccion INTEGER REFERENCES curso_seccion(id_curso_seccion), 
    fecha_posesion DATE,
    fecha_cese DATE,
    id_situacion_revista INTEGER REFERENCES situacion_revista_docentes(id_situacion_revista),
    cuil_profesor_reemplazado VARCHAR(255),
    nota_desempeno DECIMAL(4,2),
    fundamentacion_baja_nota TEXT
);

CREATE TABLE cursadas_notas (
    id_cursada SERIAL PRIMARY KEY,
    id_alumno INTEGER NOT NULL REFERENCES alumnos_raw(id_alumno) ON DELETE CASCADE,
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
    id_personal INTEGER NOT NULL REFERENCES personal_docente_raw(id_personal) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    id_motivo INTEGER REFERENCES motivo_inasistencias_docentes(id_motivo),
    observaciones TEXT
);

CREATE TABLE inasistencia_alumnos (
    id_inasistencia SERIAL PRIMARY KEY,
    id_alumno INTEGER NOT NULL REFERENCES alumnos_raw(id_alumno) ON DELETE CASCADE,
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

-- ===========================================================================
-- 4. VISTAS DESENCRIPTADAS
-- ===========================================================================

CREATE VIEW personal_docente AS
SELECT 
    id_personal,
    pgp_sym_decrypt(dni::bytea, current_setting('app.crypto_key', true)) AS dni,
    pgp_sym_decrypt(nombre::bytea, current_setting('app.crypto_key', true)) AS nombre,
    pgp_sym_decrypt(apellido::bytea, current_setting('app.crypto_key', true)) AS apellido,
    pgp_sym_decrypt(cuil::bytea, current_setting('app.crypto_key', true)) AS cuil,
    pgp_sym_decrypt(fecha_nacimiento::bytea, current_setting('app.crypto_key', true)) AS fecha_nacimiento,
    pgp_sym_decrypt(direccion::bytea, current_setting('app.crypto_key', true)) AS direccion,
    pgp_sym_decrypt(localidad::bytea, current_setting('app.crypto_key', true)) AS localidad,
    pgp_sym_decrypt(distrito::bytea, current_setting('app.crypto_key', true)) AS distrito,
    pgp_sym_decrypt(mail_abc::bytea, current_setting('app.crypto_key', true)) AS mail_abc,
    pgp_sym_decrypt(mail_personal::bytea, current_setting('app.crypto_key', true)) AS mail_personal,
    pgp_sym_decrypt(telefono::bytea, current_setting('app.crypto_key', true)) AS telefono,
    titulo_habilitante,
    titulo_docente,
    activo
FROM personal_docente_raw;

CREATE VIEW alumnos AS
SELECT 
    id_alumno,
    pgp_sym_decrypt(dni::bytea, current_setting('app.crypto_key', true)) AS dni,
    pgp_sym_decrypt(cuil::bytea, current_setting('app.crypto_key', true)) AS cuil,
    pgp_sym_decrypt(nombre::bytea, current_setting('app.crypto_key', true)) AS nombre,
    pgp_sym_decrypt(apellido::bytea, current_setting('app.crypto_key', true)) AS apellido,
    fecha_nacimiento,
    edad,
    lugar_nacimiento,
    nacionalidad,
    primaria_origen,
    secundario_incompleto,
    analitico_parcial,
    id_estado,
    id_motivo_baja
FROM alumnos_raw;

-- ===========================================================================
-- 5. TRIGGERS DE ENCRIPTACION
-- ===========================================================================

CREATE OR REPLACE FUNCTION trg_personal_docente_upsert()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO personal_docente_raw (
            dni, nombre, apellido, cuil, fecha_nacimiento, direccion, localidad, distrito, mail_abc, mail_personal, telefono, titulo_habilitante, titulo_docente, activo
        ) VALUES (
            pgp_sym_encrypt(NEW.dni, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.nombre, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.apellido, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.cuil, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.fecha_nacimiento, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.direccion, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.localidad, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.distrito, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.mail_abc, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.mail_personal, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.telefono, current_setting('app.crypto_key', true)),
            NEW.titulo_habilitante,
            NEW.titulo_docente,
            NEW.activo
        ) RETURNING id_personal INTO NEW.id_personal;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE personal_docente_raw SET
            dni = pgp_sym_encrypt(NEW.dni, current_setting('app.crypto_key', true)),
            nombre = pgp_sym_encrypt(NEW.nombre, current_setting('app.crypto_key', true)),
            apellido = pgp_sym_encrypt(NEW.apellido, current_setting('app.crypto_key', true)),
            cuil = pgp_sym_encrypt(NEW.cuil, current_setting('app.crypto_key', true)),
            fecha_nacimiento = pgp_sym_encrypt(NEW.fecha_nacimiento, current_setting('app.crypto_key', true)),
            direccion = pgp_sym_encrypt(NEW.direccion, current_setting('app.crypto_key', true)),
            localidad = pgp_sym_encrypt(NEW.localidad, current_setting('app.crypto_key', true)),
            distrito = pgp_sym_encrypt(NEW.distrito, current_setting('app.crypto_key', true)),
            mail_abc = pgp_sym_encrypt(NEW.mail_abc, current_setting('app.crypto_key', true)),
            mail_personal = pgp_sym_encrypt(NEW.mail_personal, current_setting('app.crypto_key', true)),
            telefono = pgp_sym_encrypt(NEW.telefono, current_setting('app.crypto_key', true)),
            titulo_habilitante = NEW.titulo_habilitante,
            titulo_docente = NEW.titulo_docente,
            activo = NEW.activo
        WHERE id_personal = OLD.id_personal;
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_personal_docente_upsert_trigger
INSTEAD OF INSERT OR UPDATE ON personal_docente
FOR EACH ROW EXECUTE FUNCTION trg_personal_docente_upsert();


CREATE OR REPLACE FUNCTION trg_alumnos_upsert()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO alumnos_raw (
            dni, cuil, nombre, apellido, fecha_nacimiento, edad, lugar_nacimiento, nacionalidad, primaria_origen, secundario_incompleto, analitico_parcial, id_estado, id_motivo_baja
        ) VALUES (
            pgp_sym_encrypt(NEW.dni, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.cuil, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.nombre, current_setting('app.crypto_key', true)),
            pgp_sym_encrypt(NEW.apellido, current_setting('app.crypto_key', true)),
            NEW.fecha_nacimiento,
            NEW.edad,
            NEW.lugar_nacimiento,
            NEW.nacionalidad,
            NEW.primaria_origen,
            NEW.secundario_incompleto,
            NEW.analitico_parcial,
            NEW.id_estado,
            NEW.id_motivo_baja
        ) RETURNING id_alumno INTO NEW.id_alumno;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE alumnos_raw SET
            dni = pgp_sym_encrypt(NEW.dni, current_setting('app.crypto_key', true)),
            cuil = pgp_sym_encrypt(NEW.cuil, current_setting('app.crypto_key', true)),
            nombre = pgp_sym_encrypt(NEW.nombre, current_setting('app.crypto_key', true)),
            apellido = pgp_sym_encrypt(NEW.apellido, current_setting('app.crypto_key', true)),
            fecha_nacimiento = NEW.fecha_nacimiento,
            edad = NEW.edad,
            lugar_nacimiento = NEW.lugar_nacimiento,
            nacionalidad = NEW.nacionalidad,
            primaria_origen = NEW.primaria_origen,
            secundario_incompleto = NEW.secundario_incompleto,
            analitico_parcial = NEW.analitico_parcial,
            id_estado = NEW.id_estado,
            id_motivo_baja = NEW.id_motivo_baja
        WHERE id_alumno = OLD.id_alumno;
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_alumnos_upsert_trigger
INSTEAD OF INSERT OR UPDATE ON alumnos
FOR EACH ROW EXECUTE FUNCTION trg_alumnos_upsert();
