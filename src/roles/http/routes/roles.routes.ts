import { RolesRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { Router } from 'express'
const rolesRouter = Router()
const rolesRepository = new RolesRepository() //essa estrutura foi para o controlador
const createRoleController = new CreateRoleController()
// Como não tinha um banco de dados, foi usado um array para armazenar os dados em memória
//Falo que roles é do tipo Role[], ou seja, Role array
//const roles: Role[] = [] //essa estrrtura de dados foi transferida para o RolesRepository. Lá é que manipulamos
//sabe por que request e response não são tipados ? porque eles estao dentro da estrutura Router() que já infere os tipos
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
  /*
  Toda a estrutura foi passada para controlador
  const { name } = request.body // foi passada para o controlador
  //O que uma rota se resume ? receber e encaminhar os dados para um controlador específico,
  //Ou seja, precisamos de um estrutura específica para lidar com as informaçoes as seguintes informações:
  //criar instância do repositório, verificar as regras de negócio, tudo que precisar ser feito em termos de manipulação da informação
  //Em suma, tudo isso não deve ser feito pela rota
  //Conrolador tbm tem as suas ações limitadas: não ele que deve verificar if (roleAlreadyExists) {}, pois se trata de uma regra de negócio
  //Vai ter outra estrutura para tratar regras de negócio: os uses cases
  //uses cases juntamente com as entidades é quem controlam as regras de negócio que precisam ser atendidas pela aplicação
  //controlador vai trabalhar com o case use. Eles dois juntos que vão realizar as verificações
  //controlador encaminha as verificações ao casos de uso
  const roleAlreadyExists = rolesRepository.findByName(name)
  //se tá passando uma role com nome igual a uma role existente...
  if (roleAlreadyExists) {
    return response.status(400).json({ error: 'Role already exists ' })
  }
  //se tá passando uma role com nome diferente a uma role existente...
  //como o metodo create de rolesRepository recebe um objeto, por isso passei o name entre {}
  const role = rolesRepository.create({ name })

  return response.status(201).json(role)
  */
  //Em suma: a rota recebe as informações, envia para o controlador. A rora vai pegar o resultado do controlador e devolver
  return createRoleController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  const roles = rolesRepository.findAll()
  return response.json(roles)
})

export { rolesRouter }
