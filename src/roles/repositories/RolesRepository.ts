import { Role } from '@roles/entities/Role'

//representa as informações que permito receber da aplicação front-end(ou postman, insomnia, etc) através da rota
type CreateRoleDTO = {
  name: string
}

export class RolesRepository {
  private roles: Role[] = []

  constructor() {
    this.roles = []
  }
  //pode ser assim tbm:  create(name: string){}
  //Posso já fazer desestruturado:  create({name}: CreateRoleDTO){}
  create(props: CreateRoleDTO): Role {
    //role tem o uuid criado.
    const role = new Role()

    //Agora preciso fazer o merge com o recebido no body
    //assign -> pego o role e atribuo o name e o created_at
    Object.assign(role, {
      //usando a desestruturação, poderia ter colocado name, created_at: new Date()...
      //name poderia ter feito assim
      name: props.name,
      created_at: new Date(),
    })

    //incluindo a role no array
    this.roles.push(role)
    return role
  }

  findAll(): Role[] {
    return this.roles
  }
}
