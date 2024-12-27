import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('uploads')
export class UploadsController {
  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename); // 저장된 파일 경로
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath); // 파일 반환
    } else {
      throw new NotFoundException('파일을 찾을 수 없습니다.');
    }
  }
}
