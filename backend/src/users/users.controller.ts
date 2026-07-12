import { Controller, Get, Post, Body, Patch, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

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
  create(@Body() createUserDto: Record<string, any>) {
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
