import Factory from '@adonisjs/lucid/factories'
import Student from '#models/student'

export const StudentFactory = Factory.define(Student, async ({ faker }) => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
  }
}).build()
