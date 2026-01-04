import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TestController],
})
export class TestModule {}
