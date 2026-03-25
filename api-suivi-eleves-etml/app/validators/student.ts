// api-suivi-eleves-etml/app/validators/student.ts
import vine from '@vinejs/vine'

export const createStudentValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2),
    lastName: vine.string().trim().minLength(2),
    email: vine.string().email(),
    // Add other fields from your migration here (e.g., class, grade)
  })
)

export const updateStudentValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).optional(),
    lastName: vine.string().trim().minLength(2).optional(),
    email: vine.string().email().optional(),
  })
)
