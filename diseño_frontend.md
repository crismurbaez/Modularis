
# 🎨 Sistema de Diseño: Modularis

## 1. Filosofía y Personalidad de la Marca

Modularis debe transmitir **Autoridad, Claridad y Modernidad**. Es un sistema de gestión educativa de nivel provincial (CENS), por lo tanto, no debe parecer un juguete ni una red social.

* **Minimalismo Funcional:** Menos ruido visual, más espacio en blanco (whitespace).
* **Seriedad Premium:** Uso de colores oscuros elegantes contrastados con fondos limpios.
* **Foco en el Dato:** La información (calificaciones, legajos) es la protagonista. La interfaz es solo el marco.

---

## 2. Paleta de Colores

Para lograr un aspecto premium, nos alejaremos de los colores primarios brillantes y optaremos por tonos desaturados, profundos y elegantes.

### Colores Principales (Institucionales)

* **Azul Modularis (Primary):** `#1E293B` (Slate 800) - Un azul marino grisáceo muy oscuro. Se usará para el Sidebar, el header principal y el texto destacado. Transmite extrema solidez y profesionalismo.
* **Acento Tecnológico (Accent):** `#2563EB` (Blue 600) - Un azul vibrante pero serio. Solo para botones de acción principal (Ej: "Guardar Planilla", "Iniciar Sesión") y enlaces.

### Colores de Fondo y Superficies (Neutros)

* **Fondo de la Aplicación (Background):** `#F8FAFC` (Slate 50) - Un gris/azulado casi blanco. Evita el blanco puro (`#FFFFFF`) en el fondo general para no cansar la vista.
* **Superficies (Tarjetas, Modales):** `#FFFFFF` - Blanco puro. Al poner tarjetas blancas sobre el fondo `#F8FAFC` se crea una elevación sutil y muy elegante.
* **Texto Principal:** `#334155` (Slate 700) - Gris oscuro para legibilidad óptima (nunca negro puro).
* **Texto Secundario:** `#64748B` (Slate 500) - Para subtítulos, placeholders o datos menos relevantes.

### Colores de Estado (Feedback semántico)

Deben ser tonos pastel o desaturados para no gritarle al usuario.

* **Éxito (Aprobado / Guardado):** Fondo `#DCFCE7`, Texto `#15803D`.
* **Alerta (Pendiente / Faltas altas):** Fondo `#FEF9C3`, Texto `#A16207`.
* **Error (Desaprobado / Inactivo):** Fondo `#FEE2E2`, Texto `#B91C1C`.

---

## 3. Tipografía

Una tipografía premium define el 50% del diseño. Evitaremos fuentes anticuadas como Arial o Times New Roman.

* **Fuente Principal (UI y Datos):** `Inter` o `Roboto` (Ambas de Google Fonts, gratuitas y de altísima calidad). Son limpias, geométricas y perfectas para tablas de datos y números (vital para calificaciones y DNI).
* **Pesos Tipográficos:**
* *Regular (400):* Para el texto general, inputs y datos en tablas.
* *Medium (500):* Para encabezados de tablas y botones.
* *SemiBold (600):* Para títulos de pantallas (`h1`, `h2`) y nombres de alumnos/docentes destacados.



---

## 4. Formas, Bordes y Sombras

El estilo "Premium Moderno" actual huye de los bordes completamente redondeados (tipo pastilla) y de las esquinas puntiagudas (muy de los 90s).

* **Border Radius (Esquinas):** * Utilizar un redondeo sutil de **6px a 8px** (`rounded-md` o `rounded-lg` en Tailwind).
* Esto aplica para botones, tarjetas (cards), modales y campos de texto (inputs). Transmite amabilidad sin perder seriedad.


* **Sombras (Elevación):**
* Las sombras deben ser **extremadamente suaves y difuminadas**, apuntando hacia abajo. No deben parecer manchas oscuras.
* *Ejemplo CSS:* `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);`
* Se usarán para despegar las tarjetas blancas (donde están las tablas o formularios) del fondo gris claro.


* **Bordes de Separación:** Líneas muy finas (`1px solid #E2E8F0`) para separar filas en una tabla o secciones dentro de un formulario.

---

## 5. Diseño de Componentes Clave

### A. Campos de Texto (Inputs y Selects)

* **Estado normal:** Fondo casi blanco (`#F1F5F9`), sin borde visible o con un borde muy sutil, texto oscuro.
* **Estado Activo (Focus):** Al hacer clic, el fondo pasa a blanco puro y aparece un borde azul (`#2563EB`) o un anillo de enfoque suave. Esto le indica al usuario exactamente dónde está escribiendo.
* **Labels:** Siempre fuera del input, arriba, en tamaño pequeño y peso *Medium*, color gris secundario.

### B. Botones

* **Botón Primario:** Fondo Azul Acento (`#2563EB`), texto blanco, sin bordes. Hover: Azul un poco más oscuro.
* **Botón Secundario (Cancelar, Volver):** Fondo transparente, texto gris oscuro, borde sutil (`1px solid #CBD5E1`).
* **Botón Terciario (Acciones menores):** Solo texto con un icono, sin fondo ni bordes.

### C. Tablas de Datos (El componente más usado)

* Encabezados (`<th>`) con fondo gris muy claro (`#F8FAFC`), texto en mayúsculas pequeñas (uppercase), tamaño reducido y peso *SemiBold*.
* Filas con un *hover* sutil (al pasar el mouse, la fila se pone de un color gris ultra claro para no perderse en la lectura de calificaciones de punta a punta).
* Alternancia de color (Zebra striping) **no recomendada** en diseños modernos premium; es mejor usar líneas divisorias finas.

---

## 6. Iconografía y Espaciado

* **Iconos:** Utilizar familias de iconos de línea (Outlined Icons) con grosores consistentes de 1.5px o 2px. Recomendación: **Lucide Icons**, **Heroicons** o **Phosphor Icons**. Evitar iconos rellenados (Solid) o con muchos colores.
* **Espaciado (Padding/Margin):** El sistema debe respirar. Usar márgenes generosos entre las diferentes secciones. Por ejemplo, dejar un margen de 24px o 32px entre el título de la pantalla y la tabla de datos. La densidad apretada genera estrés visual.