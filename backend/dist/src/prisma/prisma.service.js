"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
const crypto_service_1 = require("../crypto/crypto.service");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor(cryptoService) {
        const connectionString = `${process.env.DATABASE_URL}`;
        const pool = new pg_1.Pool({ connectionString });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        super({ adapter });
        this.cryptoService = cryptoService;
        this.pgPool = pool;
        this.extended = this.$extends({
            query: {
                alumno: {
                    async $allOperations({ operation, args, query }) {
                        const data = args.data;
                        if (data) {
                            if (data.dni)
                                data.dni = cryptoService.encrypt(data.dni);
                            if (data.nombre)
                                data.nombre = cryptoService.encrypt(data.nombre);
                            if (data.apellido)
                                data.apellido = cryptoService.encrypt(data.apellido);
                        }
                        const where = args.where;
                        if (where) {
                            if (where.dni)
                                where.dni = cryptoService.encrypt(where.dni);
                        }
                        return query(args);
                    },
                },
                profesor: {
                    async $allOperations({ operation, args, query }) {
                        const data = args.data;
                        if (data) {
                            if (data.dni)
                                data.dni = cryptoService.encrypt(data.dni);
                            if (data.nombre)
                                data.nombre = cryptoService.encrypt(data.nombre);
                            if (data.apellido)
                                data.apellido = cryptoService.encrypt(data.apellido);
                        }
                        const where = args.where;
                        if (where) {
                            if (where.dni)
                                where.dni = cryptoService.encrypt(where.dni);
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crypto_service_1.CryptoService])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map