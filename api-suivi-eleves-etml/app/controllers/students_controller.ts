import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { studentValidator } from '#validators/student'
export default class StudentsController {
  /**
   * Display a list of resource
   */
async index({}: HttpContext) {
const students = await Student.query().orderBy('name').orderBy('firstname')
console.log(students.length)
return students
}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
async store({ request, response }: HttpContext) {
// Récupération des données envoyées par le client et validation des données
const { name, firstname } = await request.validateUsing(studentValidator)
// Création d'un nouvel élève avec les données validées
const student = await Student.create({ name, firstname })
// On utilise `response.created` pour retourner un code HTTP 201 avec les
return response.created(student)
}

  /**
   * Show individual record
   */
async show({ params }: HttpContext) {
return Student.findOrFail(params.id)
}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
async update({ params, request }: HttpContext) {
// Récupération des données
const data = request.only(['name', 'firstname'])
// Vérification de l'existence de l'élève
const student = await Student.findOrFail(params.id)
// Mise à jour des données de l'élève
student.merge(data)
// Sauvegarde des modifications
await student.save()
// Retour le json de l'élève mis à jour
return student
}

  /**
   * Delete record
   */
async destroy({ params }: HttpContext) {
const student = await Student.findOrFail(params.id)
return student.delete()
}
  
}