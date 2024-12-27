import { diskStorage } from 'multer';
import * as path from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // 파일 저장 경로
    filename: (req, file, callback) => {
      const originalName = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      ); // 한글 파일명 처리
      const ext = path.extname(originalName); // 확장자 추출 (.pdf 등)
      const baseName = path.basename(originalName, ext); // 확장자 제외한 파일명 추출
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${baseName}-${uniqueSuffix}${ext}`; // 확장자 앞에 고유 식별자 추가
      callback(null, filename);
    },
  }),
};
