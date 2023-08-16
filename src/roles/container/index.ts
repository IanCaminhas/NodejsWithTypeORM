import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { DeleteRoleController } from '@roles/useCases/deleteRole/DeleteRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { ShowRoleController } from '@roles/useCases/showRole/ShowRoleController'
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController'
import { container } from 'tsyringe'

/*
  RegisterSingleton: para que seja criada uma única instância
  da classe para cada ciclo da aplicação. Esse RegisterSingleton vai receber
  2 parâmetros.
  primeiro parâmetro é um token. Geralmente esse Token é o nome da classe.
  O segundo parâmetro é a instanciação da classe em si.

  Quando eu usar o @inject, vou ter que informar o token entre aspas. Por isso
  que o token tem o mesmo nome da classe.
*/
container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
)

container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('ListRolesController', ListRolesController)
container.registerSingleton('ShowRoleController', ShowRoleController)
container.registerSingleton('UpdateRoleController', UpdateRoleController)
container.registerSingleton('DeleteRoleController', DeleteRoleController)
