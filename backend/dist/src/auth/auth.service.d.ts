import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dni: string, pass: string): Promise<{
        access_token: string;
        user: {
            nombre: string | null;
            apellido: string | null;
            rol: string;
            permisos: string[];
        };
    }>;
}
