import { IsString, IsInt, IsOptional, IsNumber, IsDateString, Matches, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({ example: 1, description: 'ID del profesor' })
  @IsInt()
  id_profesor: number;

  @ApiProperty({ example: '1234567', description: 'Código CUPOF de la materia' })
  @IsString()
  cupof: string;

  @ApiProperty({ example: '1A', description: 'Curso o sección asignada' })
  @IsString()
  curso_seccion: string;

  @ApiProperty({ example: '2023-03-01', description: 'Fecha de toma de posesión' })
  @IsDateString()
  fecha_posesion: string;

  @ApiPropertyOptional({ example: '2024-03-01', description: 'Fecha de cese' })
  @IsOptional()
  @IsDateString()
  fecha_cese?: string;

  @ApiProperty({ example: 1, description: 'ID de la situación de revista (ej. Titular, Suplente)' })
  @IsInt()
  id_situacion_revista: number;

  // Si id_situacion_revista == 3 (SUPLENTE), requerir CUIL
  @ApiPropertyOptional({ example: '20-12345678-9', description: 'CUIL del profesor reemplazado (requerido si es suplente)' })
  @ValidateIf(o => o.id_situacion_revista === 3)
  @Matches(/^\d{2}-\d{8}-\d{1}$/, { message: 'Formato de CUIL inválido' })
  @IsString()
  cuil_profesor_reemplazado?: string;

  @ApiPropertyOptional({ example: 8.5, description: 'Nota de desempeño del profesor' })
  @IsOptional()
  @IsNumber()
  nota_desempeno?: number;

  @ApiPropertyOptional({ example: 'Falta de compromiso', description: 'Fundamentación si la nota es menor a 6' })
  @ValidateIf(o => o.nota_desempeno !== undefined && o.nota_desempeno !== null && o.nota_desempeno < 6)
  @IsString()
  fundamentacion_baja_nota?: string;
}
