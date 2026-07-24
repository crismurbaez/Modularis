import { PartialType } from '@nestjs/swagger';
import { CreateConfigAlertaDto } from './create-config-alerta.dto';

export class UpdateConfigAlertaDto extends PartialType(CreateConfigAlertaDto) {}
