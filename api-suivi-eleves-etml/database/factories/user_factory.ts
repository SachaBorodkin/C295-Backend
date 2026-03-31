import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: 'password', // Will be hashed
      fullName: faker.person.fullName(),
      role: 'teacher',
    }
  })
  .build()
