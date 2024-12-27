import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { BoardModule } from './board/board.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // diskStorage를 multer에서 import
import { UploadsModule } from 'uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'MySQL', // MYSQL 비밀번호
      database: 'study', // 사용할 데이터베이스 이름
      entities: [User], // 사용할 엔티티 등록
      synchronize: true, // 개발 환경에서만 true, 운영에서는 false로 권장
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const filename = `${file.originalname}-${uniqueSuffix}`;
          callback(null, filename);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 최대 파일 크기: 10MB
      },
    }),
    UploadsModule, // 등록
    UserModule,
    BoardModule,
  ],
})
export class AppModule {}
