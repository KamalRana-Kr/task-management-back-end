import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/admin.dto';

@ApiTags('User')
@Controller({
  version: '1',
  path: 'user/',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'API to log in a user' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'User login successfully',
  })
  @ApiBody({
    type: LoginDto,
    description: 'User login credentials',
  })
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = this.authService.validateUser(body.username, body.password);
    const token = await this.authService.login(user);
    return {
      status: HttpStatus.OK,
      message: 'User login successfully',
      data: token,
    };
  }
}
