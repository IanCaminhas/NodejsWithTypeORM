import { inject, injectable } from 'tsyringe'
import { compare, hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { User } from '@users/entities/User'

//obrigatórios são userId, name e email
type UpdateProfileDTO = {
  userId: string
  name: string
  email: string
  password?: string
  old_password?: string
}

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
    old_password,
  }: UpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId)
    //Se eu não encontrar o usuário...
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email)
    //O novo email existe com outro usuário ? não posso deixar editar o email colocando de outro usuário
    if (userUpdateEmail && userUpdateEmail.id != userId) {
      throw new AppError('There is already one user with this email', 400)
    }

    /*Se password e old_password foram passado, quer dizer que o user que alterar a senha.*/
    if (password && old_password) {
      //a senha cadastrada é igual a antiga senha ?
      const checkOldPassword = await compare(old_password, user.password)
      //A senha antiga não confere com a senha armazenada no BD
      if (!checkOldPassword) {
        throw new AppError('Old password does not martch', 404)
      }
      user.password = await hash(password, 10)
    }
    user.name = name
    user.email = email
    return this.usersRepository.save(user)
  }
}
