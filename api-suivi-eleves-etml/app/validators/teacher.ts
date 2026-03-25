// app/validators/teacher.ts
import vine from '@vinejs/vine'

export const createTeacherValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2),
    lastName: vine.string().trim().minLength(2),
    email: vine.string().email().unique({ table: 'teachers', column: 'email' }),
  })
)
