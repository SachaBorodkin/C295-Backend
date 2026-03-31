import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import ClassGroup from './class_group.js'
import User from './user.js'
import Comment from './comment.js'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true }) declare id: number
  @column() declare name: string
  @column() declare firstname: string
  @column() declare email: string
  @column() declare userId: number

  @belongsTo(() => User) declare user: BelongsTo<typeof User>
  @hasMany(() => ClassGroup) declare classGroups: HasMany<typeof ClassGroup>
  @hasMany(() => Comment) declare comments: HasMany<typeof Comment>
}
