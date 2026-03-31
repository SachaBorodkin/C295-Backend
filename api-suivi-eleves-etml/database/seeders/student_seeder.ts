import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { StudentFactory } from '#database/factories/student_factory'
import ClassGroup from '#models/class_group'

export default class StudentSeeder extends BaseSeeder {
  public async run() {
    // Get or create class groups
    let classGroup = await ClassGroup.first()
    if (!classGroup) {
      classGroup = await ClassGroup.create({
        name: 'CIN1A',
        teacherId: null,
      })
    }

    // Create 10 students with the class group
    await StudentFactory.merge({ classGroupId: classGroup.id }).createMany(10)
  }
}
