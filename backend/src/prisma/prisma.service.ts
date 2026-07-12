import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  public extended;
  private pgPool: Pool;

  constructor(private cryptoService: CryptoService) {
    const connectionString = `${process.env.DATABASE_URL}`;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pgPool = pool;

    this.extended = this.$extends({
      query: {
        alumno: {
          async $allOperations({ operation, args, query }) {
            const data = (args as any).data;
            if (data) {
              if (data.dni) data.dni = cryptoService.encrypt(data.dni as string);
              if (data.nombre) data.nombre = cryptoService.encrypt(data.nombre as string);
              if (data.apellido) data.apellido = cryptoService.encrypt(data.apellido as string);
            }
            const where = (args as any).where;
            if (where) {
              if (where.dni) where.dni = cryptoService.encrypt(where.dni as string);
            }
            return query(args);
          },
        },
        profesor: {
          async $allOperations({ operation, args, query }) {
            const data = (args as any).data;
            if (data) {
              if (data.dni) data.dni = cryptoService.encrypt(data.dni as string);
              if (data.nombre) data.nombre = cryptoService.encrypt(data.nombre as string);
              if (data.apellido) data.apellido = cryptoService.encrypt(data.apellido as string);
            }
            const where = (args as any).where;
            if (where) {
              if (where.dni) where.dni = cryptoService.encrypt(where.dni as string);
            }
            return query(args);
          },
        }
      },
      result: {
        alumno: {
          dni: {
            compute(data) { return data.dni ? cryptoService.decrypt(data.dni) : data.dni; }
          },
          nombre: {
            compute(data) { return data.nombre ? cryptoService.decrypt(data.nombre) : data.nombre; }
          },
          apellido: {
            compute(data) { return data.apellido ? cryptoService.decrypt(data.apellido) : data.apellido; }
          }
        },
        profesor: {
          dni: {
            compute(data) { return data.dni ? cryptoService.decrypt(data.dni) : data.dni; }
          },
          nombre: {
            compute(data) { return data.nombre ? cryptoService.decrypt(data.nombre) : data.nombre; }
          },
          apellido: {
            compute(data) { return data.apellido ? cryptoService.decrypt(data.apellido) : data.apellido; }
          }
        }
      }
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
