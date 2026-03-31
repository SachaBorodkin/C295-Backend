import type { HttpContext } from '@adonisjs/core/http'
import ClassGroup from '#models/class_group'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  async index({ response }: HttpContext) {
    // Fetches all classes with their assigned teacher, ordered by name
    const classGroups = await ClassGroup.query().preload('teacher').orderBy('name', 'asc')
    return response.ok(classGroups)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(classGroupValidator)
    const classGroup = await ClassGroup.create(payload)
    return response.created(classGroup)
  }

  async show({ params, response }: HttpContext) {
    // Preloads the teacher for a specific class view
    const classGroup = await ClassGroup.query()
      .preload('teacher')
      .where('id', params.id)
      .firstOrFail()
    return response.ok(classGroup)
  }

  async update({ params, request, response }: HttpContext) {
    // EXERCICE SOLUTION: Implementation of the update logic
    const classGroup = await ClassGroup.findOrFail(params.id)
    const payload = await request.validateUsing(classGroupValidator)

    classGroup.merge(payload)
    await classGroup.save()

    return response.ok(classGroup)
  }

  async destroy({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)
    await classGroup.delete()
    return response.noContent()
  }
}
