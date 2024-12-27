import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // Prisma에서 자동 생성된 클라이언트

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * 서비스 초기화 시 Prisma와 데이터베이스 연결 설정
   */
  async onModuleInit() {
    await this.$connect(); // Prisma 클라이언트를 데이터베이스와 연결
  }

  /**
   * 서비스 종료 시 Prisma 연결 해제
   */
  async onModuleDestroy() {
    await this.$disconnect(); // Prisma 클라이언트 연결 종료
  }
}
