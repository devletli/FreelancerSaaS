import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHealth: () => ({
              status: 'ok',
              service: 'freelancer-marketplace-api',
            }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the health payload', () => {
      expect(appController.getHealth()).toEqual({
        status: 'ok',
        service: 'freelancer-marketplace-api',
      });
    });
  });
});
