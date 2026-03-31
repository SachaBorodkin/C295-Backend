import factory from '@adonisjs/lucid/factories'
import Teacher from '#models/teacher'
import { UserFactory } from '#database/factories/user_factory'

export const TeacherFactory = factory
  .define(Teacher, ({ faker }) => {
    return {
      name: faker.person.lastName(),
      firstname: faker.person.firstName(),
      email: faker.internet.email(),
    }
  })
  .relation('user', () => UserFactory)
  .build()
