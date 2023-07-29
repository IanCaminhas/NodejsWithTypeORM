/* Começou com esses scripts como teste
export class AppServer {
  private app: string

  constructor(info: string) {
    //info ?? 'Olá Dev' -> caso não tenha valor em info, vou colocar o valor 'Olá Dev'
    this.app = info ?? 'Olá Dev'
  }
}
*/

import 'dotenv/config'
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

/*
//rota raiz que é /
//a arrow function lida com a requisição. Lida com 2 parâmetros: a request e o response
//Trato as informações que recebo através do objeto request
//O objeto response vai montar a informação para quem requisitou essa rota
//O usuario que requisitar a rota raiz(/), vai receber um Json como resposta. O conteúdo do json é 'Olá Dev!'
//Essa rota foi migrada para shared/http/routes
app.get('/', (request, response) => {
  return response.json({ message: 'Olá Dev!' })
})


*/
//a aplicação rodar e ficar disponível numa porta. Objetivo: tratar as requisições
//vai customizar uma saída no terminal do servidor(uma mensagem). Objetivo: indicar para o usuário que o servidor está em execução
//Comando para levantar o servidor: npm run dev
//Acessando a rota raiz: http://localhost:3000/
//process.env.PORT: vem de import 'dotenv/config'
app.listen(process.env.PORT, () => {
  //console.log('Server started on port 3000! ')
  console.log(`Server started on port ${process.env.PORT}!`)
})
