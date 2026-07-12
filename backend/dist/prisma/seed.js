"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
const bcrypt = require("bcrypt");
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    await prisma.rol.createMany({
        data: [
            { id_rol: 1, nombre: 'DIRECTOR', descripcion: 'Control total del sistema' },
            { id_rol: 2, nombre: 'PRECEPTOR', descripcion: 'Gestión de asistencia y alumnos' },
            { id_rol: 3, nombre: 'PROFESOR', descripcion: 'Carga de calificaciones' },
        ],
        skipDuplicates: true,
    });
    await prisma.permiso.createMany({
        data: [
            { id_permiso: 1, codigo: 'ACCESO_TOTAL', modulo: 'SISTEMA', descripcion: 'Permiso maestro que ignora las restricciones' },
            { id_permiso: 2, codigo: 'MODIFICAR_CALIFICACIONES', modulo: 'ACADEMICO', descripcion: 'Permite cargar o editar notas' },
            { id_permiso: 3, codigo: 'MODIFICAR_ASISTENCIA', modulo: 'ASISTENCIA', descripcion: 'Permite cargar o editar faltas' },
            { id_permiso: 4, codigo: 'GESTIONAR_USUARIOS', modulo: 'CONFIGURACION', descripcion: 'Permite crear o modificar usuarios' },
        ],
        skipDuplicates: true,
    });
    await prisma.rolPermiso.createMany({
        data: [
            { id_rol: 1, id_permiso: 1 },
            { id_rol: 2, id_permiso: 3 },
            { id_rol: 3, id_permiso: 2 },
        ],
        skipDuplicates: true,
    });
    const passwordHash = await bcrypt.hash('123456', 10);
    await prisma.usuario.upsert({
        where: { dni: '00000000' },
        update: {
            nombre: 'Yanina',
            apellido: 'Poncela',
        },
        create: {
            dni: '00000000',
            password_hash: passwordHash,
            nombre: 'Yanina',
            apellido: 'Poncela',
            id_rol: 1,
            activo: true,
        },
    });
    await prisma.orientacion.createMany({
        data: [
            { nombre: 'Ciencias Sociales', detalle: 'Orientación en Ciencias Sociales - Plan de Estudios Modular Adultos' },
            { nombre: 'Ciencias Naturales', detalle: 'Orientación en Ciencias Naturales - Plan de Estudios Modular Adultos' },
            { nombre: 'Economía y Administración', detalle: 'Orientación en Economía y Administración / Gestión - Adultos' },
            { nombre: 'Informática', detalle: 'Orientación en Informática / Computación - Bachillerato de Adultos' },
            { nombre: 'Producción de Bienes y Servicios (Turismo)', detalle: 'Orientación específica en Gestión de Servicios Turísticos' },
        ],
        skipDuplicates: true,
    });
    await prisma.cursoSeccion.createMany({
        data: [
            { nombre: '1º Año A', detalle: 'Primer año - División A' },
            { nombre: '1º Año B', detalle: 'Primer año - División B' },
            { nombre: '2º Año A', detalle: 'Segundo año - División A' },
            { nombre: '2º Año B', detalle: 'Segundo año - División B' },
            { nombre: '3º Año A', detalle: 'Tercer año - División A' },
            { nombre: '3º Año B', detalle: 'Tercer año - División B' },
        ],
        skipDuplicates: true,
    });
    await prisma.situacionRevistaDocente.createMany({
        data: [
            { nombre: 'TITULAR', detalle: 'Docente titularizado con estabilidad en el cargo/CUPOF' },
            { nombre: 'PROVISIONAL', detalle: 'Docente provisional con desempeño anual completo' },
            { nombre: 'SUPLENTE', detalle: 'Docente reemplazante (Requiere CUIL del profesor reemplazado)' },
        ],
        skipDuplicates: true,
    });
    await prisma.estadoAlumno.createMany({
        data: [
            { nombre: 'REGULAR', detalle: 'Estudiante con cursada activa e inasistencias bajo el límite legal' },
            { nombre: 'BAJA', detalle: 'Estudiante desvinculado formalmente de la institución' },
            { nombre: 'PASE', detalle: 'Estudiante trasladado a otro CENS o Bachillerato de Adultos' },
        ],
        skipDuplicates: true,
    });
    await prisma.motivoBajaAlumno.createMany({
        data: [
            { nombre: 'Laboral', detalle: 'Cambio u obtención de empleo que impide la cursada' },
            { nombre: 'Traslado', detalle: 'Mudanza o cambio de jurisdicción/distrito' },
            { nombre: 'Salud', detalle: 'Problemas de salud crónicos o impedimento médico temporal' },
            { nombre: 'Socioeconómico', detalle: 'Dificultades familiares o de transporte' },
            { nombre: 'Contexto de Encierro - Libertad', detalle: 'Egreso por cumplimiento de condena o libertad condicional (Sedes Penales)' },
            { nombre: 'Desconocido', detalle: 'Ausencia prolongada sin justificación ni comunicación con el CENS' },
        ],
        skipDuplicates: true,
    });
    await prisma.limitesCalificacionAlumnos.createMany({
        data: [
            { limite_superior: 10, limite_inferior: 1 },
        ],
        skipDuplicates: true,
    });
    await prisma.limitesCalificacionDocentes.createMany({
        data: [
            { limite_superior: 10, limite_inferior: 1 },
        ],
        skipDuplicates: true,
    });
    await prisma.materiaCupof.createMany({
        data: [
            { cupof: '2741683', materia_nombre: 'Ciencias Sociales 1', area: 'CIENCIAS SOCIALES 1-2', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'JVW' },
            { cupof: '2741697', materia_nombre: 'Ciencias Sociales 2', area: 'CIENCIAS SOCIALES 1-2', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'JVW' },
            { cupof: '2741679', materia_nombre: 'Prácticas del Lenguaje 1', area: 'PRÁCTICAS DEL LENGUAJE 1-2', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'J4B' },
            { cupof: '2741691', materia_nombre: 'Prácticas del Lenguaje 2', area: 'PRÁCTICAS DEL LENGUAJE 1-2', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'J4B' },
            { cupof: '2741684', materia_nombre: 'Biología y Ambiente', area: 'BIOLOGÍA AMBIENTE Y SALUD', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'J3A' },
            { cupof: '2741699', materia_nombre: 'Biología y Salud', area: 'BIOLOGÍA AMBIENTE Y SALUD', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'J3A' },
            { cupof: '2741682', materia_nombre: 'Matemática 1', area: 'MATEMÁTICA 1-2', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'J4I' },
            { cupof: '2741695', materia_nombre: 'Matemática 2', area: 'MATEMÁTICA 1-2', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'J4I' },
            { cupof: '2741681', materia_nombre: 'Lengua Adicional INGLÉS', area: 'LENGUA ADICIONAL 1-2: INGLÉS', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'JIN' },
            { cupof: '2741692', materia_nombre: 'Lengua Adicional INGLÉS', area: 'LENGUA ADICIONAL 1-2: INGLÉS', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'JIN' },
            { cupof: '2741685', materia_nombre: 'Tecnología y Prácticas Digitales 1', area: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 1-2', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'J3Z' },
            { cupof: '2741701', materia_nombre: 'Tecnología y Prácticas Digitales 2', area: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 1-2', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'J3Z' },
            { cupof: '2639649', materia_nombre: 'Educación Física 1', area: 'EDUCACIÓN FÍSICA 1-2', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'JFC' },
            { cupof: '2639657', materia_nombre: 'Educación Física 2', area: 'EDUCACIÓN FÍSICA 1-2', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'JFC' },
            { cupof: '2639660', materia_nombre: 'Educación Artística 1 PLÁSTICA', area: 'EDUCACIÓN ARTÍSTICA PLÁSTICA 1-2', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'JPV' },
            { cupof: '2639663', materia_nombre: 'Educación Artística 2 PLÁSTICA', area: 'EDUCACIÓN ARTÍSTICA PLÁSTICA 1-2', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'JPV' },
            { cupof: '2741688', materia_nombre: 'Sistemas Contables', area: 'SISTEMAS CONTABLES - GESTIÓN CONTABLE DE EMPRENDIMIENTOS', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'J2R' },
            { cupof: '2741705', materia_nombre: 'Gestión Contable de emprendimientos', area: 'SISTEMAS CONTABLES - GESTIÓN CONTABLE DE EMPRENDIMIENTOS', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'J2R' },
            { cupof: '2741686', materia_nombre: 'Gestión del Diseño de Emprendimientos', area: 'GESTIÓN DEL DISEÑO DE EMPRENDIMIENTOS - ADMINISTRACIÓN PÚBLICA', modulo: 'Módulo 1', anio: 1, id_orientacion: 3, codigo_pid: 'J2A' },
            { cupof: '2741702', materia_nombre: 'Administración Pública', area: 'GESTIÓN DEL DISEÑO DE EMPRENDIMIENTOS - ADMINISTRACIÓN PÚBLICA', modulo: 'Módulo 2', anio: 1, id_orientacion: 3, codigo_pid: 'J2A' },
            { cupof: '2741714', materia_nombre: 'Ciencias Sociales 3', area: 'CIENCIAS SOCIALES 3-4', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'JVW' },
            { cupof: '2741714-Módulo4', materia_nombre: 'Ciencias Sociales 4', area: 'CIENCIAS SOCIALES 3-4', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'JVW' },
            { cupof: '2741710', materia_nombre: 'Prácticas del Lenguaje 3', area: 'PRÁCTICAS DEL LENGUAJE 3-4', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'J4B' },
            { cupof: '2741710-Módulo4', materia_nombre: 'Prácticas del Lenguaje 4', area: 'PRÁCTICAS DEL LENGUAJE 3-4', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'J4B' },
            { cupof: '2741716', materia_nombre: 'Física y Fenómenos Naturales', area: 'FÍSICA: FENÓMENOS NATURALES Y PROCESOS PRODUCTIVOS', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'J5X' },
            { cupof: '2741716-Módulo4', materia_nombre: 'Física y Procesos Productivos', area: 'FÍSICA: FENÓMENOS NATURALES Y PROCESOS PRODUCTIVOS', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'J5X' },
            { cupof: '2741715', materia_nombre: 'Matemática 3', area: 'MATEMÁTICA 3-4', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'J4I' },
            { cupof: '2741715-Módulo4', materia_nombre: 'Matemática 4', area: 'MATEMÁTICA 3-4', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'J4I' },
            { cupof: '2741712', materia_nombre: 'Lengua Adicional INGLÉS', area: 'LENGUA ADICIONAL 3-4: INGLÉS', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'JIN' },
            { cupof: '2741712-Módulo4', materia_nombre: 'Lengua Adicional INGLÉS', area: 'LENGUA ADICIONAL 3-4: INGLÉS', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'JIN' },
            { cupof: '2741719', materia_nombre: 'Ciudadanía, Sociedad y Cultura', area: 'CIUDADANIA, SOCIEDAD Y CULTURA-RELACIONES LABORALES Y ORIENTACIÓN PROFESIONAL', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'J2U' },
            { cupof: '2741719-Módulo4', materia_nombre: 'Relaciones Laborales y Orientación profesional', area: 'CIUDADANIA, SOCIEDAD Y CULTURA-RELACIONES LABORALES Y ORIENTACIÓN PROFESIONAL', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'J2U' },
            { cupof: '2741717', materia_nombre: 'Tecnología y Prácticas Digitales 3', area: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 3-4', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'J3Z' },
            { cupof: '2741717-Módulo4', materia_nombre: 'Tecnología y Prácticas Digitales 4', area: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 3-4', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'J3Z' },
            { cupof: '2741717-Módulo3', materia_nombre: 'Educación Física 3', area: 'EDUCACIÓN FÍSICA 3-4', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'JFC' },
            { cupof: '2741717-Módulo4', materia_nombre: 'Educación Física 4', area: 'EDUCACIÓN FÍSICA 3-4', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'JFC' },
            { cupof: '2741717-Módulo3', materia_nombre: 'Educación Artística 3 PLÁSTICA', area: 'EDUCACIÓN ARTÍSTICA 3-4 PLÁSTICA', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'JPV' },
            { cupof: '2741717-Módulo4', materia_nombre: 'Educación Artística 4 PLÁSTICA', area: 'EDUCACIÓN ARTÍSTICA 3-4 PLÁSTICA', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'JPV' },
            { cupof: '2741718', materia_nombre: 'Derecho Económico', area: 'DERECHO ECONÓMICO Y DEL TRABAJO', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'JET' },
            { cupof: '2741718-Módulo4', materia_nombre: 'Derecho del Trabajo', area: 'DERECHO ECONÓMICO Y DEL TRABAJO', modulo: 'Módulo 4', anio: 2, id_orientacion: 3, codigo_pid: 'JET' },
            { cupof: '2741710', materia_nombre: 'Administración de capacidades yrelaciones laborales/Gestión económico comercial de emprendimientos', area: 'ADMINISTRACIÓN DE CAPACIDADES-GESTIÓN ECONÓMICO COMERCIAL', modulo: 'Módulo 3', anio: 2, id_orientacion: 3, codigo_pid: 'JAG' },
            { cupof: '2775363', materia_nombre: 'Problemática Social Argentina 1', area: 'PROBLEMÁTICA SOCIAL ARGENTINA 1-2', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'JPP' },
            { cupof: '2775363-Módulo6', materia_nombre: 'Problemática Social Argentina 2', area: 'PROBLEMÁTICA SOCIAL ARGENTINA 1-2', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'JPP' },
            { cupof: '2775351', materia_nombre: 'Prácticas del Lenguaje 5', area: 'PRÁCTICAS DEL LENGUAJE 5-6', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'J4B' },
            { cupof: '2775351-Módulo6', materia_nombre: 'Prácticas del Lenguaje 6', area: 'PRÁCTICAS DEL LENGUAJE 5-6', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'J4B' },
            { cupof: '2775366', materia_nombre: 'Química y Tecnologías', area: 'QUÍMICA: TECNOLOGÍA Y SOCIEDAD', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'JQQ' },
            { cupof: '2775366-Módulo6', materia_nombre: 'Química y Sociedad', area: 'QUÍMICA: TECNOLOGÍA Y SOCIEDAD', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'JQQ' },
            { cupof: '2775361', materia_nombre: 'Matemática 5', area: 'MATEMÁTICA 5-6', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'J4I' },
            { cupof: '2775361-Módulo6', materia_nombre: 'Matemática 6', area: 'MATEMÁTICA 5-6', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'J4I' },
            { cupof: '2775357', materia_nombre: 'Lengua Adicional INGLÉS 5', area: 'LENGUA ADICIONAL 5-6: INGLÉS', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'JIN' },
            { cupof: '2775357-Módulo6', materia_nombre: 'Lengua Adicional INGLÉS 6', area: 'LENGUA ADICIONAL 5-6: INGLÉS', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'JIN' },
            { cupof: '2775369', materia_nombre: 'Tecnología y Prácticas Digitales 5', area: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 5-6', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'J3Z' },
            { cupof: '2775369-Módulo6', materia_nombre: 'Tecnología y Prácticas Digitales 6', area: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 5-6', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'J3Z' },
            { cupof: '2775369-Módulo5', materia_nombre: 'Educación Física 5', area: 'EDUCACIÓN FÍSICA 5-6', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'JFC' },
            { cupof: '2775369-Módulo6', materia_nombre: 'Educación Física 6', area: 'EDUCACIÓN FÍSICA 5-6', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'JFC' },
            { cupof: '2775369-Módulo5', materia_nombre: 'Educación Artística 5 PLÁSTICA', area: 'EDUCACIÓN ARTÍSTICA 5-6 PLÁSTICA', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'JPV' },
            { cupof: '2775369-Módulo6', materia_nombre: 'Educación Artística 6 PLÁSTICA', area: 'EDUCACIÓN ARTÍSTICA 5-6 PLÁSTICA', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'JPV' },
            { cupof: '2775372', materia_nombre: 'Economía', area: 'ECONOMÍA Y ECONOMÍA POPULAR, SOCIAL Y SOLIDARIA', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'JEE' },
            { cupof: '2775372-Módulo6', materia_nombre: 'Economía popular, social y solidaria', area: 'ECONOMÍA Y ECONOMÍA POPULAR, SOCIAL Y SOLIDARIA', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'JEE' },
            { cupof: '2775374', materia_nombre: 'Legislación y práctica impositiva', area: 'LEGISLACIÓN Y PRÁCTICA IMPOSITIVA-HERRAMIENTAS LEGALES PARA EMPRENDIMIENTOS', modulo: 'Módulo 5', anio: 3, id_orientacion: 3, codigo_pid: 'JEE' },
            { cupof: '2775374-Módulo6', materia_nombre: 'Herramientas legales para emprendimientos', area: 'LEGISLACIÓN Y PRÁCTICA IMPOSITIVA-HERRAMIENTAS LEGALES PARA EMPRENDIMIENTOS', modulo: 'Módulo 6', anio: 3, id_orientacion: 3, codigo_pid: 'JLH' },
        ],
        skipDuplicates: true,
    });
    console.log('Seeding completed.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map