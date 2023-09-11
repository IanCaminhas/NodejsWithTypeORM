/*.d significa definição de tipagem apenas -> Não vou encontrar implementações, apenas definição de tipagens.
Estou trabalhando com o namespace Express. Dentro do namespace quero modificar a interface(tipo) Request
Essa modificação é a inserção do id do user na Request
Por favor: não estou substituindo tudo do Request por user: { id: string }
Mantém o que já existe e acrescenta -> user: { id: string }
Para inserir mais informações, basta criar novos objetos
*/
declare namespace Express {
  //Esse id é o uuid do usuário
  export interface Request {
    user: {
      id: string
    }
  }
}
