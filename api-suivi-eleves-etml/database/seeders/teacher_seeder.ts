import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TeacherFactory } from '../factories/teacher_factory.js'
// database/seeders/teacher_seeder.ts
export default class extends BaseSeeder {
  async run() {
    await TeacherFactory.createMany(10)
  }
}
