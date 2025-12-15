import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Usuário poderá criar sua conta.' })
  @ApiCreatedResponse({ description: 'Conta/Usuário criado com sucesso.' })
  @ApiConflictResponse({ description: 'E-mail já cadastrado.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Encontra todos os usuários. (Será removida).' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @ApiOperation({ summary: 'Encontra um único usuário.' })
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Encontra o usuário autenticado.' })
  @UseGuards(AuthTokenGuard)
  @Get('me')
  getMe(@Req() req): UserResponseDto {
    const user = req.user;

    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @ApiOperation({ summary: 'Atualização dos dados do usuário logado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Exlusão da conta do usuário logado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
