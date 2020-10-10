import { User } from '@libs/db/models/user.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: User
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  // 注入User模型
  constructor(@InjectModel(User) private readonly model) {}

  @Get('option')
  option() {
    return {
      title: "课程管理",
      column: [
        {
          prop: "username",
          label: "用户名",
        }
      ],
    };
  }
}
