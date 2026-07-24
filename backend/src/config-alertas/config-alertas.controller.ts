import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ConfigAlertasService } from './config-alertas.service';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';

@Controller('config-alertas')
@UseGuards(AuthGuard, PermissionsGuard)
export class ConfigAlertasController {
  constructor(private readonly configAlertasService: ConfigAlertasService) {}

  @Get()
  @RequirePermissions('ACCESO_TOTAL')
  findAll() {
    return this.configAlertasService.findAll();
  }

  @Get(':tipo')
  @RequirePermissions('ACCESO_TOTAL')
  findOne(@Param('tipo') tipo: string) {
    return this.configAlertasService.findOne(tipo);
  }

  @Post(':tipo')
  @RequirePermissions('ACCESO_TOTAL')
  upsert(@Param('tipo') tipo: string, @Body() configData: { activa: boolean, parametros: any }) {
    return this.configAlertasService.upsert(tipo, configData.activa, configData.parametros);
  }
}
