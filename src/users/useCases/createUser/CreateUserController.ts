import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserCase = container.resolve(CreateUserUseCase)
    //sao as informações provenientes do corpo da requisição
    const { name, email, password, isAdmin, roleId } = request.body
    const user = await createUserCase.execute({
      name,
      email,
      password,
      isAdmin,
      roleId,
    })
    return response.status(201).json(user)
  }
}
