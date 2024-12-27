import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BoardService } from './board.service';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { multerOptions } from '../../config/multer.config'; // multerOptions 경로

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 생성' })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createBoard(
    @UploadedFile() file: Express.Multer.File, // FormData에서 파일 추출
    @Body() createBoardDto: CreateBoardDto, // FormData에서 나머지 데이터 추출
    @Request() req,
  ) {
    console.log('DTO:', createBoardDto);
    console.log('File:', file);
    const userId = req.user.userId; // JWT에서 userId 추출

    // 파일 경로 추가
    const filePath = file ? `/uploads/${file.filename}` : null;

    // 파일 경로를 DTO에 추가
    const completeBoardDto = { ...createBoardDto, file: filePath };

    return this.boardService.createBoard(completeBoardDto, userId);
  }
  // GET /board 요청 처리
  @Get()
  @ApiOperation({ summary: '게시글 조회' })
  async getAllBoards() {
    return this.boardService.getAllBoards();
  }
}
