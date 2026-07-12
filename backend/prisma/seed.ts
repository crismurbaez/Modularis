import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Orientaciones Oficiales de CENS
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

  // 2. Cursos y Secciones Estándar
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

  // 3. Situación de Revista Docente
  await prisma.situacionRevistaDocente.createMany({
    data: [
      { nombre: 'TITULAR', detalle: 'Docente titularizado con estabilidad en el cargo/CUPOF' },
      { nombre: 'PROVISIONAL', detalle: 'Docente provisional con desempeño anual completo' },
      { nombre: 'SUPLENTE', detalle: 'Docente reemplazante (Requiere CUIL del profesor reemplazado)' },
    ],
    skipDuplicates: true,
  });

  // 4. Estados Académicos de Alumnos
  await prisma.estadoAlumno.createMany({
    data: [
      { nombre: 'REGULAR', detalle: 'Estudiante con cursada activa e inasistencias bajo el límite legal' },
      { nombre: 'BAJA', detalle: 'Estudiante desvinculado formalmente de la institución' },
      { nombre: 'PASE', detalle: 'Estudiante trasladado a otro CENS o Bachillerato de Adultos' },
    ],
    skipDuplicates: true,
  });

  // 5. Motivos de Baja
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

  // 6. Límites Paramétricos de Calificación
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

  // 7. Materias desde codigos_pid_cupof.md (Orientación en Economía y Administración - C.E)
  await prisma.materiaCupof.createMany({
    data: [
      // 1º AÑO
      { cupof: '2741683.0', materia_nombre: 'CIENCIAS SOCIALES 1-2', area: 'Ciencias Sociales', ano: 1, id_orientacion: 3, codigo_pid: 'JVW' },
      { cupof: '2741697.0', materia_nombre: 'CIENCIAS SOCIALES 1-2', area: 'Ciencias Sociales', ano: 1, id_orientacion: 3, codigo_pid: 'JVW' },
      { cupof: '2741679.0', materia_nombre: 'PRÁCTICAS DEL LENGUAJE 1-2', area: 'Comunicación', ano: 1, id_orientacion: 3, codigo_pid: 'J4B' },
      { cupof: '2741691.0', materia_nombre: 'PRÁCTICAS DEL LENGUAJE 1-2', area: 'Comunicación', ano: 1, id_orientacion: 3, codigo_pid: 'J4B' },
      { cupof: '2741684.0', materia_nombre: 'BIOLOGÍA AMBIENTE Y SALUD', area: 'Exactas', ano: 1, id_orientacion: 3, codigo_pid: 'J3A' },
      { cupof: '2741699.0', materia_nombre: 'BIOLOGÍA AMBIENTE Y SALUD', area: 'Exactas', ano: 1, id_orientacion: 3, codigo_pid: 'J3A' },
      { cupof: '2741682.0', materia_nombre: 'MATEMÁTICA 1-2', area: 'Exactas', ano: 1, id_orientacion: 3, codigo_pid: 'J4I' },
      { cupof: '2741695.0', materia_nombre: 'MATEMÁTICA 1-2', area: 'Exactas', ano: 1, id_orientacion: 3, codigo_pid: 'J4I' },
      { cupof: '2741681.0', materia_nombre: 'LENGUA ADICIONAL 1-2: INGLÉS', area: 'Comunicación', ano: 1, id_orientacion: 3, codigo_pid: 'JIN' },
      { cupof: '2741692.0', materia_nombre: 'LENGUA ADICIONAL 1-2: INGLÉS', area: 'Comunicación', ano: 1, id_orientacion: 3, codigo_pid: 'JIN' },
      { cupof: '2741685.0', materia_nombre: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 1-2', area: 'Tecnología', ano: 1, id_orientacion: 3, codigo_pid: 'J3Z' },
      { cupof: '2741701.0', materia_nombre: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 1-2', area: 'Tecnología', ano: 1, id_orientacion: 3, codigo_pid: 'J3Z' },
      { cupof: '2639649.0', materia_nombre: 'EDUCACIÓN FÍSICA 1-2', area: 'Educación Física', ano: 1, id_orientacion: 3, codigo_pid: 'JFC' },
      { cupof: '2639657.0', materia_nombre: 'EDUCACIÓN FÍSICA 1-2', area: 'Educación Física', ano: 1, id_orientacion: 3, codigo_pid: 'JFC' },
      { cupof: '2639660.0', materia_nombre: 'EDUCACIÓN ARTÍSTICA PLÁSTICA 1-2', area: 'Arte', ano: 1, id_orientacion: 3, codigo_pid: 'JPV' },
      { cupof: '2639663.0', materia_nombre: 'EDUCACIÓN ARTÍSTICA PLÁSTICA 1-2', area: 'Arte', ano: 1, id_orientacion: 3, codigo_pid: 'JPV' },
      { cupof: '2741688.0', materia_nombre: 'SISTEMAS CONTABLES', area: 'Economía', ano: 1, id_orientacion: 3, codigo_pid: 'J2R' },
      { cupof: '2741705.0', materia_nombre: 'SISTEMAS CONTABLES', area: 'Economía', ano: 1, id_orientacion: 3, codigo_pid: 'J2R' },
      { cupof: '2741686.0', materia_nombre: 'GESTIÓN DEL DISEÑO DE EMPRENDIMIENTOS', area: 'Economía', ano: 1, id_orientacion: 3, codigo_pid: 'J2A' },
      { cupof: '2741702.0', materia_nombre: 'GESTIÓN DEL DISEÑO DE EMPRENDIMIENTOS', area: 'Economía', ano: 1, id_orientacion: 3, codigo_pid: 'J2A' },
      
      // 2º AÑO
      { cupof: '2741714.0', materia_nombre: 'CIENCIAS SOCIALES 3-4', area: 'Ciencias Sociales', ano: 2, id_orientacion: 3, codigo_pid: 'JVW' },
      { cupof: '2741710.0', materia_nombre: 'PRÁCTICAS DEL LENGUAJE 3-4', area: 'Comunicación', ano: 2, id_orientacion: 3, codigo_pid: 'J4B' },
      { cupof: '2741716.0', materia_nombre: 'FÍSICA: FENÓMENOS NATURALES', area: 'Exactas', ano: 2, id_orientacion: 3, codigo_pid: 'J5X' },
      { cupof: '2741715.0', materia_nombre: 'MATEMÁTICA 3-4', area: 'Exactas', ano: 2, id_orientacion: 3, codigo_pid: 'J4I' },
      { cupof: '2741712.0', materia_nombre: 'LENGUA ADICIONAL 3-4: INGLÉS', area: 'Comunicación', ano: 2, id_orientacion: 3, codigo_pid: 'JIN' },
      { cupof: '2741719.0', materia_nombre: 'CIUDADANIA, SOCIEDAD Y CULTURA', area: 'Ciencias Sociales', ano: 2, id_orientacion: 3, codigo_pid: 'J2U' },
      { cupof: '2741717.0', materia_nombre: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 3-4', area: 'Tecnología', ano: 2, id_orientacion: 3, codigo_pid: 'J3Z' },
      { cupof: '2741718.0', materia_nombre: 'DERECHO ECONÓMICO Y DEL TRABAJO', area: 'Economía', ano: 2, id_orientacion: 3, codigo_pid: 'JET' },

      // 3º AÑO
      { cupof: '2775363.0', materia_nombre: 'PROBLEMÁTICA SOCIAL ARGENTINA 1-2', area: 'Ciencias Sociales', ano: 3, id_orientacion: 3, codigo_pid: 'JPP' },
      { cupof: '2775351.0', materia_nombre: 'PRÁCTICAS DEL LENGUAJE 5-6', area: 'Comunicación', ano: 3, id_orientacion: 3, codigo_pid: 'J4B' },
      { cupof: '2775366.0', materia_nombre: 'QUÍMICA: TECNOLOGÍA Y SOCIEDAD', area: 'Exactas', ano: 3, id_orientacion: 3, codigo_pid: 'JQQ' },
      { cupof: '2775361.0', materia_nombre: 'MATEMÁTICA 5-6', area: 'Exactas', ano: 3, id_orientacion: 3, codigo_pid: 'J4I' },
      { cupof: '2775357.0', materia_nombre: 'LENGUA ADICIONAL 5-6: INGLÉS', area: 'Comunicación', ano: 3, id_orientacion: 3, codigo_pid: 'JIN' },
      { cupof: '2775369.0', materia_nombre: 'TECNOLOGÍA Y PRÁCTICAS DIGITALES 5-6', area: 'Tecnología', ano: 3, id_orientacion: 3, codigo_pid: 'J3Z' },
      { cupof: '2775372.0', materia_nombre: 'ECONOMÍA Y ECONOMÍA POPULAR', area: 'Economía', ano: 3, id_orientacion: 3, codigo_pid: 'JEE' },
      { cupof: '2775374.0', materia_nombre: 'LEGISLACIÓN Y PRÁCTICA IMPOSITIVA', area: 'Economía', ano: 3, id_orientacion: 3, codigo_pid: 'JLH' },
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
