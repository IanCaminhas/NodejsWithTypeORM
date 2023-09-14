import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProfileUseCase } from './UpdateProfileUseCase'

export class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProfileUseCase = container.resolve(UpdateProfileUseCase)
    //sao as informações provenientes do corpo da requisição
    const { name, email, password, isAdmin, roleId } = request.body
    const user = await createUserCase.execute({
      name,
      email,
      password,
      isAdmin,
      roleId,
    })
    /*A resposta que vai ser atribuída para a aplicação cliente vai excluir o password.
    Lá na classe tem o decorator @Exclude() */
    return response.status(201).json(instanceToInstance(user))
  }
}
