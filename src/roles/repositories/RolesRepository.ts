import { Role } from '@roles/entities/Role'
import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'

//representa as informações que permito receber da aplicação front-end(ou postman, insomnia, etc) através da rota
type CreateRoleDTO = {
  name: string
}
//De quais parâmetros eu preciso para conseguir paginar as informações ?
export type paginateParams = {
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

export class RolesRepository {
  //esse repository vai manipular as informações da estrutura de dados Role
  private repository: Repository<Role>
  private static INSTANCE: RolesRepository

  private constructor() {
    //Estou atribuindo a minha propriedade repository o Repository de Role
    //Agora tenho a instância para ficar manipulando Roles no projeto
    this.repository = dataSource.getRepository(Role)
  }

  public static getInstance(): RolesRepository {
    //se a instância ainda não foi criada, crie para mim
    if (!RolesRepository.INSTANCE) {
      RolesRepository.INSTANCE = new RolesRepository()
    }
    return RolesRepository.INSTANCE
  }

  //A requisição precisa ser assíncorna(async), pois estou fazendo uma conexão com o BD
  async create({ name }: CreateRoleDTO): Promise<Role> {
    //O metodo create cria o objeto,ou seja, monta a estrutura
    const role = this.repository.create({ name })
    //Pego role e passo por parâmetro para o method save. Agora sim vai estar gravado no BD
    return this.repository.save(role)
  }

  /*Uso esse method para atualizar uma informação de uma entidade
  No method create(), primeiro crio um objeto para depois salvar.
  No method save() já existe uma propriedade e estou atualizando ela */
  async save(role: Role): Promise<Role> {
    return this.repository.save(role)
  }

  //Method para quando eu precisar apagar uma entidade(registro no BD)
  async delete(role: Role): Promise<void> {
    //repository também existe um method delete que recebe um id
    //Aqui está recebendo uma entidade
    await this.repository.remove(role)
  }

  /*Aqui é paginação.
  Quais parâmetros eu retorno com os dados paginados ?
  Pule tantos registros(skip(tantos)) e depois pegue tantos registros(take(tantos))
  Se fosse usando a desestruturação: async findAll({page,skip,take}: PaginateParams)
  Agora consigo fazer um findAll() dizendo:
  page -> qual página nós queremos ?
  skip -> quantos registros quero pular ?
  take -> quantos registros quero pegar ?

  Aí os dados vão ser retornados paginados

  */
  async findAll(params: PaginateParams): Promise<RolesPaginateProperties> {
    /*
    Esse method getManyAndCount() retorna um array com duas posições: primeira posição um array de Roles
    e a segunda posição a quantidade de Roles retornadas.
    Dentro do array eu já desestruturo: const [roles, count]
    */

    const [roles, count] = await this.repository
      .createQueryBuilder()
      .skip(params.skip)
      .take(params.take)
      .getManyAndCount()

    const result = {
      per_page: params.take,
      total: count,
      current_page: params.page,
      data: roles,
    }

    return result
  }

  //Ao fazer a busca no BD, pode vir uma Role ou null
  async findByName(name: string): Promise<Role | null> {
    /* Imagine o seguinte nome para o método: findByName(: string): Promise<Role | null> {
      teria que fazer da seguinte forma:
      const role = this.repository.findOneBy({ name: xpto })
      como o nome do campo da tabela é igual ao parâmetro passado, posso passar da forma simplificada({ name })
      Isso se chama shortSintax
    */
    /*
    const role = await this.repository.findOneBy({ name })
    return role
    */
    return this.repository.findOneBy({ name })
  }

  async findById(id: string): Promise<Role | null> {
    /*
    const role = await this.repository.findOneBy({ id })
    return role
    */
    return this.repository.findOneBy({ id })
  }
}
