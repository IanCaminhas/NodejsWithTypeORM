import { Role } from '@roles/entities/Role'
import { Exclude, Expose } from 'class-transformer'
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

  //Com o @Exclude(), o password: string não será mais retornado para o usuário
  //@Exclude() vem do class-transformer
  @Column()
  @Exclude()
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

  //Na API vai aparecer a propriedade avatar_url
  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    //Se não existe avatar
    if (!this.avatar) {
      return null
    }

    return `${process.env.AVATAR_URL}/${this.avatar}`
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
