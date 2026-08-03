import { CreateInstitutionDto } from './dto/create-institution.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class InstitutionService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrUpdate(createInstitutionDto: CreateInstitutionDto, files?: any): Promise<{
        descripcion: string | null;
        direccion: string | null;
        localidad: string | null;
        distrito: string | null;
        telefono: string | null;
        nombre_completo: string | null;
        nombre_siglas: string | null;
        numero: string | null;
        mail: string | null;
        cue: string | null;
        id_datos: number;
        icono: string | null;
        imagen_sello: string | null;
    }>;
    findOne(): import(".prisma/client").Prisma.Prisma__DatosInstitucionClient<{
        descripcion: string | null;
        direccion: string | null;
        localidad: string | null;
        distrito: string | null;
        telefono: string | null;
        nombre_completo: string | null;
        nombre_siglas: string | null;
        numero: string | null;
        mail: string | null;
        cue: string | null;
        id_datos: number;
        icono: string | null;
        imagen_sello: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
