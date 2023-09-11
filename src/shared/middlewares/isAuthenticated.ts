import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import authConfig from '@config/auth'

type JwtPayloadProps = {
  sub: string
}

/*O middleware possui assinatura com três parâmetros: request, response e o next
O next encaminha a requisição para a próxima rota, middleware, etc...
*/
export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //No header da requisição, existe a configuração do tipo Authorization ?
  const authHeader = request.headers.authorization
  //Se não foi enviado um cabeçalho de autorização, disparo uma exception
  if (!authHeader) {
    throw new AppError('Failed to verify access token', 401)
  }
  /*
    Existe o token. Como o token sempre vem com Bearer no início, vou substituir Bearer+espaço por nada.
    Assim, sobra só o token...
    Em suma, estou extraindo o token do header
  */
  const token = authHeader.replace('Bearer ', '')

  /*Esse token foi criado pela aplicação ? ele ainda não foi expirado ?
  Diante dessas perguntas, a verificação foi inserida num try/catch
    O try faz a captura, catch dispara a exception
  */
  try {
    /*params: 1 - token 2 - secret
        Esse method vai pegar a secret e inserí-la em verify signature. Isso é lá no site do jwt...
        Se eu colocar um caractere a mais em alguma parte do token lá no site, a assinatura não é validada.
        Esse teste que o method verify faz.
        verify() retorna um JwtPayload
    */
    const decodedToken = verify(token, authConfig.jwt.secret as Secret)
    //Como retorna um JwtPayload, desejo pegar o sub. Também posso pegar outras propriedades tais como exp, iat, etc. JwtPayload é uma interface(ou seja, é um tipo)
    const { sub } = decodedToken as JwtPayloadProps
    /*Aqui vou precisar fazer um override(sobrescrita) na request. Request não tem uma propriedade id nativamente
    Para efetivar a sobrescrita, foi criado um arquivo de definição de tipo.
    Olhe em  @types/expess/index.ts*/
    request.user = { id: sub }
    /*se o verify não retornar nada, o fluxo tem que prosseguir
    para o próximo middleware ou para a requisição em si(vai ser o controller) */
    return next()
  } catch {
    throw new AppError('Invalid authentication token', 401)
  }
}
