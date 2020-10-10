import { ApiProperty } from "@nestjs/swagger"
import { modelOptions, prop, Ref } from "@typegoose/typegoose"
import { Course } from "./course.model"

// 给添加的数据加上时间戳
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Episodes {
  @prop()
  @ApiProperty({ description: '课时名称' })
  name: string

  @prop()
  @ApiProperty({ description: '文件url' })
  file: string
  
  @prop({ ref: 'Courses' })
  course: Ref<Course>
}