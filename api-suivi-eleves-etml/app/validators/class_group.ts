// sachaborodkin/c295-backend/.../app/validators/class_group.ts

import vine from '@vinejs/vine'

/**
 * Validates the class group creation and update action
 */
export const classGroupValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255),
    teacherId: vine.number().optional(), // teacherId is optional [cite: 849]
  })
)
