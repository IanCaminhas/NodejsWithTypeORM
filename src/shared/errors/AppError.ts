//customizando a mensagem de erro para toda a aplicação. Vai disparar excpetions

export class AppError {
  /*mensagem a ser exibida para o usuario. readonly -> somente leitura e só faço a atribuição apenas uma vez.
  Só atribuo pela primeira vez. Não consigo alterar mais
  */
  public readonly message: string
  //status code Http: que tipo de código vai ser retornado ? 401, 404, 500, etc
  public readonly statusCode: number

  //statusCode já possui um valor padrão
  constructor(message: string, statusCode = 400) {
    this.message = message
    //se o status code não for passado, vai receber o 400 por padrão
    this.statusCode = statusCode
  }
}

//Assim que uso a classe: new AppError('Acesso negado', 401)
