import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateAvatarUseCase } from './UpdateAvatarUseCase'
import { instanceToInstance } from 'class-transformer'

export class UpdateAvatarController {
  /*   userId: request.user.id -> significa o id do usuário logado
       avatarFileName: request.file.filename -> como é upload de arquivo, o avatar vem dentro
       do objeto file da request. Dentro do ojbeto file, pego o filename(nome do arquivo)
  */
  async handle(request: Request, response: Response): Promise<Response> {
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase)
    const user = await updateAvatarUseCase.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    })
    //instanceToInstance -> para não retornar com senha
    return response.json(instanceToInstance(user))
  }
}
