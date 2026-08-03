import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Catálogos Genéricos')
@Controller('catalogs/:catalog')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro en el catálogo especificado' })
  create(@Param('catalog') catalog: string, @Body() createCatalogDto: any) {
    return this.catalogsService.create(catalog, createCatalogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros del catálogo especificado' })
  findAll(@Param('catalog') catalog: string) {
    return this.catalogsService.findAll(catalog);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro del catálogo por ID' })
  findOne(@Param('catalog') catalog: string, @Param('id') id: string) {
    return this.catalogsService.findOne(catalog, +id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro del catálogo' })
  update(@Param('catalog') catalog: string, @Param('id') id: string, @Body() updateCatalogDto: any) {
    return this.catalogsService.update(catalog, +id, updateCatalogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro del catálogo' })
  remove(@Param('catalog') catalog: string, @Param('id') id: string) {
    return this.catalogsService.remove(catalog, +id);
  }
}
