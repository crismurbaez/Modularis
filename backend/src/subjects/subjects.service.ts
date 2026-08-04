import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return this.prisma.materia.create({ data: createSubjectDto });
  }

  async findAll() {
    return this.prisma.materia.findMany();
  }

  async findOne(id: number) {
    const subject = await this.prisma.materia.findUnique({
      where: { id_materia: id }
    });
    if (!subject) throw new NotFoundException('Materia no encontrada');
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);
    return this.prisma.materia.update({
      where: { id_materia: id },
      data: updateSubjectDto
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.materia.delete({
      where: { id_materia: id }
    });
  }
}
