import { PrismaService } from '../prisma/prisma.service';
export declare class CatalogsService {
    private prisma;
    constructor(prisma: PrismaService);
    private allowedCatalogs;
    private validateCatalog;
    create(catalog: string, createCatalogDto: any): Promise<any>;
    findAll(catalog: string): Promise<any>;
    findOne(catalog: string, id: number): Promise<any>;
    update(catalog: string, id: number, updateCatalogDto: any): Promise<any>;
    remove(catalog: string, id: number): Promise<any>;
    private getIdFieldName;
}
