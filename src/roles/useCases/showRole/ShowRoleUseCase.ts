import { Role } from '@roles/entities/Role'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

//Esse DTO vai definir as propriedades(ou seja, as informações) que o cliente vai poder enviar para a API
type ShowRoleParams = {
  id: string
}

@injectable()
export class ShowRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ id }: ShowRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      // throw new AppError aceita 2 parâmetros: a mensagem e o statusCode
      throw new AppError('Role not found', 404)
    }
    return role
  }
}
