import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAbsenceDto {
  @IsString()
  periodo_calificacion: string;

  @IsOptional()
  @IsInt()
  faltas_enfermedad?: number;

  @IsOptional()
  @IsInt()
  faltas_causas_priv?: number;

  @IsOptional()
  @IsInt()
  faltas_otras_causas?: number;

  @IsOptional()
  @IsInt()
  faltas_injustificadas?: number;
}
