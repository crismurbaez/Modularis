import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('bulk')
  registerBulkAttendance(@Body() bulkData: any) {
    return this.attendanceService.registerBulk(bulkData);
  }

  @Get('calendar')
  getCalendar(@Query('month') month: string, @Query('year') year: string) {
    return this.attendanceService.getCalendar(month, year);
  }
}
