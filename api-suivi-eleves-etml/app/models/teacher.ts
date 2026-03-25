import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ClassGroup from './classgroup.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare firstname: string
  @column()
  declare email: string
  // Relation : enseignant → classes
  @hasMany(() => ClassGroup)
  declare classGroups: HasMany<typeof ClassGroup>
}
