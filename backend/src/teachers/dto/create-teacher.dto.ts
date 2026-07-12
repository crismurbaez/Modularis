import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  dni: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  cuil: string;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  localidad?: string;

  @IsOptional()
  @IsString()
  distrito?: string;

  @IsOptional()
  @IsString()
  mail_abc?: string;

  @IsOptional()
  @IsString()
  mail_personal?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  titulo_habilitante?: string;

  @IsOptional()
  @IsBoolean()
  titulo_docente?: boolean;
}
