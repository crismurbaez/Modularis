import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
export declare class InstitutionController {
    private readonly institutionService;
    constructor(institutionService: InstitutionService);
    createOrUpdate(createInstitutionDto: CreateInstitutionDto, files: {
        icono?: Express.Multer.File[];
        imagen_sello?: Express.Multer.File[];
    }): Promise<{
        id_datos: number;
        nombre_completo: string | null;
        nombre_siglas: string | null;
        numero: string | null;
        descripcion: string | null;
        direccion: string | null;
        localidad: string | null;
        distrito: string | null;
        mail: string | null;
        icono: string | null;
        imagen_sello: string | null;
        telefono: string | null;
        cue: string | null;
    }>;
    findOne(): import(".prisma/client").Prisma.Prisma__DatosInstitucionClient<{
        id_datos: number;
        nombre_completo: string | null;
        nombre_siglas: string | null;
        numero: string | null;
        descripcion: string | null;
        direccion: string | null;
        localidad: string | null;
        distrito: string | null;
        mail: string | null;
        icono: string | null;
        imagen_sello: string | null;
        telefono: string | null;
        cue: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
