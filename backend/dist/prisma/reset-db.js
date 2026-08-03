"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const fs = require("fs");
const path = require("path");
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/modularis?schema=public';
const client = new pg_1.Client({ connectionString });
async function resetDatabase() {
    try {
        console.log('🔌 Conectando a la base de datos...');
        await client.connect();
        console.log('🧹 Eliminando esquema público actual...');
        await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;');
        console.log('📄 Leyendo archivo schema.sql...');
        const schemaPath = path.join(__dirname, '../../database/schema.sql');
        const sql = fs.readFileSync(schemaPath, 'utf8');
        console.log('🏗️ Ejecutando script SQL para crear tablas, VISTAS y TRIGGERS...');
        await client.query(sql);
        console.log('✅ ¡Base de datos recreada exitosamente con Arquitectura Híbrida!');
    }
    catch (error) {
        console.error('❌ Error al resetear la base de datos:', error);
    }
    finally {
        await client.end();
        console.log('👋 Conexión cerrada.');
    }
}
resetDatabase();
//# sourceMappingURL=reset-db.js.map