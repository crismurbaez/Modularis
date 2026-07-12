import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test_secret_key_that_is_long_enough_for_aes_256_gcm'),
          },
        },
      ],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should encrypt and decrypt correctly', () => {
    const originalText = 'Hello, Secret World!';
    const encrypted = service.encrypt(originalText);
    
    expect(encrypted).not.toEqual(originalText);
    expect(encrypted.split(':').length).toBe(3); // IV, content, authTag

    const decrypted = service.decrypt(encrypted);
    expect(decrypted).toEqual(originalText);
  });
  
  it('should return original text if it cannot be decrypted', () => {
    const plain = 'unencrypted_string';
    const result = service.decrypt(plain);
    expect(result).toEqual(plain);
  });
});
