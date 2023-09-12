//Vou criar um usuário. Vai ser o admin. Tbm vai ser a conta default da aplicação
//as uuidv4 é o apelido do v4
import { v4 as uuidv4 } from 'uuid'
import { dataSource } from '@shared/typeorm'
import { hash } from 'bcryptjs'

async function create() {
  //Como já possuo o datasource configurado na aplicação, vou realizar a conexão
  const connection = await dataSource.initialize()
  //Create Role
  const roleId = uuidv4()
  await connection.query(`
    INSERT INTO roles(id, name)
    values('${roleId}', 'T.I.')
  `)

  //Create User
  const userId = uuidv4()
  const password = await hash('1234', 10)
  //Uso as aspas no "isAdmin" em função dele ser um booleano
  await connection.query(`
  INSERT INTO users(id, name, email, password, "isAdmin", roleId)
  values('${userId}', 'admin', 'a@a.com', '${password}', true, '${roleId}')
`)

  //desfaço a a connection para ela não ficar aberta do servidor
  await connection.destroy()

  //Posso fazer os passos anteriores em todas as tabelas do projeto. Posso inserir 100 registros de uma vez!! pra isso, uso o for
}

create().then(() => console.log('User admin cerated!'))
