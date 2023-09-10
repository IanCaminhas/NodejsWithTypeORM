import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import jwtConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { User } from '@users/entities/User'
import { sign } from 'jsonwebtoken'

type CreateLoginDTO = {
  email: string
  password: string
}

//preciso retornar para o usuário: os seus dados e o token para ser incluído nas próximas requisições
type IResponse = {
  user: User
  token: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    //O user existe pelo email pesquisado ?
    if (!user) {
      //acabou sendo um erro de autenticação
      /*Outro ponto importante: é bom não informar o erro específico.
      Por isso a mensagem "Incorrect email/password combination".
      Assim não dá margem para usuários mal intencionados...
      Vai dificultar um pouco mais
      */
      throw new AppError('Incorrect email/password combination', 401)
    }

    /*Estou verificando se a senha informada pelo usuário está correta
    Para isso, utilizao o compare do da bib bycryptjs
    param 1: A senha informada para o user.... Param 2: a senha retornada pelo BD(a senha cadastrada com hash)
    Se as duas senhas forem equivalentes, o user digitou a senha certa... Ou seja, a bib bycryptjs confere com a senha que está armazenada.
    Em suma... toda essa validação quem realiza é o próprio bycryptjs
    */

    const passwordConfirmed = await compare(password, user.password)
    //Se a senha passada pelo user não for equivalente à cadastrada no BD...
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    /*Se as validações estiverem ok, agora gero o token através do method sign da bib jsonwebtoken.
      Validações: o user existe/a senha passada é igual a éxistente no BD.
      Param 1 é o payload(O que desejo enviar ?), param 2 é a secret, param 3 é objeto de opções para esse method.
      options tem o subject(Quem vai criar e usar esse token ?)
    */
    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    })

    return {
      user,
      token,
    }
  }
}
