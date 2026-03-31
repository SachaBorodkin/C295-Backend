import { BaseSchema } from '@adonisjs/lucid/schema'

// ..._create_teachers_table.ts
export default class extends BaseSchema {
  protected tableName = 'teachers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').unique().notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
}
