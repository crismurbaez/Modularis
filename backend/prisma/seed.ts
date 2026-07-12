import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  // 7. Materias comunes
  await prisma.materiaCupof.createMany({
    data: [
      { cupof: 'CENS-MAT-1A', materia_nombre: 'Matemática I', area: 'Exactas', modulo: 'Módulo 1', ano: 1, horas_catedra: 3, id_orientacion: 1, codigo_pid: 'MAT' },
      { cupof: 'CENS-PL-1A', materia_nombre: 'Prácticas del Lenguaje I', area: 'Comunicación', modulo: 'Módulo 1', ano: 1, horas_catedra: 4, id_orientacion: 1, codigo_pid: 'PL' },
      { cupof: 'CENS-CS-1A', materia_nombre: 'Ciencias Sociales (Historia/Geografía)', area: 'Ciencias Sociales', modulo: 'Módulo 1', ano: 1, horas_catedra: 4, id_orientacion: 1, codigo_pid: 'CS' },
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
