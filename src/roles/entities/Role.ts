import { v4 as uuidv4 } from 'uuid'

//essa classe é quem define o id para cada instância que for criada
export class Role {
  //id é opcional. Por isso o ?
  id?: string
  name: string
  created_at: Date

  constructor() {
    //se o id nao estiver definido, atribuo um uuid
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
