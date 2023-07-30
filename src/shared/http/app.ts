//esse arquivo contem tudo que é do express

import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'
import { routes } from './routes'
import { AppError } from '@shared/errors/AppError'
import swaggerFile from '../../swagger.json'

//Instância do express
const app = express()

app.use(cors())

//Vai trabalhar com o padrão Json
//Isso é para não ter um retorno com conteúdo indefinido(undefined)
app.use(express.json())
//configuração do swagger. '/docs' é a rota/endpoint. Manipualdor é o swaggerUI.... swaggerUI.setup é a configuração a ser considerada
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

//arquivo de rotas, ou seja, o roteador
app.use(routes)

/*middlewares que tratam erros usam o parâmetro a mais denominado error
A tipagem Error é global. Por isso, não preciso importar
Request, Response e NextFunction já vem do próprio express.
Todos os erros capturados após as excuções das rotas(routes) for uma instância da classe
AppError, return response.status é retornado como um json para o usuário.
Quando for um erro gerado pela aplicação, o erro 500(erro interno de servidor) por exemplo.
Esse erro 500 pode ser por falha com a conexão de banco de dados, por exemplo.
O seguinte trecho é disparado:  return response.status(500).json({})
São problemas que não conseguimos antever
*/
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    //aqui estou garantindo que é uma instância da classe AppError. Posso chamar o response.status() com segurança
    //estou retornando também um json com o status e a mensagem
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: error,
        message: error.message,
      })
    }
    //esse  console.log é apenas para facilitar a debugação do código durante o desenvolvimento
    console.log(error)
    //uma condicional para quando o erro não for uma instância da classe AppError. Exemplo: erro 500(erro interno de servidor)
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  },
)

export { app }
