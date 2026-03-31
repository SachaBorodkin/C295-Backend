import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import Student from '#models/student'

export default class CommentsController {
  // GET /api/students/:student_id/comments
  async index({ params, response }: HttpContext) {
    const student = await Student.findOrFail(params.student_id)
    await student.load('comments', (query) => {
      query.preload('teacher') // Step 11: Preload who wrote the comment
    })
    return response.ok(student.comments)
  }

  // POST /api/students/:student_id/comments
  async store({ params, request, response, auth }: HttpContext) {
    const user = auth.user!
    // Find the teacher profile associated with the logged-in user
    const teacher = await user.related('teacher').query().firstOrFail()

    const comment = await Comment.create({
      content: request.input('content'),
      studentId: params.student_id,
      teacherId: teacher.id,
    })
    return response.created(comment)
  }

  async update({ params, request, response, auth }: HttpContext) {
    const user = auth.user!
    const comment = await Comment.findOrFail(params.id)

    // Check if user is allowed to edit this comment
    const teacher = await user.related('teacher').query().first()
    const isAdmin = user.role === 'admin'
    const isCommentAuthor = comment.teacherId === teacher?.id

    if (!isAdmin && !isCommentAuthor) {
      return response.unauthorized({
        message: "Modification interdite : ce n'est pas votre commentaire.",
      })
    }

    comment.content = request.input('content')
    await comment.save()
    return response.ok(comment)
  }

  async destroy({ params, response, auth }: HttpContext) {
    const user = auth.user!
    const comment = await Comment.findOrFail(params.id)

    // Check if user is allowed to delete this comment
    const teacher = await user.related('teacher').query().first()
    const isAdmin = user.role === 'admin'
    const isCommentAuthor = comment.teacherId === teacher?.id

    if (!isAdmin && !isCommentAuthor) {
      return response.unauthorized({
        message: "Suppression interdite : ce n'est pas votre commentaire.",
      })
    }

    await comment.delete()
    return response.noContent()
  }
}
