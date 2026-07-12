import { IsString, IsOptional, IsInt, IsDateString, IsBoolean, ValidateIf } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  dni: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;

  @IsOptional()
  @IsString()
  lugar_nacimiento?: string;

  @IsOptional()
  @IsString()
  nacionalidad?: string;

  @IsOptional()
  @IsString()
  primaria_origen?: string;

  @IsOptional()
  @IsString()
  secundario_incompleto?: string;

  @IsOptional()
  @IsBoolean()
  analitico_parcial?: boolean;

  @IsOptional()
  @IsInt()
  id_estado?: number;

  @ValidateIf(o => o.id_estado === 2) // 2 es BAJA
  @IsOptional()
  @IsInt()
  id_motivo_baja?: number;
}
