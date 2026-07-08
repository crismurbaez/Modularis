-- ===========================================================================
-- SEEDS PARA MODULARIS (Catálogos Oficiales de PBA)
-- ===========================================================================

-- 1. Orientaciones Oficiales de CENS (Según resoluciones modulares vigentes)
INSERT INTO orientaciones (nombre, detalle) VALUES
('Ciencias Sociales', 'Orientación en Ciencias Sociales - Plan de Estudios Modular Adultos'),
('Ciencias Naturales', 'Orientación en Ciencias Naturales - Plan de Estudios Modular Adultos'),
('Economía y Administración', 'Orientación en Economía y Administración / Gestión - Adultos'),
('Informática', 'Orientación en Informática / Computación - Bachillerato de Adultos'),
('Producción de Bienes y Servicios (Turismo)', 'Orientación específica en Gestión de Servicios Turísticos');

-- 2. Cursos y Secciones Estándar
INSERT INTO curso_seccion (nombre, detalle) VALUES
('1º Año A', 'Primer año - División A'),
('1º Año B', 'Primer año - División B (Fines / Contexto de Encierro)'),
('2º Año A', 'Segundo año - División A'),
('2º Año B', 'Segundo año - División B (Fines / Contexto de Encierro)'),
('3º Año A', 'Tercer año - División A'),
('3º Año B', 'Tercer año - División B (Fines / Contexto de Encierro)');

-- 3. Situación de Revista Docente (Para Actas de Toma de Posesión y S.E.T. 4)
INSERT INTO situacion_revista_docentes (nombre, detalle) VALUES
('TITULAR', 'Docente titularizado con estabilidad en el cargo/CUPOF'),
('PROVISIONAL', 'Docente provisional con desempeño anual completo'),
('SUPLENTE', 'Docente reemplazante (Requiere CUIL del profesor reemplazado)');

-- 4. Estados Académicos de Alumnos (Ciclo de Vida de Matrícula)
INSERT INTO estado_alumnos (nombre, detalle) VALUES
('REGULAR', 'Estudiante con cursada activa e inasistencias bajo el límite legal'),
('BAJA', 'Estudiante desvinculado formalmente de la institución'),
('PASE', 'Estudiante trasladado a otro CENS o Bachillerato de Adultos');

-- 5. Motivos de Baja (Requisito estadístico de los reportes oficiales)
INSERT INTO motivo_baja_alumnos (nombre, detalle) VALUES
('Laboral', 'Cambio u obtención de empleo que impide la cursada'),
('Traslado', 'Mudanza o cambio de jurisdicción/distrito'),
('Salud', 'Problemas de salud crónicos o impedimento médico temporal'),
('Socioeconómico', 'Dificultades familiares o de transporte'),
('Contexto de Encierro - Libertad', 'Egreso por cumplimiento de condena o libertad condicional (Sedes Penales)'),
('Desconocido', 'Ausencia prolongada sin justificación ni comunicación con el CENS');

-- 6. Límites Paramétricos de Calificación (Reglas de Negocio en la Base de Datos)
INSERT INTO limites_calificacion_alumnos (limite_superior, limite_inferior) VALUES (10, 1);
INSERT INTO limites_calificacion_docentes (limite_superior, limite_inferior) VALUES (10, 1);

-- ===========================================================================
-- EJEMPLOS DE DATOS BASE PARA TESTING (Materias con Estructura CUPOF Real)
-- ===========================================================================

-- Materias comunes del Módulo 1 (Ciencias Sociales)
INSERT INTO materias_cupof (cupof, materia_nombre, area, modulo, año, horas_catedra, id_orientacion, codigo_pid) VALUES
('CENS-MAT-1A', 'Matemática I', 'Exactas', 'Módulo 1', 1, 3, 1, 'MAT'),
('CENS-PL-1A', 'Prácticas del Lenguaje I', 'Comunicación', 'Módulo 1', 1, 4, 1, 'PL'),
('CENS-CS-1A', 'Ciencias Sociales (Historia/Geografía)', 'Ciencias Sociales', 'Módulo 1', 1, 4, 1, 'CS');