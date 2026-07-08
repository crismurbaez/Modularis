# 📘 Documento de Especificación de Reglas de Negocio (BRD)
## Sistema de Gestión Escolar para CENS (Contexto de Encierro y FINES) - PBA
**Nivel:** Arquitectura Backend Senior
**Objetivo:** Servir como contexto maestro e instrucciones de validación lógica para el desarrollo de la API.

---

## 1. Reglas Lógicas de Calificaciones y Cursadas (`cursadas_notas`)

[cite_start]El sistema opera bajo un plan de estudios **Modular y Cuatrimestral** (Resoluciones 2993/22 y 3463/22). Las calificaciones deben cumplir con las siguientes restricciones en la capa de servicios del backend:

### 1.1. Tipado y Absorción de Leyendas Cualitativas
* [cite_start]**Tipo de Dato en Base de Datos:** `VARCHAR(15)`[cite: 1550].
* [cite_start]**Inputs Válidos (Casteo Lógico):** * Valores numéricos enteros o decimales dentro del rango paramétrico definido en la tabla `limites_calificacion_alumnos` (Normalmente de `1` a `10`, aprobando con `4` o más)[cite: 1533].
  * [cite_start]El string exacto `"S/CALIFICAR"` o `"SIN CALIFICAR"`[cite: 1548, 2922]. [cite_start]Es obligatorio permitir este texto debido a las dinámicas de Contexto de Encierro y materias especiales (ej: Educación Física o Educación Artística en CENS frecuentemente registran esta leyenda en los documentos oficiales)[cite: 2845, 2847, 2849].

### 1.2. Reglas de Transición de Estado y Acreditación

[Nota Cuat 1] Y [Nota Cuat 2] Procesadas
│
▼
¿Ambas son numéricas ≥ 4? ───(SÍ)───► Condición: "APROBADO" ──► Requerir: Mes/Año Acreditación
│
(NO)
▼
Condición: "PENDIENTE" ──────► Limpiar/Ignorar campos de acreditación final

* **Lógica del validador:**
  * SI `condicion_materia` == `"APROBADO"`, el backend DEBE exigir obligatoriamente que `mes_acreditacion` (ej: 'Diciembre', 'Marzo') y `anio_acreditacion` (ej: 2026) NO sean nulos y contengan datos coherentes[cite: 1527, 1534].
  * SI `condicion_materia` == `"PENDIENTE"`, los campos `mes_acreditacion` y `anio_acreditacion` deben setearse como `NULL` de manera automática en el payload antes de la persistencia[cite: 1534].

---

## 2. Reglas Lógicas del Módulo Docente y Planilla S.E.T. 4

La tabla `inasistencias_docentes` y `designaciones` alimentan la Hoja de Calificación Personal Docente (Planilla S.E.T. 4 de la DGCyE)[cite: 1740, 1747].

### 2.1. Validación del Concepto Técnico y Notas de Desempeño
* **Rango de Calificación:** La columna `nota_desempeño` de la tabla `designaciones` acepta valores decimales promediados entre `1.00` y `10.00`[cite: 1762].
* **Restricción de Alerta Primaria:** Si el Directivo intenta cargar una `nota_desempeño` **inferior a 6.00 puntos**, el backend debe rechazar la transacción simple y exigir un campo de texto extra llamado `fundamentacion_baja_nota` (Requisito estricto de la normativa S.E.T. 4: *"En caso de que el agente calificador asignara nota inferior a 6 puntos, deberá fundamentar en hoja aparte"*)[cite: 1824].

### 2.2. Integridad en Actas de Toma de Posesión (`designaciones`)
* **Lógica del Reemplazo (Suplencias):**
  * El endpoint de creación de una designación debe evaluar el campo `id_situacion_revista` (obtenido de la tabla maestra)[cite: 1612].
  * SI `situacion_revista` == `"SUPLENTE"`, el backend DEBE validar que el campo `cuil_profesor_reemplazado` NO esté vacío y cumpla con la estructura de regex para CUIL (`^\d{2}-\d{8}-\d{1}$`)[cite: 1526, 1614].
  * SI `situacion_revista` == `"TITULAR"` o `"PROVISIONAL"`, el campo `cuil_profesor_reemplazado` se fuerza a `NULL`[cite: 1867].

### 2.3. Control Estadístico de Inasistencias (S.E.T. 4 Punto 1.14)
* El backend debe computar la suma total de las faltas guardadas en `inasistencias_docentes` (`faltas_enfermedad + faltas_causas_priv + faltas_otras_causas + faltas_injustificadas`)[cite: 1795, 1796, 1798].
* Las inasistencias acumuladas impactan el cálculo del software para las "Condiciones Profesionales" (Punto 2.2) automatizando alertas si el docente resiente el desarrollo de la tarea por ausencias frecuentes[cite: 1848].

---

## 3. Reglas de Identidad y Seguridad (Contexto de Encierro)

Debido a que el CENS gestiona matrículas de alumnos privados de su libertad (Sedes en Penales/Contexto de Encierro), la base de datos cuenta con campos `VARCHAR` en los identificadores civiles (`dni`, `cuil`) para admitir cifrado[cite: 1479, 1516].

### 3.1. Interceptor Criptográfico (Capa de Infraestructura)
* El backend debe implementar un **Interceptor / Hook global de ciclo de vida** (como los *Transformers* de TypeORM/Prisma en NestJS o *Mutators* en Laravel).
* **Antes de Guardar (`BeforeInsert` / `BeforeUpdate`):** Los campos `dni` y `nombre_apellido` de las tablas `alumnos` y `profesores` deben ser interceptados y encriptados utilizando un algoritmo simétrico robusto (**AES-256-GCM**) antes de tocar la base de datos PostgreSQL[cite: 1685].
* **Al Recuperar (`AfterLoad` / `AfterFind`):** El backend debe desencriptar transparentemente estos strings utilizando la variable de entorno `CRYPTO_KEY` antes de enviar la respuesta JSON a los clientes autorizados.
* **Impacto Técnico:** Al ser el `id_alumno` y el `id_profesor` de tipo secuencial entero (`SERIAL`), las claves foráneas en `cursadas_notas` y `designaciones` operan a velocidad nativa sin ralentizar el servidor por búsquedas cifradas[cite: 1516].

---

## 4. Reglas del Ciclo de Vida del Estudiante (`alumnos`)

### 4.1. Coherencia en Estados de Matrícula
* SI `id_estado` corresponde a `"BAJA"`, el sistema exige registrar el `id_motivo_baja` (mapeado desde la tabla de motivos: Laboral, Traslado, etc.)[cite: 1632, 1633].
* SI `id_estado` corresponde a `"REGULAR"`, cualquier intento de enviar un motivo de baja debe ser sanitizado y borrado de la petición[cite: 1632, 1633].
* **Cálculo Dinámico de Edad:** El campo `edad` puede ser persistido para reportes estáticos, pero el servicio de negocio debe recalcularlo dinámicamente comparando la `fecha_nacimiento` con el año del `ciclo_lectivo` en curso para asegurar que se cumple el parámetro legal de educación de adultos[cite: 1623, 1624].