import { RolesRepository } from '@roles/repositories/RolesRepository'
import { Router } from 'express'
const rolesRouter = Router()
const rolesRepository = new RolesRepository()

// Como não tinha um banco de dados, foi usado um array para armazenar os dados em memória
//Falo que roles é do tipo Role[], ou seja, Role array
//const roles: Role[] = [] //essa estrrtura de dados foi transferida para o RolesRepository. Lá é que manipulamos

rolesRouter.post('/', (request, response) => {
  //Por enquanto, só o name que está sendo enviado pelo front-end
  /*
    ------Essa foi a primeira forma-------------
    Na rota, estou fazendo a atribuição que o id deve ter. A classe de rotas não deve ter essa responsabilidade. Vou passar isso também
    para a classe Role. Ou seja, essa classe Role será a nossa entidade Role para a aplicação.
    const { name } = request.body
    const role = {
    id: uuidv4(),
    name,
    created_at: new Date(),
  }
  */
  /* Isso foi transferido para o RolesRepository. Estava fazendo a
  manipulação aqui no arquivo de rotas. Isso foi para o RolesRepository
  //o request tem o body com as informações a serem cadastradas
  const { name } = request.body
  //role tem o uuid criado.
  const role = new Role()

  //Agora preciso fazer o merge com o recebido no body
  //assign -> pego o role e atribuo o name e o created_at
  Object.assign(role, {
    name,
    created_at: new Date(),
  })

  //incluindo a role no array
  roles.push(role)
  */
  const { name } = request.body
  //como o metodo create de rolesRepository recebe um objeto, por isso passei o name entre {}
  const role = rolesRepository.create({ name })

  return response.status(201).json(role)
})

export { rolesRouter }
