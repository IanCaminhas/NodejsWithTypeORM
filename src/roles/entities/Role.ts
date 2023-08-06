import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

/*@Enitty é o decorator...
'roles' representa o nome da tabela do BD que vai ser mapeada para a classe Role */
@Entity('roles')
export class Role {
  /*Podemos ter propriedades que não precisarão ser mapeadas numa tabela de BD.
    Podemos ter a propriedade full_name:string que não está mapeado no BD.
   Em suma: se não usar o decorator na coluna, não vai ser armazenado no BD
  */

  /*Com isso, o typeORM vai realizar o mapeamento do atributo id(está decorado com o @PrimaryColumn())
  a chave primária da tabela no BD */
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
