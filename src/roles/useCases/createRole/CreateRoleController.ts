import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'

export class CreateRoleController {
  //request e response foram tipados. Porque essas estruturas não estão envolvidas com o Router()
  handle(request: Request, response: Response): Response {
    const { name } = request.body
    const rolesRepository = new RolesRepository()
    const roleAlreadyExists = rolesRepository.findByName(name)
    if (roleAlreadyExists) {
      //return response.status(400).json({ error: 'Role already exists ' }) -> ao invés de usar esse disparo de erro...
      //posso passar o status code tbm:  throw new AppError('Role already exists', 400)... Mas como 400 já é o padrão, foi omitido
      throw new AppError('Role already exists') // vou usar a classe AppError para disparar o erro
    }
    const role = rolesRepository.create({ name })

    return response.status(201).json(role)
  }
}
