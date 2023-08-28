import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

//Estou criando uma coluna RoleID e uma chave estrangeira. Associando essa coluna RoleID a uma chave estrangeira
export class AddRoleIdToUsersTable1693257959446 implements MigrationInterface {
  //Passo 1: criar a coluna que vai representar a FK
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'roleId',
        type: 'uuid',
        isNullable: true, //quer dizer que podemos ter um usuario sem uma role atribuída
      }),
    )

    /*
      Passo 2: Falar que a coluna criada é uma FK
      nome da FK: UsersRoles
      Qual coluna vai representar a FK UsersRoles ? ['roleId'] de users
      Essa FK está associada a qual tabela ? 'roles'(referencedTableName:)
      De qual coluna que a FK está associada na tabela 'roles' ? 'id'( referencedColumnNames:)
      O que acontece quando apago a role ?  onDelete: 'SET NULL'
    */
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'UsersRoles',
        columnNames: ['roleId'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Primeiro desfaço da FK para depois desfazer da coluna roleId. Ou seja, é na ordem inversa.
    await queryRunner.dropForeignKey('users', 'UsersRoles')
    await queryRunner.dropColumn('users', 'roleId')
  }
}
