import { Module } from '@nestjs/common';
import { ConfigAlertasService } from './config-alertas.service';
import { ConfigAlertasController } from './config-alertas.controller';

@Module({
  controllers: [ConfigAlertasController],
  providers: [ConfigAlertasService],
})
export class ConfigAlertasModule {}
