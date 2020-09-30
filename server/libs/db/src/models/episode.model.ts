import { ApiProperty } from "@nestjs/swagger"
import { modelOptions, prop } from "@typegoose/typegoose"

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

  @prop
  @ApiProperty({ description: '文件url' })
  file: string
}