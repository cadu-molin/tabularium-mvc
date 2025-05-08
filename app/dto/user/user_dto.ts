import User from '#models/user'

type UserDTO = {
  id: number
  fullName: string | null
  login: string
}

function createUserDTOFromModel(user: User): UserDTO {
  return {
    id: user.id,
    fullName: user.fullName,
    login: user.login,
  }
}

export type { UserDTO }

export { createUserDTOFromModel }
