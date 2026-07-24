import { ConfigAlertasService } from './config-alertas.service';
export declare class ConfigAlertasController {
    private readonly configAlertasService;
    constructor(configAlertasService: ConfigAlertasService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id_config: number;
        tipo_alerta: string;
        activa: boolean | null;
        parametros: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
    findOne(tipo: string): import(".prisma/client").Prisma.Prisma__ConfiguracionAlertasClient<{
        id_config: number;
        tipo_alerta: string;
        activa: boolean | null;
        parametros: import("@prisma/client/runtime/client").JsonValue | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    upsert(tipo: string, configData: {
        activa: boolean;
        parametros: any;
    }): Promise<{
        id_config: number;
        tipo_alerta: string;
        activa: boolean | null;
        parametros: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
}
