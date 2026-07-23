import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsGradeValid } from './is-grade-valid.decorator';

export class CreateGradeDto {
  @ApiProperty({ example: 1, description: 'ID del alumno' })
  @IsInt()
  id_alumno: number;

  @ApiProperty({ example: 'CUP-12345', description: 'Código CUPOF de la materia' })
  @IsString()
  cupof: string;

  @ApiProperty({ example: 2024, description: 'Ciclo lectivo (año)' })
  @IsInt()
  ciclo_lectivo: number;

  @ApiPropertyOptional({ example: '8', description: 'Nota del primer cuatrimestre' })
  @IsOptional()
  @IsGradeValid()
  nota_cuat1?: string;

  @ApiPropertyOptional({ example: 0, description: 'Faltas en el primer cuatrimestre' })
  @IsOptional()
  @IsInt()
  faltas_cuat1?: number;

  @ApiPropertyOptional({ example: '9', description: 'Nota del segundo cuatrimestre' })
  @IsOptional()
  @IsGradeValid()
  nota_cuat2?: string;

  @ApiPropertyOptional({ example: 1, description: 'Faltas en el segundo cuatrimestre' })
  @IsOptional()
  @IsInt()
  faltas_cuat2?: number;

  @ApiPropertyOptional({ example: 'APROBADO', description: 'Condición final de la materia' })
  @IsOptional()
  @IsString()
  condicion_materia?: string;

  @ApiPropertyOptional({ example: 'Diciembre', description: 'Mes en que se acreditó la materia' })
  @IsOptional()
  @IsString()
  mes_acreditacion?: string;

  @ApiPropertyOptional({ example: 2024, description: 'Año en que se acreditó la materia' })
  @IsOptional()
  @IsInt()
  anio_acreditacion?: number;
}
