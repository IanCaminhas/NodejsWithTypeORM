import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

//Esse DTO vai definir as propriedades(ou seja, as informações) que o cliente vai poder enviar para a API
type DeleteRoleParams = {
  id: string
}

export class DeleteRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({ id }: DeleteRoleParams): Promise<void> {
    const role = await this.rolesRepository.findById(id)
    //Se não existir a role, retorno uma exception
    if (!role) {
      // throw new AppError aceita 2 parâmetros: a mensagem e o statusCode
      throw new AppError('Role not found', 404)
    }
    //se existir a role, excluo ela
    await this.rolesRepository.delete(role)
  }
}
