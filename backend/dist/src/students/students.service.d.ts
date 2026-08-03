import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class StudentsService {
    private prisma;
    private cryptoKey;
    constructor(prisma: PrismaService);
    checkDuplicates(tx: any, dni: string, cuil: string, idToIgnore?: number): Promise<void>;
    create(createStudentDto: CreateStudentDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<any>;
    private calculateAge;
}
