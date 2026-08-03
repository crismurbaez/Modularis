import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatalogsService {
  constructor(private prisma: PrismaService) {}

  private allowedCatalogs = [
    'orientacion',
    'cursoSeccion',
    'situacionRevistaDocente',
    'estadoAlumno',
    'motivoBajaAlumno',
    'condicionMateria',
    'causaInasistenciaAlumnos',
    'motivoInasistenciasDocentes',
    'materia',
    'calendarioAcademico'
  ];

  private validateCatalog(catalog: string) {
    if (!this.allowedCatalogs.includes(catalog)) {
      throw new BadRequestException(`El catálogo '${catalog}' no es válido o no está permitido.`);
    }
  }

  async create(catalog: string, createCatalogDto: any) {
    this.validateCatalog(catalog);
    return (this.prisma as any)[catalog].create({ data: createCatalogDto });
  }

  async findAll(catalog: string) {
    this.validateCatalog(catalog);
    return (this.prisma as any)[catalog].findMany();
  }

  async findOne(catalog: string, id: number) {
    this.validateCatalog(catalog);
    const idField = this.getIdFieldName(catalog);
    const result = await (this.prisma as any)[catalog].findFirst({
      where: { [idField]: id }
    });
    if (!result) throw new NotFoundException(`Registro no encontrado en ${catalog}`);
    return result;
  }

  async update(catalog: string, id: number, updateCatalogDto: any) {
    this.validateCatalog(catalog);
    const idField = this.getIdFieldName(catalog);
    await this.findOne(catalog, id);
    
    return (this.prisma as any)[catalog].update({
      where: { [idField]: id },
      data: updateCatalogDto
    });
  }

  async remove(catalog: string, id: number) {
    this.validateCatalog(catalog);
    const idField = this.getIdFieldName(catalog);
    await this.findOne(catalog, id);
    
    return (this.prisma as any)[catalog].delete({
      where: { [idField]: id }
    });
  }
  
  private getIdFieldName(catalog: string): string {
    const map: Record<string, string> = {
      'orientacion': 'id_orientacion',
      'cursoSeccion': 'id_curso_seccion',
      'situacionRevistaDocente': 'id_situacion_revista',
      'estadoAlumno': 'id_estado',
      'motivoBajaAlumno': 'id_motivo_baja',
      'condicionMateria': 'id_condicion',
      'causaInasistenciaAlumnos': 'id_causa',
      'motivoInasistenciasDocentes': 'id_motivo',
      'materia': 'id_materia',
      'calendarioAcademico': 'id_calendario'
    };
    return map[catalog] || 'id';
  }
}
