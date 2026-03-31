import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.string('firstname').notNullable()
      table
        .integer('class_group_id')
        .unsigned()
        .references('id')
        .inTable('class_groups')
        .onDelete('SET NULL')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
}
