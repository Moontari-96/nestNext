import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ description: '게시글 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '첨부 파일 경로', required: false })
  @IsOptional()
  @IsString()
  file?: string; // 파일 경로
}
