import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Teacher from './teacher.js'
import Student from './student.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true }) declare id: number
  @column() declare content: string
  @column() declare teacherId: number
  @column() declare studentId: number

  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime

  @belongsTo(() => Teacher) declare teacher: BelongsTo<typeof Teacher>
  @belongsTo(() => Student) declare student: BelongsTo<typeof Student>
}
