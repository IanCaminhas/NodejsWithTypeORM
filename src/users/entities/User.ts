import { Role } from '@roles/entities/Role'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  isAdmin: boolean

  @Column()
  avatar?: string

  //options recebe a questão do relacionamento
  //Dê um ctrl + enter para apresentar as opções
  //cascade: true -> quando eu der um save na instância de user e se eu tiver um obj Role relacionado eu já salvo lá na tabela de Roles
  @ManyToOne(() => Role, {
    cascade: true,
  })
  role: Role

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
