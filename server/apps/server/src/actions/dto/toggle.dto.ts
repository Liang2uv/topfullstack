import { ApiProperty } from "@nestjs/swagger"

export class ToggleDto {
  @ApiProperty({ description: '操作对象类型', example: 'Course' })
  type: string
  @ApiProperty({ description: '操作对象', example: '5f801ae244f53d4a606053b4' })
  object: string
  @ApiProperty({ description: '操作类型', example: 'like' })
  name: string
  user: any
}