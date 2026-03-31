import ClassGroup from '#models/class_group'
import Teacher from '#models/teacher'
import { TeacherFactory } from '#database/factories/teacher_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ClassGroupSeeder extends BaseSeeder {
  public async run() {
    let teachers = await Teacher.all()

    // Create more teachers if needed
    if (teachers.length < 4) {
      const teachersNeeded = 4 - teachers.length
      await TeacherFactory.createMany(teachersNeeded)
      teachers = await Teacher.all()
    }

    await ClassGroup.createMany([
      { name: 'CIN1A', teacherId: teachers[0].id },
      { name: 'CIN1B', teacherId: teachers[0].id },
      { name: 'CIN1C', teacherId: teachers[1].id },
      { name: 'FID1', teacherId: teachers[1].id },
      { name: 'FID2', teacherId: teachers[2].id },
      { name: 'CID2A', teacherId: teachers[2].id },
      { name: 'CID2B', teacherId: teachers[3].id },
    ])
  }
}
