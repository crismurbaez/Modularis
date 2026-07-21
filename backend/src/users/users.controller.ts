import { Controller, Get, Post, Body, Patch, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '12345678', description: 'DNI del usuario' })
  @IsString()
  @IsNotEmpty()
  dni: string;

  @ApiProperty({ example: '123456', description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({ example: 1, description: 'ID del rol del usuario' })
  @IsNumber()
  @IsNotEmpty()
  id_rol: number;

  @ApiPropertyOptional({ example: 2, description: 'ID del profesor asociado (opcional)' })
  @IsNumber()
  @IsOptional()
  id_profesor?: number;
}

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @RequirePermissions('GESTIONAR_USUARIOS')
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @RequirePermissions('GESTIONAR_USUARIOS')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id/status')
  @RequirePermissions('GESTIONAR_USUARIOS')
  @ApiOperation({ summary: 'Activar o desactivar un usuario' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('activo') activo: boolean,
  ) {
    return this.usersService.updateStatus(id, activo);
  }

  @Patch(':id/role')
  @RequirePermissions('GESTIONAR_USUARIOS')
  @ApiOperation({ summary: 'Cambiar el rol de un usuario' })
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('id_rol') id_rol: number,
  ) {
    return this.usersService.updateRole(id, id_rol);
  }
}
