import { ApiProperty } from "@nestjs/swagger"
import { prop, modelOptions, Ref } from "@typegoose/typegoose"
import { Episodes } from "./episode.model"

// 给添加的数据加上时间戳
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Course {
  @prop()
  @ApiProperty({ description: '课程名称' })
  name: string

  @prop()
  @ApiProperty({ description: '封面图' })
  cover: string

  @prop({ type: [] })
  episodes: Ref<Episodes>[]
}