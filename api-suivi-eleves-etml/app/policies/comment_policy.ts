import User from '#models/user'
import Comment from '#models/comment'

export default class CommentPolicy {
  async update(user: User, comment: Comment) {
    // Admin check
    if (user.role === 'admin') return true

    // Teacher check: does the teacher ID of the comment match the teacher profile of the user?
    const teacher = await user.related('teacher').query().first()
    return comment.teacherId === teacher?.id
  }

  async delete(user: User, comment: Comment) {
    if (user.role === 'admin') return true
    const teacher = await user.related('teacher').query().first()
    return comment.teacherId === teacher?.id
  }
}
