import { ApiProperty } from "@nestjs/swagger"
import { prop, modelOptions } from "@typegoose/typegoose"

// 给添加的数据加上时间戳
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @prop()
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string

  @prop()
  @ApiProperty({ description: '密码', example: '123456' })
  password: string
}