import { Request, Response } from 'express'
import { DeleteRoleUseCase } from './DeleteRoleUseCase'

export class DeleteRoleController {
  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    /*const { id } = request.body Antes do BD, recebia o id pelo corpo da requisição
    Agora vou receber como param da rota */
    const { id } = request.params
    //nao armazenei o retorno em nenhuma variável, pois deleteRoleUseCase possui como retorno void
    await this.deleteRoleUseCase.execute({ id })
    //status code 204 significa no content, ou seja, não tenho conteúdo pra retornar
    return response.status(204).send()
  }
}
