import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ClassGroup from './class_group.js'
import Comment from './comment.js'

export default class Student extends BaseModel {
  @column({ isPrimary: true }) declare id: number
  @column() declare name: string
  @column() declare firstname: string
  @column() declare classGroupId: number

  @belongsTo(() => ClassGroup) declare classGroup: BelongsTo<typeof ClassGroup>
  @hasMany(() => Comment) declare comments: HasMany<typeof Comment>
}
