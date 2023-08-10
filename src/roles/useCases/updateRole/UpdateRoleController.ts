import { Request, Response } from 'express'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'

export class UpdateRoleController {
  constructor(private updateRoleUseCase: UpdateRoleUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params //Aqui eu pego o id do registro
    const { name } = request.body //aqui eu pego o conteúdo para ser atualizado
    const role = await this.updateRoleUseCase.execute({ id, name })
    //Caso o registro seja atualizado, retorno o statusCode 200
    return response.status(200).json(role)
  }
}
