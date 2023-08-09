import { Role } from '@roles/entities/Role'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

//Esse DTO vai definir as propriedades(ou seja, as informações) que o cliente vai poder enviar para a API
type CreateRoleDTO = {
  name: string
}

export class CreateRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({ name }: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExists = await this.rolesRepository.findByName(name)
    if (roleAlreadyExists) {
      throw new AppError('Role already exists')
    }
    return this.rolesRepository.create({ name })
  }
}
