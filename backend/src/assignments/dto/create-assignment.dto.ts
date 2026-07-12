import { IsString, IsInt, IsOptional, IsNumber, IsDateString, Matches, ValidateIf } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  id_profesor: number;

  @IsString()
  cupof: string;

  @IsOptional()
  @IsString()
  curso_seccion?: string;

  @IsOptional()
  @IsDateString()
  fecha_posesion?: string;

  @IsOptional()
  @IsDateString()
  fecha_cese?: string;

  @IsOptional()
  @IsInt()
  id_situacion_revista?: number;

  // Si id_situacion_revista == 3 (SUPLENTE), requerir CUIL
  @ValidateIf(o => o.id_situacion_revista === 3)
  @Matches(/^\d{2}-\d{8}-\d{1}$/, { message: 'Formato de CUIL inválido' })
  @IsString()
  cuil_profesor_reemplazado?: string;

  @IsOptional()
  @IsNumber()
  nota_desempeno?: number;

  @ValidateIf(o => o.nota_desempeno !== undefined && o.nota_desempeno !== null && o.nota_desempeno < 6)
  @IsString()
  fundamentacion_baja_nota?: string;
}
