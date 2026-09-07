Para integrar la carga de notas masiva adaptada a celulares y la estrategia de previsualización e impresión de documentos oficiales, aquí tenés el **texto completo con el análisis de los faltantes y ajustes**, listo para ser incorporado a tu plan de implementación.

---

# 📝 Actualización y Expansión del Plan de Frontend: Módulos de Calificación Masiva y Reportes Oficiales

Este documento amplía el plan de construcción del frontend de **Modularis**, incorporando los requerimientos específicos de UX/UI para la grilla de calificaciones adaptable a dispositivos móviles y el flujo interactivo de previsualización e impresión de documentos oficiales (S.E.T. 4, Analíticos Parciales, Boletines, Toma de Posesión y Certificaciones de Servicios).

---

## 🛠️ Nuevos Módulos y Ajustes Arquitectónicos

### 1. Módulo de Carga Masiva de Calificaciones (Grilla tipo Hoja de Cálculo Adaptativa)

Para optimizar el tiempo de los docentes y preceptores al momento de volcar las notas de los boletines cuatrimestrales (1º y 2º tramo), se rediseñará la interfaz de la siguiente manera:

* **En Computadoras (Desktop - Vista Matriz):** Se utilizará una **única gran tabla editable** por curso/sección (tipo hoja de cálculo Excel) donde cada fila representará a un alumno inscripto (`cursadas_notas`) y las columnas contendrán las notas (`nota_cuat1`, `nota_cuat2`), inasistencias (`faltas_cuat1`, `faltas_cuat2`) y condiciones finales (Aprobado / Pendiente).

* **Adaptabilidad en Celulares (Mobile - Vista por Tarjetas / Acordeón):** Para garantizar que el sistema sea usable en pantallas pequeñas sin romper la tabla horizontalmente, la interfaz detectará el ancho de pantalla (`@media query`):
* En dispositivos móviles, la grilla masiva se transformará en una **lista de tarjetas colapsables (Cards)** donde cada alumno se despliega individualmente.
* Al expandir la tarjeta del alumno, se habilitarán los inputs táctiles optimizados para el ingreso rápido de notas y faltas, manteniendo la misma validación de negocio en tiempo real.

* **Validación Normativa Inmediata:** Mediante inputs reactivos, si el usuario introduce una nota inválida (por ejemplo, fuera de rango o un número menor a 4 sin usar la leyenda oficial permitida como `"S/CALIFICAR"`), la celda o input cambiará dinámicamente a color rojo, bloqueando el botón de guardado masivo hasta corregir el error.

### 2. Estrategia de Previsualización e Impresión de Documentos Oficiales

Para evitar impresiones erróneas y garantizar que los documentos oficiales salgan perfectos de la primera vez, se implementará un flujo de dos pasos:

* **Paso 1: Previsualización en Pantalla (HTML/CSS Print View):** Al hacer clic en "Generar Reporte" (ej. Analítico Parcial o Boletín), el backend devolverá la estructura de datos que se renderizará en una **vista modal o pantalla dedicada de previsualización**. Esta vista simulará exactamente los márgenes y proporciones de una hoja A4/Legal utilizando estilos CSS de impresión (`@media print`).
* **Paso 2: Generación Definitiva y Descarga Binaria (Puppeteer):** Una vez que el directivo o preceptor visualiza que los datos son correctos en pantalla, hará clic en el botón **"Imprimir / Descargar PDF Oficial"**. En ese momento, el sistema activará un estado de carga (`loader` con spinner que dirá *"Generando Documento Oficial..."*) mientras el backend procesa el HTML mediante Puppeteer en segundo plano. Finalmente, devolverá el archivo en formato binario (`application/pdf`) para que se abra el diálogo nativo de impresión o se descargue directamente al equipo.

---

## 📋 Faltantes Críticos Incorporados al Cronograma

1. **Módulo de Seguridad y Accesos:**
* Pantalla de Gestión de Usuarios (CRUD con DNI, Nombre, Contraseña y Roles).

* Matriz de Permisos por Roles mediante catálogos de Checkboxes interactivos.

2. **Módulo de Docentes y Legajos:**
* Pantalla de Carga de Profesores (Datos personales, contactos y validación de correo `@abc.gob.ar`).

* Pantalla de Designaciones Docentes (Con autocompletado predictivo para Profesores y Materias CUPOF, y aparición dinámica del campo *CUIL Profesor Reemplazado* si la situación de revista seleccionada es "Suplente").

* Módulo de Inasistencias Docentes para la confección de la Planilla S.E.T. 4 (con contadores por enfermedad, causas privadas e injustificadas).

3. **Módulo Académico Modular:**
* Gestión de Materias y CUPOF vinculadas a los Códigos PID y las diferentes orientaciones del CENS (Ciencias Sociales, Economía, Informática, Agro y Ambiente, Ciencias Naturales).