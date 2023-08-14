import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { container } from 'tsyringe'

/*
  RegisterSingleton: para que seja criada uma única instância
  da classe para cada ciclo da aplicação. Esse RegisterSingleton vai receber
  2 parâmetros.
  primeiro parâmetro é um token. Geralmente esse Token é o nome da classe.
  O segundo parâmetro é a instanciação da classe em si.
*/
container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
)
