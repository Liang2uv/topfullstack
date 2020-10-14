import { ApiProperty } from "@nestjs/swagger"
import { modelOptions, prop, Ref } from "@typegoose/typegoose"
import { Course } from "./course.model"
import { Episode } from "./episode.model"
import { User } from "./user.model"

// 给添加的数据加上时间戳
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Action {
  @prop({ ref: 'Users' })
  @ApiProperty({ description: '用户' })
  user: Ref<User>

  @prop({ refPath: 'type' })
  @ApiProperty({ description: '操作对象' })
  object: Ref<Course | Episode>

  @prop({ enum: ['Course', 'Episode'] })
  @ApiProperty({ description: '操作对象类型' })
  type: string
  
  @prop({ enum: ['like', 'upVote'] })
  @ApiProperty({ description: '操作类型' })
  name: Ref<Course>
}