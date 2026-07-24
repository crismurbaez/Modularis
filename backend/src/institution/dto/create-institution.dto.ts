import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInstitutionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre_completo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombre_siglas?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  numero?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  localidad?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  distrito?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cue?: string;
}
