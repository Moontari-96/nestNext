import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: '사용자 이름' })
  username: string;

  @ApiProperty({ description: '사용자 비밀번호' })
  password: string;
}
