import factory from '@adonisjs/lucid/factories'
import Teacher from '#models/teacher'

export const TeacherFactory = factory
  .define(Teacher, ({ faker }) => {
    return {
      name: faker.person.lastName(),
      firstname: faker.person.firstName(),
      email: faker.internet.email(),
    }
  })
  .build()
