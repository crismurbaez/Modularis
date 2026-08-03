import { CatalogsService } from './catalogs.service';
export declare class CatalogsController {
    private readonly catalogsService;
    constructor(catalogsService: CatalogsService);
    create(catalog: string, createCatalogDto: any): Promise<any>;
    findAll(catalog: string): Promise<any>;
    findOne(catalog: string, id: string): Promise<any>;
    update(catalog: string, id: string, updateCatalogDto: any): Promise<any>;
    remove(catalog: string, id: string): Promise<any>;
}
