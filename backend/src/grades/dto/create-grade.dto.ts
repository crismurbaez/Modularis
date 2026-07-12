import { IsInt, IsString, IsOptional } from 'class-validator';
import { IsGradeValid } from './is-grade-valid.decorator';

export class CreateGradeDto {
  @IsInt()
  id_alumno: number;

  @IsString()
  cupof: string;

  @IsInt()
  ciclo_lectivo: number;

  @IsOptional()
  @IsGradeValid()
  nota_cuat1?: string;

  @IsOptional()
  @IsInt()
  faltas_cuat1?: number;

  @IsOptional()
  @IsGradeValid()
  nota_cuat2?: string;

  @IsOptional()
  @IsInt()
  faltas_cuat2?: number;

  @IsOptional()
  @IsString()
  condicion_materia?: string;

  @IsOptional()
  @IsString()
  mes_acreditacion?: string;

  @IsOptional()
  @IsInt()
  anio_acreditacion?: number;
}
