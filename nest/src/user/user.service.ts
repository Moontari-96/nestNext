import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  //   constructor(
  //     @InjectRepository(User) private readonly userRepository: Repository<User>,
  //   ) {}

  // 회원가입
  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const { username, password } = CreateUserDto;

    // 이미 존재하는 사용자 확인
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new BadRequestException('이미 사용중인 이름');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prisma를 사용하여 사용자 생성
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword, // 해싱된 비밀번호 저장
      },
    });
  }
  // 로그인
  /* async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new BadRequestException('잘못된 값');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('잘못된 값');
    }

    return user;
  } */

  // 로그인 로직 (Prisma 기반)
  async validateUser(
    username: string,
    password: string,
  ): Promise<{ token: string }> {
    // Prisma를 사용하여 사용자 검색
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    // 사용자가 존재하지 않는 경우 예외 발생
    if (!user) {
      throw new BadRequestException('잘못된 값'); // 적절한 에러 메시지 전달
    }

    // 비밀번호 검증 (bcrypt 사용)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('잘못된 값'); // 비밀번호가 맞지 않으면 예외 발생
    }
    // JWT 생성
    const payload = { userId: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { token }; // JWT 반환
  }
}
