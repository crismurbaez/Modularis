# 🏫 Modularis

> Sistema Integral de Gestión de Trayectorias Modulares, Planta Docente y Documentación Oficial para CENS (Sedes Centrales, FINES y Contexto de Encierro).

Modularis es una solución de software diseñada para digitalizar, optimizar y centralizar la compleja administración burocrática de los Centros de Educativos de Nivel Secundario (CENS) en la Provincia de Buenos Aires, Argentina. El sistema está estructurado bajo las normativas vigentes de educación de adultos (Resoluciones 2993/22 y 3463/22) y el procesamiento de documentos oficiales críticos.

---

## 🎯 Problema y Propósito

Las instituciones educativas de adultos operan con estructuras dinámicas y particulares (módulos cuatrimestrales, sedes descentralizadas en penales, e intermitencia de matrícula). La falta de herramientas informáticas específicas obliga a los equipos directivos a realizar un procesamiento manual propenso a errores en planillas complejas.

**Modularis resuelve y automatiza la generación de:**
* **Planilla S.E.T. 4:** Control estadístico de inasistencias docentes y hojas de calificación anual.
* **Actas de Toma de Posesión y Certificaciones de Servicios:** Gestión de altas, ceses y control de situaciones de revista (Titulares, Provisionales, Suplentes).
* **Registro Anual de Calificaciones (Libro Matriz / Calificador):** Consolidación de notas numéricas y estados cualitativos.
* **Boletines y Analíticos Parciales:** Mapeo automatizado de materias estructuradas por códigos presupuestarios **CUPOF** únicos.

---

## 🛡️ Decisiones de Arquitectura y Base de Datos

El motor de persistencia del sistema está diseñado bajo estrictos estándares corporativos para garantizar escalabilidad cero-costo e integridad referencial absoluta:

* **Estructura Relacional en 3NF (Tercera Forma Normal):** Separación estricta de entidades maestras parametrizadas (`curso_seccion`, `orientaciones`, `situacion_revista_docentes`) para mitigar la redundancia de datos.
* **Seguridad y Cifrado (Contexto de Encierro):** Debido a la sensibilidad legal que implica gestionar legajos de estudiantes privados de su libertad, los campos de identidad civil (`dni`, `nombre`, `apellido`, `cuil`) se definen como `VARCHAR` en la capa física para absorber encriptación simétrica (**AES-256-GCM**), aislando los índices numéricos secuenciales (`SERIAL PRIMARY KEY`) para optimizar el rendimiento. Otros datos a cifrar son la `direccion`, `telefono`, `email`, `fecha_nacimiento` y `lugar_nacimiento`.
* **Flexibilidad:** Las escalas e intervalos de notas no están acopladas al código; se gestionan mediante tablas de límites dinámicos (`limites_calificacion_alumnos`), permitiendo adaptabilidad a normas vigentes.

---

## 📂 Estructura del Repositorio

```text
Modularis/
├── database/
│   ├── schema.sql       # Estructura física DDL de la base de datos (PostgreSQL)
│   └── seeds.sql        # Inicialización de catálogos y normativas oficiales de PBA
├── business_rule.md     # Especificación lógica maestra para la capa Backend
└── README.md            # Documentación del proyecto
```

## 🚀 Guía de Inicialización Rápida
Requisitos Previos
Instancia de PostgreSQL local o en la nube (ej: Supabase / Render Tier Gratuito).

Despliegue de la Base de Datos
Clonar el repositorio: [https://github.com/crismurbaez/Modularis.git](https://github.com/crismurbaez/Modularis.git)
```bash
# Bash
git clone https://github.com/crismurbaez/Modularis.git
cd Modularis
# Ejecutar el script de inicialización de tablas (DDL):

# Bash
psql -U tu_usuario -d tu_base_datos -f ./database/schema.sql
# Poblar los catálogos y materias base oficiales de la Provincia (DML):

# Bash
psql -U tu_usuario -d tu_base_datos -f ./database/seeds.sql
```

## ⚙️ Reglas de Negocio Clave (Single Source of Truth)

Toda la lógica de backend procesada por los servicios de la API debe apegarse estrictamente a las especificaciones descritas en el documento institucional adjunto en la raíz: `business_rule.md`.

Este documento regula los interceptores criptográficos, la absorción de leyendas tipo "S/CALIFICAR" en actas, y las restricciones de obligatoriedad de campos de cese para el cómputo del S.E.T. 4.


***

### 🛠️ Tus comandos para hacer el Primer Commit en la terminal:

Una vez que tengas guardados tus tres archivos (`business_rule.md`, `database/schema.sql`, `database/seeds.sql` y el `README.md`), parate en la terminal dentro de tu carpeta `Modularis` y ejecutá estos comandos:

```bash
# 1. Inicializar el repositorio Git
git init

# 2. Agregar todos los archivos creados al área de preparación
git add .

# 3. Hacer el primer commit oficial del proyecto
git commit -m "Chore: inicializar repositorio Modularis con arquitectura de base de datos 3NF y reglas de negocio"
