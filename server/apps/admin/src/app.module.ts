/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { CommonModule } from '@app/common';
import { MulterModule } from '@nestjs/platform-express';
const multer = require('multer');
const fs = require('fs');
const path = require('path');

@Module({
  imports: [
    CommonModule,
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const dir = path.resolve(__dirname, '../../../uploads')
          const exists = fs.existsSync(dir)
          if (!exists) {
            fs.mkdirSync(dir)
          }
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        }
      })
    }),
    UsersModule,
    CoursesModule,
    EpisodesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
