import { PrismaService } from '../prisma/prisma.service';
export declare class ConfigAlertasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id_config: number;
        tipo_alerta: string;
        activa: boolean | null;
        parametros: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
    findOne(tipo_alerta: string): import(".prisma/client").Prisma.Prisma__ConfiguracionAlertasClient<{
        id_config: number;
        tipo_alerta: string;
        activa: boolean | null;
        parametros: import("@prisma/client/runtime/client").JsonValue | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    upsert(tipo_alerta: string, activa: boolean, parametros: any): Promise<{
        id_config: number;
        tipo_alerta: string;
        activa: boolean | null;
        parametros: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
}
