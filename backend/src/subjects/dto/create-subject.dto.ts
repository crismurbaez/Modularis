import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  materia_nombre: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  area?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  modulo?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  anio?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  horas_catedra?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  id_orientacion?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  codigo_pid?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
