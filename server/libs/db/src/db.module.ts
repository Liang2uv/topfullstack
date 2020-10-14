import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { Action } from './models/action.model';
import { Comment } from './models/comment.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode,
  Action,
  Comment
])

@Global()
@Module({
  imports: [
    // 使用forRootAsync是为了异步加载，防止ConfigModule没加载之前就加载了TypegooseModule
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false
        }
      }
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
