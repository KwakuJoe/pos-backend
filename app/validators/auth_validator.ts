import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().maxLength(254),
    password: vine.string(),
  })
)

export const changePasswordValidator = vine.compile(
  vine.object({
    newPassword: vine.string().minLength(8).maxLength(72).confirmed({ confirmationField: 'newPasswordConfirmation' }),
  })
)
