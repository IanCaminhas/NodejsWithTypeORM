/*Quando precisamos criar rotas fora do arquivo onde está a instância do express(server.ts, dentro dele o const app),
precisamos desse Router. Através do Router, conseguimos desacoplar as rotas do arquivo principal onde está a instância
do express(const app do arquivo server.ts)
 */
import { Router } from 'express'
import { rolesRouter } from '@roles/http/routes/roles.routes'
import { usersRouter } from '@users/http/users.routes'

//Criação do roteador, ou seja, o definidor de rotas
//routes é uma instância do Router
const routes = Router()

routes.get('/', (request, response) => {
  //disparei uma nova msg de erro instanciando a classe Error. Essa classe é global, não preciso importar nada
  //objetivo: ninguém acesssar a rota
  //throw new Error('Acesso negado')
  //Customizando a mensagem de erro:
  //throw new AppError('Acesso negado') AppError é de import { AppError } from '@shared/errors/AppError'
  //Se eu fizer throw new Error('Acesso negado'), vai dar um "status": "error" e message: "Internal server error"
  //Se eu quiser enviar um olá dev! para o usuario em json
  return response.json({ message: 'Olá Dev!' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

export { routes }
