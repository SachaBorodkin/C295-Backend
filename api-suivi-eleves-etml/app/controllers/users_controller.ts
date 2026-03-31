import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')
    const fullName = request.input('fullName')

    const user = await User.create({
      email,
      password,
      fullName,
      role: 'teacher',
    })

    return response.created(user)
  }

  async login({ request, response, auth }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('web').attempt(email, password)
      return response.ok(token)
    } catch {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.ok({ message: 'Logged out successfully' })
  }
}
