import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async createBoard(
    data: { title: string; content: string; file: string | null },
    userId: number,
  ) {
    return this.prisma.board.create({
      data: {
        title: data.title,
        content: data.content,
        file: data.file, // 파일 경로
        user: { connect: { id: userId } },
      },
    });
  }

  // 모든 게시글 가져오기
  async getAllBoards() {
    return this.prisma.board.findMany({
      include: {
        user: {
          select: {
            username: true, // 작성자 이름 포함
          },
        },
      },
    });
  }
}
