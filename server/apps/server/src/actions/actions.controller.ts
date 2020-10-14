import { Action } from '@libs/db/models/action.model';
import { UserDocument } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { GetStatusDto } from './dto/getStatus.dto';
import { ToggleDto } from './dto/toggle.dto';

@Controller('actions')
@ApiTags('用户操作')
export class ActionsController {
  constructor(
    @InjectModel(Action) private readonly actionModel: ReturnModelType<typeof Action>
  ) {}

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '查看状态' })
  async getStatus(@Query() dto: GetStatusDto, @Req() req: { user: UserDocument }) {
    dto.user = req.user._id
    const count = await this.actionModel.countDocuments(dto)
    return {
      status: count > 0
    }
  }

  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '切换状态' })
  async toggle(@Body() dto: ToggleDto, @Req() req: { user: UserDocument }) {
    dto.user = req.user._id
    const ret = await this.getStatus(dto, req)
    if (ret.status) {
      await this.actionModel.deleteMany(dto)
    } else {
      await this.actionModel.create(dto)
    }
    return await this.getStatus(dto, req)
  }
}
