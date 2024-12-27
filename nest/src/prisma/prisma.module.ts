import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Prisma 클라이언트를 주입하는 서비스

/**
 * PrismaModule은 PrismaService를 모든 모듈에서 사용할 수 있도록 전역으로 등록
 */
@Global() // 모든 모듈에서 PrismaService를 사용할 수 있도록 설정
@Module({
  providers: [PrismaService], // PrismaService를 모듈의 provider로 등록
  exports: [PrismaService], // 다른 모듈에서 PrismaService를 주입받을 수 있도록 내보냄
})
export class PrismaModule {}
