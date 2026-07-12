## Plan de Arquitectura Backend: Modularis (NestJS)

### Fase 1: Inicialización y Configuración Base (Core)

El primer paso es armar los cimientos del proyecto con las mejores prácticas de seguridad y configuración de entornos, especialmente considerando que vas a manejar datos sensibles de alumnos en Contexto de Encierro.

* **Setup del Proyecto:** Generar la aplicación con Nest CLI y configurar estrictamente TypeScript.
* **Gestión de Entornos:** Implementar `@nestjs/config` para manejar variables de entorno (credenciales de Supabase/Render, claves JWT, semillas de encriptación).
* **Seguridad Global:** Integrar `Helmet` para cabeceras HTTP y configurar `CORS` limitando el acceso solo a tu futuro frontend en Angular.
* **Documentación Viva:** Configurar Swagger (`@nestjs/swagger`) desde el día cero para que tu API esté documentada automáticamente para tu portfolio.

---

### Fase 2: Capa de Datos y Cifrado

Aquí conectaremos la base de datos PostgreSQL y aplicaremos tu experiencia en seguridad.

* 
**Conexión a Base de Datos:** Configurar el ORM elegido para sincronizar con la base de datos PostgreSQL alojada en Supabase o Render.


* 
**Servicio de Criptografía (CryptoService):** Crear un servicio dedicado usando el módulo `crypto` nativo de Node.js para encriptar y desencriptar en tiempo de ejecución los campos `nombre_apellido` y `dni`.


* **Interceptores de ORM:** Configurar "hooks" o "suscriptores" en el ORM para que el cifrado de datos sensibles se realice de forma automática antes de guardar en la base de datos, y se descifre al leer.

---

### Fase 3: Diseño de Módulos de Dominio (DDD)

En NestJS, cada entidad principal de tu base de datos debe tener su propio módulo independiente y aislado.

| Módulo NestJS | Responsabilidad Principal | Reglas de Negocio Clave |
| --- | --- | --- |
| **AuthModule** | Autenticación y Autorización. | JWT, control de roles (Directivo vs. Profesor).

 |
| **TeachersModule** | Gestión de `profesores` e `inasistencias_docentes`. | CRUD de legajos cifrados, cómputo de licencias para Planilla S.E.T. 4.

 |
| **StudentsModule** | Gestión de `alumnos`. | CRUD de legajos cifrados, control de estado (Regular, Baja, Pase).

 |
| **AcademicsModule** | Gestión de `materias_cupof` y catálogos. | Cruce de códigos PID y orientaciones (Economía, Arte, etc.).

 |
| **AssignmentsModule** | Gestión de `designaciones`. | Vinculación Profesor-Materia, fechas de cese y control de suplentes.

 |
| **GradesModule** | Gestión de `cursadas_notas`. | Lógica estricta de Boletines: validación de notas numéricas vs. texto ("S/CALIFICAR").

 |

---

### Fase 4: Lógica de Negocio y Validadores (DTOs)

Esta es la capa donde tu documento `business_rules.md` cobra vida.

* **Data Transfer Objects (DTOs):** Crear clases usando `class-validator` y `class-transformer` para asegurar que ningún dato erróneo llegue a la base de datos.
* 
**Validación Custom de Calificaciones:** Programar un validador personalizado (Custom Decorator) que acepte números del 4 al 10 para acreditación final, o strings específicos permitidos por la normativa de la Provincia de Buenos Aires (como "S/CALIFICAR" o "PENDIENTE").


* 
**Pipes de Transformación:** Sanitizar los datos de entrada (por ejemplo, asegurar que los CUILs mantengan el formato correcto).



---

### Fase 5: Reportes y Servicios de Exportación

El valor agregado de este software para la escuela y para tu currículum es la automatización de la burocracia.

* **PDF Service:** Integrar una librería como `pdfmake` o `puppeteer` para generar los documentos oficiales.
* 
**Endpoint de Analíticos:** Un controlador que reciba el ID del alumno, cruce la información de sus módulos aprobados y devuelva el "Analítico Parcial Secundaria" formateado.


* Endpoint S.E.T. 4: Un controlador que consolide las inasistencias y situación de revista del docente para devolver la "Hoja de Calificación Personal" lista para imprimir.



---

### Fase 6: Pruebas y Despliegue

Para demostrar un nivel Senior absoluto en las entrevistas.

* 
**Testing Unitario:** Escribir tests con Jest (incluido en NestJS) enfocados específicamente en el `CryptoService` y en el cálculo de condiciones de materias (Aprobado vs. Pendiente).


* **Despliegue (CI/CD):** Configurar un archivo de GitHub Actions básico para verificar que el código compile y pase las pruebas antes de permitir un *merge*.

