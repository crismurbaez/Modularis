### 🔔 Sistema Integral de Notificaciones y Alertas (Modularis)

Para un entorno institucional complejo como un CENS en Contexto de Encierro, un sistema de gestión escolar moderno no solo debe almacenar datos, sino **orquestar los tiempos administrativos** de la DGCyE.

Listado completo de alertas y notificaciones organizadas por rol, diseñadas para asegurar que ninguna obligación legal (como el S.E.T. 4 o el cierre de actas) se pase por alto.

---

### 1. 👨‍🏫 Panel y Alertas para Profesores

* **Alerta de Cierre de Notas Cuatrimestrales:**
* *Cuándo se dispara:* 7 días y 24 horas antes de la fecha límite establecida por secretaría para el cierre del 1º y 2º cuatrimestre.
* *Propósito:* Evitar que los profesores se retrasen en el volcado de notas de los boletines.


* **Aviso de Inconsistencia Normativa en Calificación:**
* *Cuándo se dispara:* En tiempo real, al momento de tipear una nota en la grilla masiva si se intenta ingresar un número inválido (ej. menor a 4 sin usar la leyenda oficial).
* *Propósito:* Prevenir errores antes de que el backend rechace la transacción.


* **Notificación de Asignación de Materia (Toma de Posesión):**
* *Cuándo se dispara:* Cuando el directivo o secretario registra una nueva designación docente a un CUPOF.
* *Propósito:* Informar al docente las condiciones de su alta, fecha de posesión y situación de revista (Titular, Provisional, Suplente).



---

### 2. 📋 Panel y Alertas para Preceptores

* **Control de Carga de Inasistencias en Cursadas:**
* *Cuándo se dispara:* Semanualmente o al cumplirse la fecha de corte (ej. notas al 28/6 o 29/11).
* *Propósito:* Recordar al preceptor que debe verificar que las faltas de los alumnos en `cursadas_notas` estén completas para poder emitir los boletines sin celdas vacías.


* **Alerta de Límite de Inasistencias (Régimen de Adultos):**
* *Cuándo se dispara:* Cuando un alumno acumuló una cantidad de faltas que pone en riesgo su regularidad según la normativa provincial.
* *Propósito:* Permitir al equipo directivo y de preceptoria intervenir a tiempo con el estudiante.


* **Aviso de Disponibilidad para Impresión de Boletines:**
* *Cuándo se dispara:* Tan pronto como todos los profesores de un curso/sección hayan cerrado sus actas de notas del cuatrimestre.
* *Propósito:* Habilitar el botón de descarga masiva de PDFs para la entrega formal.



---

### 3. 🏛️ Panel y Alertas para Directivos y Secretarios

* **Alerta de Confección de Planillas S.E.T. 4:**
* *Cuándo se dispara:* Al finalizar el período de calificación anual o al cumplirse los plazos estipulados por inspección distrital.
* *Propósito:* Recordar al director que debe revisar el acumulado de inasistencias de los profesores (`inasistencias_docentes`) y generar la Hoja de Calificación Personal Docente lista para firmar.


* **Aviso de Próximo Cese de Docentes Suplentes:**
* *Cuándo se dispara:* 30 días antes de la `fecha_cese` registrada en la tabla de designaciones.
* *Propósito:* Anticipar la revalidación de la suplencia o el cese formal de horas cátedra ante secretaría de asuntos docentes (SAD).


* **Alerta de Legajos Incompletos (Alumnos o Profesores):**
* *Cuándo se dispara:* Al intentar emitir un certificado oficial (como un Analítico Parcial o una Certificación de Servicios) si faltan datos obligatorios (ej. lugar de nacimiento, CUIL o título habilitante).
* *Propósito:* Bloquear la emisión de documentos con errores formales que la DGCyE rechazaría.



---

### 4. ⚙️ Alertas de Sistema (Para el Administrador / IT)

* **Alerta de Fallo en Interceptores Criptográficos:**
* *Cuándo se dispara:* Si ocurre una excepción al intentar desencriptar datos sensibles (`dni`, `nombre_apellido`) en tiempo de ejecución.
* *Propósito:* Detectar problemas de integridad en las llaves de cifrado del archivo `.env`.


* **Notificación de Integridad Referencial (Registros Huérfanos):**
* *Cuándo se dispara:* Ante intentos fallidos de borrado masivo si las restricciones `ON DELETE CASCADE` no se aplicaron correctamente en las tablas intermedias (`designaciones` o `cursadas_notas`).

