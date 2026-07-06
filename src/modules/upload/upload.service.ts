import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(private configService: ConfigService) {}

  getFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      const uploadDir = this.configService.get<string>('upload.destination');
      const filePath = path.join(uploadDir, filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        this.logger.log(`File deleted: ${filename}`);
      }
    } catch (error) {
      this.logger.error(`Error deleting file: ${filename}`, error);
      throw error;
    }
  }

  async getFileInfo(filename: string) {
    try {
      const uploadDir = this.configService.get<string>('upload.destination');
      const filePath = path.join(uploadDir, filename);

      if (!fs.existsSync(filePath)) {
        return null;
      }

      const stats = fs.statSync(filePath);

      return {
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
        url: this.getFileUrl(filename),
      };
    } catch (error) {
      this.logger.error(`Error getting file info: ${filename}`, error);
      return null;
    }
  }
}
