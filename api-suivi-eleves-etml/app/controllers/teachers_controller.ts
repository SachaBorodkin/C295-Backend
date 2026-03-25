// app/controllers/teachers_controller.ts
import Teacher from '#models/teacher'
import { createTeacherValidator } from '#validators/teacher'
import type { HttpContext } from '@adonisjs/core/http'

export default class TeachersController {
  async index({ response }: HttpContext) {
    return response.ok(await Teacher.all())
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTeacherValidator)
    const teacher = await Teacher.create(payload)
    return response.created(teacher)
  }

  async show({ params, response }: HttpContext) {
    return response.ok(await Teacher.findOrFail(params.id))
  }

  async update({ params, request, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    const payload = await request.validateUsing(createTeacherValidator) // Adaptez pour l'update
    teacher.merge(payload).save()
    return response.ok(teacher)
  }

  async destroy({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    await teacher.delete()
    return response.noContent()
  }
}
