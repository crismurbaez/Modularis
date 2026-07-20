import { AuthService } from './auth.service';
export declare class LoginDto {
    dni: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signInDto: LoginDto): Promise<{
        access_token: string;
        user: {
            nombre: string | null;
            apellido: string | null;
            rol: string;
            permisos: string[];
        };
    }>;
}
