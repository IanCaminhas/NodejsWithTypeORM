import { Role } from '@roles/entities/Role'

//representa as informações que permito receber da aplicação front-end(ou postman, insomnia, etc) através da rota
export type CreateRoleDTO = {
  name: string
}
//De quais parâmetros eu preciso para conseguir paginar as informações ?
export type PaginateParams = {
  page: number //número da página
  skip: number //Número de registros que quero pular
  take: number //Quantos registros eu quero pegar depois que eu pulei um certo número
}

//De que forma esses dados paginados serão retornados ?
export type RolesPaginateProperties = {
  per_page: number //Quantos registros por página vou retornar ?
  total: number //Total de registros
  current_page: number //página atual
  data: Role[] //São os dados em si. Como é um repository, vou retornar um array de Role
}

export interface IRolesRepository {
  create({ name }: CreateRoleDTO): Promise<Role>
  save(role: Role): Promise<Role>
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<RolesPaginateProperties>
  findById(id: string): Promise<Role | null>
  findByName(name: string): Promise<Role | null>
  delete(role: Role): Promise<void>
}
