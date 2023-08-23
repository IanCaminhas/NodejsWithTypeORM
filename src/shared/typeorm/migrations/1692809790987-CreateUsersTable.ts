import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1692809790987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'email',
            type: 'string',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'string',
          },
          {
            name: 'avatar', //isso é a foto
            type: 'string',
            isNullable: true, //Não sou obrigado a importar o avatar no cadastro
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: false, //um usuário criado, por padrão ele não é administrador
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    )
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
