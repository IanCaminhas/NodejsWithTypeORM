import { Role } from '@roles/entities/Role'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

type UpdateRoleDTO = {
  id: string
  name: string
}

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ id, name }: UpdateRoleDTO): Promise<Role> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      // throw new AppError aceita 2 parâmetros: a mensagem e o statusCode
      throw new AppError('Role not found', 404)
    }

    //Regra de negócio: Não posso ter duas roles com nomes iguais
    const roleWithSameName = await this.rolesRepository.findByName(name)
    if (roleWithSameName && role.name != roleWithSameName.name) {
      //Como não estou informando nenhum statuCode, vai ser usado o 400 por padrão
      throw new AppError('Role name not informed or already in use')
    }
    role.name = name
    //Na atualização também uso o save()
    return this.rolesRepository.save(role)
  }
}
