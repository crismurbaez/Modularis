import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ example: '12345679', description: 'El DNI del profesor' })
  @IsString()
  dni: string;

  @ApiProperty({ example: 'Pepito', description: 'Nombre del profesor' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Gómez', description: 'Apellido del profesor' })
  @IsString()
  apellido: string;

  @ApiProperty({ example: '20-12345679-9', description: 'CUIL del profesor' })
  @IsString()
  cuil: string;

  @ApiPropertyOptional({ example: '1980-05-15', description: 'Fecha de nacimiento' })
  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;

  @ApiPropertyOptional({ example: 'Calle Falsa 123', description: 'Dirección' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ example: 'La Plata', description: 'Localidad' })
  @IsOptional()
  @IsString()
  localidad?: string;

  @ApiPropertyOptional({ example: 'Distrito 1', description: 'Distrito' })
  @IsOptional()
  @IsString()
  distrito?: string;

  @ApiPropertyOptional({ example: 'pepito.gomez@abc.gob.ar', description: 'Correo abc' })
  @IsOptional()
  @IsString()
  mail_abc?: string;

  @ApiPropertyOptional({ example: 'pepito.gomez@gmail.com', description: 'Correo personal' })
  @IsOptional()
  @IsString()
  mail_personal?: string;

  @ApiPropertyOptional({ example: '+541123456789', description: 'Teléfono' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: 'Profesor de Matemáticas', description: 'Título habilitante' })
  @IsOptional()
  @IsString()
  titulo_habilitante?: string;

  @ApiPropertyOptional({ example: true, description: '¿Es título docente?' })
  @IsOptional()
  @IsBoolean()
  titulo_docente?: boolean;
}
