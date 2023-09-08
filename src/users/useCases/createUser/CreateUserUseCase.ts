import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { User } from '@users/entities/User'

//Fiz para receber os dados do usuário, pois o front-end vai enviar um roleId e não uma instância de Role
//O tipo CreateUserDTO tbm existe em IUsersRepository. Só que o de lá é um campo do tipo Role
type CreateUserDTO = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  roleId: string
}

@injectable()
export class CreateUserUseCase {
  /*É a injeção de dependência: @inject('UsersRepository') private usersRepository: IUsersRepository
  @inject('Roles Repository'): vai ser injetado em private rolesRepository: IRolesRepository */
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    isAdmin,
    roleId,
  }: CreateUserDTO): Promise<User> {
    //Existe um e-mail cadastrado igual ao que está sendo informado ?
    //Se existe, interrompe a execução do method gerando uma Exception
    const emailExists = await this.usersRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already used')
    }

    //Se a role não existir, também vou disparar uma exception.
    const role = await this.rolesRepository.findById(roleId)
    if (!role) {
      throw new AppError('Role not found', 404)
    }

    //Não posso persistir a senha de forma legível. Preciso criar um hash dela. Biblioteca: bcryptjs
    //param 1: a informação que desejo fazer o hash
    //param 2: o salt é um valor que passamos para ser considerado no hash da senha
    //No final, vou ter a senha criptografada pelo bcryptjs
    const hashedPassword = await hash(password, 10)
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      role, //esse é o role buscado
    })

    return this.usersRepository.save(user)
  }
}
