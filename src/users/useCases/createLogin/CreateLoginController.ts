import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateLoginUseCase } from './CreateLoginUseCase'

export class CreateLoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createLoginUseCase = container.resolve(CreateLoginUseCase)
    const { email, password } = request.body
    //Recebemos um user e um token... Quando recebemos, enviamos na response
    const { user, token } = await createLoginUseCase.execute({
      email,
      password,
    })

    return response.status(201).json(
      instanceToInstance({
        user,
        token,
      }),
    )
  }
}
