import { ApiProperty } from "@nestjs/swagger"
import { prop, modelOptions, DocumentType } from "@typegoose/typegoose"
import { hashSync } from 'bcryptjs'

export type UserDocument = DocumentType<User>

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

  @prop({
    select: false,
    get(val) {
      return val
    },
    set(val) {
      return val ? hashSync(val) : val
    }
  })
  @ApiProperty({ description: '密码', example: '123456' })
  password: string
}