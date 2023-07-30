/* Começou com esses scripts como teste
export class AppServer {
  private app: string

  constructor(info: string) {
    //info ?? 'Olá Dev' -> caso não tenha valor em info, vou colocar o valor 'Olá Dev'
    this.app = info ?? 'Olá Dev'
  }
}
*/

import 'dotenv/config'
import 'reflect-metadata'
import { app } from './app'
import { dataSource } from '../typeorm'

/*
//rota raiz que é /
//a arrow function lida com a requisição. Lida com 2 parâmetros: a request e o response
//Trato as informações que recebo através do objeto request
//O objeto response vai montar a informação para quem requisitou essa rota
//O usuario que requisitar a rota raiz(/), vai receber um Json como resposta. O conteúdo do json é 'Olá Dev!'
//Essa rota foi migrada para shared/http/routes
app.get('/', (request, response) => {
  return response.json({ message: 'Olá Dev!' })
})
*/

//Isso é uma promise, pois leva um tempo. Por que ? ele vai ao servidor conectar com o banco de dados e depois trazer o resultado
//Esse servidor pode ser uma outra máquina/servidor físico
//Por isso que deve ser uma promessa: isso leva um tempo
//quando a inicialização de conexão com o BD for bem sucedida, chamo o app.listen e subo o servidor
dataSource.initialize().then(() => {
  //a aplicação rodar e ficar disponível numa porta. Objetivo: tratar as requisições
  //vai customizar uma saída no terminal do servidor(uma mensagem). Objetivo: indicar para o usuário que o servidor está em execução
  //Comando para levantar o servidor: npm run dev
  //Acessando a rota raiz: http://localhost:3000/
  //process.env.PORT: vem de import 'dotenv/config'
  //a ideia é: quando a aplicação subir, realizar a conexão com o banco de dados
  app.listen(process.env.PORT, () => {
    //console.log('Server started on port 3000! ')
    console.log(`Server started on port ${process.env.PORT}!`)
  })
})
