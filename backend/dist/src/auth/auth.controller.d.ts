import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signInDto: Record<string, any>): Promise<{
        access_token: string;
        user: {
            nombre: string | null;
            apellido: string | null;
            rol: string;
            permisos: string[];
        };
    }>;
}
