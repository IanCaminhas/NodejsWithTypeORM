import { Role } from '@roles/entities/Role'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

//Esse DTO vai definir as propriedades(ou seja, as informações) que o cliente vai poder enviar para a API
type ShowRoleParams = {
  id: string
}

export class ShowRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({ id }: ShowRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      // throw new AppError aceita 2 parâmetros: a mensagem e o statusCode
      throw new AppError('Role not found', 404)
    }
    return role
  }
}
