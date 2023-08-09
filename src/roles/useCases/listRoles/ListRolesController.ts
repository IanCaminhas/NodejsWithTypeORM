import { Request, Response } from 'express'
import { ListRolesUseCase } from './ListRolesUseCase'

export class ListRolesController {
  constructor(private listRolesUseCase: ListRolesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    /*A página foi informada e é maior que 0 ?
      Se sim, retorna a página. Se não, retorna a page 1.
      Quando retorna 1 quer dizer que o usuário passou algum
      valor inválido para o parâmetro page.
      Estou garantindo que não vai retornar erro para o usuário, caso
      ele passe na propriedade page uma coisa que não seja um número

       Uso o method Number() para garantir que o parâmetro passado é um número
    */
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1
    /*
      O usuário enviou o limite e ele é maior que 0 ?
      Se não enviou ou é menor que 0 Ou outra coisa, o limit é 15. Se enviou, vai retornar
      um número do que foi informado[Number(request.query.limit)]
      Uso o method Number() para garantir que o parâmetro passado é um número
    */
    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15

    const roles = await this.listRolesUseCase.execute({ page, limit })
    return response.json(roles)
  }
}
