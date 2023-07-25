import { Role } from '@roles/entities/Role'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

//Esse DTO vai definir as propriedades(ou seja, as informações) que o cliente vai poder enviar para a API
type CreateRoleDTO = {
  name: string
}

export class CreateRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  //Posso fazer assim também: props: CreateRoleDTO
  execute({ name }: CreateRoleDTO): Role {
    //como uma propriedade da classe(constructor(private rolesRepository: RolesRepository)), preciso usar o this
    const roleAlreadyExists = this.rolesRepository.findByName(name)
    //Não pode existir roles com nomes iguais
    if (roleAlreadyExists) {
      //return response.status(400).json({ error: 'Role already exists ' }) -> ao invés de usar esse disparo de erro...
      //posso passar o status code tbm:  throw new AppError('Role already exists', 400)... Mas como 400 já é o padrão, foi omitido
      throw new AppError('Role already exists') // vou usar a classe AppError para disparar o erro
    }
    return this.rolesRepository.create({ name })
  }
}
