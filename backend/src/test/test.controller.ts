import { Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('test')
export class TestController {
  constructor(private readonly userService: UserService) {}

  @Post('seed-user')
  async seedUser() {
    return this.userService.create({
      userName: 'e2e-user',
      email: 'e2e@test.com',
      password: '123456',
    });
  }
}
