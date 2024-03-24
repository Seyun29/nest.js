import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getAllCat(): string {
    return 'all cats';
  }
}
