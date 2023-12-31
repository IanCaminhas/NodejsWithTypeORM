import { DataSource } from 'typeorm'
import { CreateRolesTable1691316678868 } from './migrations/1691316678868-createRolesTable'
import { Role } from '@roles/entities/Role'
import { CreateUsersTable1692809790987 } from './migrations/1692809790987-CreateUsersTable'
import { AddRoleIdToUsersTable1693257959446 } from './migrations/1693257959446-AddRoleIdToUsersTable'
import { User } from '@users/entities/User'

/*
dataSource exige o port:3306, username, password e host:'localhost'.
Como sqlite roda em arquivos, essas propriedades não são usadas.

database representa o arquivo com banco de dados

entities[] contém as instâncias que vão ser trabalhadas pelo sqlite
as migrações(que são instâncias de classes de migrações) também podem ser especificadas
 entities: [] é um array vazio
migrations: [] é um array vazio
*/
export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User], //Agora eu sei que a aplicação sabe que existe uma entidade do TypeORM
  //Cada migração que vou criando, vou adicionando nesse array. Migração também é uma classe
  migrations: [
    CreateRolesTable1691316678868,
    CreateUsersTable1692809790987,
    AddRoleIdToUsersTable1693257959446,
  ],
})
