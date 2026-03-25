import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { createStudentValidator } from '#validators/student'
import { updateStudentValidator } from '#validators/student'

export default class StudentsController {
  async index({ response }: HttpContext) {
    const students = await Student.all()
    return response.ok(students)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createStudentValidator)
    const student = await Student.create(payload)
    return response.created(student)
  }

  async show({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    return response.ok(student)
  }

  async update({ params, request, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    const payload = await request.validateUsing(updateStudentValidator)

    student.merge(payload)
    await student.save()

    return response.ok(student)
  }

  async destroy({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    await student.delete()
    return response.noContent()
  }
}
