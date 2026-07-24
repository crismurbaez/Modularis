import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

fs.mkdirSync('./uploads/institution', { recursive: true });

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'icono', maxCount: 1 },
    { name: 'imagen_sello', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: './uploads/institution',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  createOrUpdate(
    @Body() createInstitutionDto: CreateInstitutionDto,
    @UploadedFiles() files: { icono?: Express.Multer.File[], imagen_sello?: Express.Multer.File[] }
  ) {
    return this.institutionService.createOrUpdate(createInstitutionDto, files);
  }

  @Get()
  findOne() {
    return this.institutionService.findOne();
  }
}
