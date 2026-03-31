// api-suivi-eleves-etml/app/validators/student.ts
import vine from '@vinejs/vine'

export const createStudentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    firstname: vine.string().trim().minLength(2),
    classGroupId: vine.number().positive(),
  })
)

export const updateStudentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).optional(),
    firstname: vine.string().trim().minLength(2).optional(),
    classGroupId: vine.number().positive().optional(),
  })
)
