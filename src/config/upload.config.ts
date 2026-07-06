import { registerAs } from '@nestjs/config';

export default registerAs('upload', () => ({
  destination: process.env.UPLOAD_DESTINATION || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5MB
}));
