-- INSTRUCCIONES PARA CREAR SUPERUSUARIO Y DIRECTORA MANUALMENTE
-- 1. Primero, debes generar un hash Bcrypt para tu contraseña. 
--    Puedes hacerlo corriendo este comando en la terminal (si tienes Node):
--    node -e "require('bcrypt').hash('TU_CONTRASEÑA_AQUI', 10).then(console.log)"
-- 2. Copia el hash resultante (empezará con $2b$10$...)
-- 3. Reemplaza el texto 'HASH_AQUI' en las siguientes sentencias SQL por tu hash generado.
-- 4. Ejecuta estas sentencias en tu gestor de base de datos (pgAdmin, DBeaver, etc.)

-- ==========================================
-- CREACIÓN DEL SUPERADMINISTRADOR (Oculto)
-- ==========================================
INSERT INTO usuarios (username, password_hash, id_rol, activo)
VALUES ('superadmin', 'HASH_AQUI', 1, true);

-- ==========================================
-- CREACIÓN DE LA DIRECTORA (Yanina)
-- ==========================================
-- A. Crear primero sus datos personales (Si tienes un hash para el DNI/CUIL, reemplázalo aquí, 
--    pero si en esta instancia no está encriptado, puedes dejarlo así si tu backend lo manejará luego, 
--    aunque lo ideal es que insertes los hashes generados por el CryptoService).
INSERT INTO personal_docente (dni, cuil, nombre, apellido)
VALUES ('00000000', '27000000000', 'Yanina', 'Poncela');

-- B. Obtener el id_personal recién creado y asignarlo al usuario. (Suponiendo que es el id_personal = 1)
INSERT INTO usuarios (username, password_hash, id_rol, id_personal, activo)
VALUES ('00000000', 'HASH_AQUI', 2, (SELECT id_personal FROM personal_docente WHERE dni = '00000000'), true);
