import { AuthService } from './auth.service';
export declare class LoginDto {
    username: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signInDto: LoginDto): Promise<{
        access_token: string;
        user: {
            username: string;
            rol: string;
            permisos: string[];
        };
    }>;
}
