"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const auth_service_1 = require("./src/auth/auth.service");
async function bootstrap() { const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule); const auth = app.get(auth_service_1.AuthService); try {
    await auth.login('cristina', 'padrepio_74');
}
catch (e) {
    console.error('Login Error:', e);
} await app.close(); }
bootstrap();
//# sourceMappingURL=test-nest.js.map