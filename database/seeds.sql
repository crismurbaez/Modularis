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
('1º Año B', 'Primer año - División B'),
('2º Año A', 'Segundo año - División A'),
('2º Año B', 'Segundo año - División B'),
('3º Año A', 'Tercer año - División A'),
('3º Año B', 'Tercer año - División B');

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

-- 7. Materias desde codigos_pid_cupof.md (Orientación en Economía y Administración - C.E)
INSERT INTO materias_cupof (cupof, materia_nombre, area, modulo, anio, id_orientacion, codigo_pid) VALUES
-- 1º AÑO
('2741683', 'Ciencias Sociales 1', 'CIENCIAS SOCIALES 1-2', 'Módulo 1', 1, 3, 'JVW'),
('2741697', 'Ciencias Sociales 2', 'CIENCIAS SOCIALES 1-2', 'Módulo 2', 1, 3, 'JVW'),
('2741679', 'Prácticas del Lenguaje 1', 'PRÁCTICAS DEL LENGUAJE 1-2', 'Módulo 1', 1, 3, 'J4B'),
('2741691', 'Prácticas del Lenguaje 2', 'PRÁCTICAS DEL LENGUAJE 1-2', 'Módulo 2', 1, 3, 'J4B'),
('2741684', 'Biología y Ambiente', 'BIOLOGÍA AMBIENTE Y SALUD', 'Módulo 1', 1, 3, 'J3A'),
('2741699', 'Biología y Salud', 'BIOLOGÍA AMBIENTE Y SALUD', 'Módulo 2', 1, 3, 'J3A'),
('2741682', 'Matemática 1', 'MATEMÁTICA 1-2', 'Módulo 1', 1, 3, 'J4I'),
('2741695', 'Matemática 2', 'MATEMÁTICA 1-2', 'Módulo 2', 1, 3, 'J4I'),
('2741681', 'Lengua Adicional INGLÉS', 'LENGUA ADICIONAL 1-2: INGLÉS', 'Módulo 1', 1, 3, 'JIN'),
('2741692', 'Lengua Adicional INGLÉS', 'LENGUA ADICIONAL 1-2: INGLÉS', 'Módulo 2', 1, 3, 'JIN'),
('2741685', 'Tecnología y Prácticas Digitales 1', 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 1-2', 'Módulo 1', 1, 3, 'J3Z'),
('2741701', 'Tecnología y Prácticas Digitales 2', 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 1-2', 'Módulo 2', 1, 3, 'J3Z'),
('2639649', 'Educación Física 1', 'EDUCACIÓN FÍSICA 1-2', 'Módulo 1', 1, 3, 'JFC'),
('2639657', 'Educación Física 2', 'EDUCACIÓN FÍSICA 1-2', 'Módulo 2', 1, 3, 'JFC'),
('2639660', 'Educación Artística 1 PLÁSTICA', 'EDUCACIÓN ARTÍSTICA PLÁSTICA 1-2', 'Módulo 1', 1, 3, 'JPV'),
('2639663', 'Educación Artística 2 PLÁSTICA', 'EDUCACIÓN ARTÍSTICA PLÁSTICA 1-2', 'Módulo 2', 1, 3, 'JPV'),
('2741688', 'Sistemas Contables', 'SISTEMAS CONTABLES - GESTIÓN CONTABLE DE EMPRENDIMIENTOS', 'Módulo 1', 1, 3, 'J2R'),
('2741705', 'Gestión Contable de emprendimientos', 'SISTEMAS CONTABLES - GESTIÓN CONTABLE DE EMPRENDIMIENTOS', 'Módulo 2', 1, 3, 'J2R'),
('2741686', 'Gestión del Diseño de Emprendimientos', 'GESTIÓN DEL DISEÑO DE EMPRENDIMIENTOS - ADMINISTRACIÓN PÚBLICA', 'Módulo 1', 1, 3, 'J2A'),
('2741702', 'Administración Pública', 'GESTIÓN DEL DISEÑO DE EMPRENDIMIENTOS - ADMINISTRACIÓN PÚBLICA', 'Módulo 2', 1, 3, 'J2A'),

-- 2º AÑO
('2741714', 'Ciencias Sociales 3', 'CIENCIAS SOCIALES 3-4', 'Módulo 3', 2, 3, 'JVW'),
('2741714-Módulo4', 'Ciencias Sociales 4', 'CIENCIAS SOCIALES 3-4', 'Módulo 4', 2, 3, 'JVW'),
('2741710', 'Prácticas del Lenguaje 3', 'PRÁCTICAS DEL LENGUAJE 3-4', 'Módulo 3', 2, 3, 'J4B'),
('2741710-Módulo4', 'Prácticas del Lenguaje 4', 'PRÁCTICAS DEL LENGUAJE 3-4', 'Módulo 4', 2, 3, 'J4B'),
('2741716', 'Física y Fenómenos Naturales', 'FÍSICA: FENÓMENOS NATURALES Y PROCESOS PRODUCTIVOS', 'Módulo 3', 2, 3, 'J5X'),
('2741716-Módulo4', 'Física y Procesos Productivos', 'FÍSICA: FENÓMENOS NATURALES Y PROCESOS PRODUCTIVOS', 'Módulo 4', 2, 3, 'J5X'),
('2741715', 'Matemática 3', 'MATEMÁTICA 3-4', 'Módulo 3', 2, 3, 'J4I'),
('2741715-Módulo4', 'Matemática 4', 'MATEMÁTICA 3-4', 'Módulo 4', 2, 3, 'J4I'),
('2741712', 'Lengua Adicional INGLÉS', 'LENGUA ADICIONAL 3-4: INGLÉS', 'Módulo 3', 2, 3, 'JIN'),
('2741712-Módulo4', 'Lengua Adicional INGLÉS', 'LENGUA ADICIONAL 3-4: INGLÉS', 'Módulo 4', 2, 3, 'JIN'),
('2741719', 'Ciudadanía, Sociedad y Cultura', 'CIUDADANIA, SOCIEDAD Y CULTURA-RELACIONES LABORALES Y ORIENTACIÓN PROFESIONAL', 'Módulo 3', 2, 3, 'J2U'),
('2741719-Módulo4', 'Relaciones Laborales y Orientación profesional', 'CIUDADANIA, SOCIEDAD Y CULTURA-RELACIONES LABORALES Y ORIENTACIÓN PROFESIONAL', 'Módulo 4', 2, 3, 'J2U'),
('2741717', 'Tecnología y Prácticas Digitales 3', 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 3-4', 'Módulo 3', 2, 3, 'J3Z'),
('2741717-Módulo4', 'Tecnología y Prácticas Digitales 4', 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 3-4', 'Módulo 4', 2, 3, 'J3Z'),
('2741717-Módulo3', 'Educación Física 3', 'EDUCACIÓN FÍSICA 3-4', 'Módulo 3', 2, 3, 'JFC'),
('2741717-Módulo4', 'Educación Física 4', 'EDUCACIÓN FÍSICA 3-4', 'Módulo 4', 2, 3, 'JFC'),
('2741717-Módulo3', 'Educación Artística 3 PLÁSTICA', 'EDUCACIÓN ARTÍSTICA 3-4 PLÁSTICA', 'Módulo 3', 2, 3, 'JPV'),
('2741717-Módulo4', 'Educación Artística 4 PLÁSTICA', 'EDUCACIÓN ARTÍSTICA 3-4 PLÁSTICA', 'Módulo 4', 2, 3, 'JPV'),
('2741718', 'Derecho Económico', 'DERECHO ECONÓMICO Y DEL TRABAJO', 'Módulo 3', 2, 3, 'JET'),
('2741718-Módulo4', 'Derecho del Trabajo', 'DERECHO ECONÓMICO Y DEL TRABAJO', 'Módulo 4', 2, 3, 'JET'),
('2741710', 'Administración de capacidades yrelaciones laborales/Gestión económico comercial de emprendimientos', 'ADMINISTRACIÓN DE CAPACIDADES-GESTIÓN ECONÓMICO COMERCIAL', 'Módulo 3', 2, 3, 'JAG'),

-- 3º AÑO
('2775363', 'Problemática Social Argentina 1', 'PROBLEMÁTICA SOCIAL ARGENTINA 1-2', 'Módulo 5', 3, 3, 'JPP'),
('2775363-Módulo6', 'Problemática Social Argentina 2', 'PROBLEMÁTICA SOCIAL ARGENTINA 1-2', 'Módulo 6', 3, 3, 'JPP'),
('2775351', 'Prácticas del Lenguaje 5', 'PRÁCTICAS DEL LENGUAJE 5-6', 'Módulo 5', 3, 3, 'J4B'),
('2775351-Módulo6', 'Prácticas del Lenguaje 6', 'PRÁCTICAS DEL LENGUAJE 5-6', 'Módulo 6', 3, 3, 'J4B'),
('2775366', 'Química y Tecnologías', 'QUÍMICA: TECNOLOGÍA Y SOCIEDAD', 'Módulo 5', 3, 3, 'JQQ'),
('2775366-Módulo6', 'Química y Sociedad', 'QUÍMICA: TECNOLOGÍA Y SOCIEDAD', 'Módulo 6', 3, 3, 'JQQ'),
('2775361', 'Matemática 5', 'MATEMÁTICA 5-6', 'Módulo 5', 3, 3, 'J4I'),
('2775361-Módulo6', 'Matemática 6', 'MATEMÁTICA 5-6', 'Módulo 6', 3, 3, 'J4I'),
('2775357', 'Lengua Adicional INGLÉS 5', 'LENGUA ADICIONAL 5-6: INGLÉS', 'Módulo 5', 3, 3, 'JIN'),
('2775357-Módulo6', 'Lengua Adicional INGLÉS 6', 'LENGUA ADICIONAL 5-6: INGLÉS', 'Módulo 6', 3, 3, 'JIN'),
('2775369', 'Tecnología y Prácticas Digitales 5', 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 5-6', 'Módulo 5', 3, 3, 'J3Z'),
('2775369-Módulo6', 'Tecnología y Prácticas Digitales 6', 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 5-6', 'Módulo 6', 3, 3, 'J3Z'),
('2775369-Módulo5', 'Educación Física 5', 'EDUCACIÓN FÍSICA 5-6', 'Módulo 5', 3, 3, 'JFC'),
('2775369-Módulo6', 'Educación Física 6', 'EDUCACIÓN FÍSICA 5-6', 'Módulo 6', 3, 3, 'JFC'),
('2775369-Módulo5', 'Educación Artística 5 PLÁSTICA', 'EDUCACIÓN ARTÍSTICA 5-6 PLÁSTICA', 'Módulo 5', 3, 3, 'JPV'),
('2775369-Módulo6', 'Educación Artística 6 PLÁSTICA', 'EDUCACIÓN ARTÍSTICA 5-6 PLÁSTICA', 'Módulo 6', 3, 3, 'JPV'),
('2775372', 'Economía', 'ECONOMÍA Y ECONOMÍA POPULAR, SOCIAL Y SOLIDARIA', 'Módulo 5', 3, 3, 'JEE'),
('2775372-Módulo6', 'Economía popular, social y solidaria', 'ECONOMÍA Y ECONOMÍA POPULAR, SOCIAL Y SOLIDARIA', 'Módulo 6', 3, 3, 'JEE'),
('2775374', 'Legislación y práctica impositiva', 'LEGISLACIÓN Y PRÁCTICA IMPOSITIVA-HERRAMIENTAS LEGALES PARA EMPRENDIMIENTOS', 'Módulo 5', 3, 3, 'JEE'),
('2775374-Módulo6', 'Herramientas legales para emprendimientos', 'LEGISLACIÓN Y PRÁCTICA IMPOSITIVA-HERRAMIENTAS LEGALES PARA EMPRENDIMIENTOS', 'Módulo 6', 3, 3, 'JLH');