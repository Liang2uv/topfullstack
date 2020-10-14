import { Comment } from '@libs/db/models/comment.model';
import { UserDocument } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Controller('comments')
@ApiTags('评论')
export class CommentsController {
  constructor(
    @InjectModel(Comment) private readonly commentModel: ReturnModelType<typeof Comment>
  ) { }

  @Get()
  @ApiOperation({ summary: '获取评论列表' })
  async index(@Query('object') object: string) {
    return await this.commentModel.find().populate('user').select({}).where({object}).sort('-_id').limit(20)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @Req() req: { user: UserDocument }) {
    dto.user = req.user._id
    return await this.commentModel.create(dto)
  }
}
