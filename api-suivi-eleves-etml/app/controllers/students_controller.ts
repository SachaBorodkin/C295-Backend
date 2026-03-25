import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { createStudentValidator } from '#validators/student'
import { updateStudentValidator } from '#validators/student'
export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const students = await Student.all()
    return response.ok(students)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createStudentValidator)
    const student = await Student.create(payload)
    return response.created(student)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    return response.ok(student)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    const payload = await request.validateUsing(updateStudentValidator)

    student.merge(payload)
    await student.save()

    return response.ok(student)
  }

  // DELETE /api/students/:id
  async destroy({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.id)
    await student.delete()
    return response.noContent()
  }
}
