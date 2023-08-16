import { Request, Response } from 'express'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'
import { container } from 'tsyringe'

export class UpdateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateRoleUseCase = container.resolve(UpdateRoleUseCase)
    const { id } = request.params //Aqui eu pego o id do registro
    const { name } = request.body //aqui eu pego o conteúdo para ser atualizado
    const role = await updateRoleUseCase.execute({ id, name })
    //Caso o registro seja atualizado, retorno o statusCode 200
    return response.status(200).json(role)
  }
}
