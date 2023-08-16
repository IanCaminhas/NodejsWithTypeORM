import { Request, Response } from 'express'
import { ShowRoleUseCase } from './ShowRoleUseCase'
import { container } from 'tsyringe'

export class ShowRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showRoleUseCase = container.resolve(ShowRoleUseCase)
    /*const { id } = request.body Antes do BD, recebia o id pelo corpo da requisição
    Agora vou receber como param da rota */
    const { id } = request.params
    const role = await showRoleUseCase.execute({ id })
    //status code 201 é para criação de informação. Como vou retornar, vai ser o statusCode 200
    return response.status(200).json(role)
  }
}
