import vine from '@vinejs/vine'

export const profileAlterPasswordValidator = vine.compile(
  vine.object({
    current_password: vine.string().minLength(6),
    new_password: vine.string().minLength(6),
  })
)
