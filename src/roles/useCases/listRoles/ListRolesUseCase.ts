import { RolesPaginateProperties } from '@roles/repositories/IRolesRepository'
import { RolesRepository } from '@roles/repositories/RolesRepository'

type ListRolesUseCaseParams = {
  page: number
  limit: number
}

export class ListRolesUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({
    limit,
    page,
  }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
    const take = limit //take é a qtd de registros que desejo pegar
    const skip = (Number(page) - 1) * take
    return this.rolesRepository.findAll({ page, skip, take })
  }
}
