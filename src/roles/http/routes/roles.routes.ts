import { Role } from '@roles/entities/Role'
import { Router } from 'express'
const rolesRouter = Router()

// Como não tinha um banco de dados, foi usado um array para armazenar os dados em memória
//Falo que roles é do tipo Role[], ou seja, Role array
const roles: Role[] = []

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

  return response.status(201).json(role)
})

export { rolesRouter }
