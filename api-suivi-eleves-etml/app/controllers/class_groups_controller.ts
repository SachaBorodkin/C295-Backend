// app/controllers/class_groups_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import ClassGroup from '#models/class_group'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  async index({}: HttpContext) {
    // Charge toutes les classes avec leur enseignant triées par nom
    return await ClassGroup.query().preload('teacher').orderBy('name', 'asc')
  }

  async store({ request, response }: HttpContext) {
    // Valide les données (nom et teacherId optionnel)
    const payload = await request.validateUsing(classGroupValidator)
    const classGroup = await ClassGroup.create(payload)
    return response.created(classGroup)
  }

  async show({ params }: HttpContext) {
    // Récupère une classe spécifique avec son enseignant
    return await ClassGroup.query().preload('teacher').where('id', params.id).firstOrFail()
  }

  async update({ params, request }: HttpContext) {
    // EXERCICE : Mise à jour d'une classe existante
    const classGroup = await ClassGroup.findOrFail(params.id)
    const payload = await request.validateUsing(classGroupValidator)

    classGroup.merge(payload)
    await classGroup.save()
    return classGroup
  }

  async destroy({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)
    await classGroup.delete()
    return response.noContent()
  }
}
