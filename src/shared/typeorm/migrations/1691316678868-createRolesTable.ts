import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRolesTable1691316678868 implements MigrationInterface {
  /*Através do parâmetro queryRunner: QueryRunner que conseguimos criar as operações/comandos lá no banco de dados
  Como são operações executadas num servidor de banco de dados que,
  muitas vezes, esse BD nem está na mesma máquina onde a aplicação vai executar... Então o método é async */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles', //nome da tabela para ser criada
        columns: [
          {
            name: 'id', //nome da coluna
            type: 'uuid', //tipo da coluna
            isPrimary: true, //Essa coluna uma chave primária
          },
          {
            name: 'name',
            type: 'string',
            isUnique: true, //Não quero que exista roles com nomes iguais
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP', //Significa o horário que o registro foi gravado na tabela. É um valor default
          },
        ], //as colunas da tabela. Cada coluna aqui é um objeto
      }),
    )
  }

  //Esse método reverte o que foi feito no metodo up(). Se eu criei a tabela roles, a reversão será a exclusão(drop) dela
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles')
  }
}
