import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { CryptoModule } from '../crypto/crypto.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [CryptoModule, NotificationsModule],
  controllers: [AssignmentsController],
  providers: [AssignmentsService]
})
export class AssignmentsModule {}
