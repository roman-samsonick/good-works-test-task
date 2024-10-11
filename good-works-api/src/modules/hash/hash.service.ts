import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async createHash(value: string) {
    return await bcrypt.hash(value, 10);
  }

  async check(hash: string, original: string) {
    return await bcrypt.compare(original, hash)
  }
}
