import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
export declare class StudentsService {
    private prisma;
    private cryptoService;
    constructor(prisma: PrismaService, cryptoService: CryptoService);
    checkDuplicates(dni: string, cuil: string, idToIgnore?: number): Promise<void>;
    private encryptData;
    private decryptData;
    create(createStudentDto: CreateStudentDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<any>;
    private calculateAge;
}
