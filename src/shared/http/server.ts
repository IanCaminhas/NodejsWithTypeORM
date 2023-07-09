class AppServer {
    private app: string

    constructor(info: string) {
        //info ?? 'Olá Dev' -> caso não tenha valor em info, vou colocar o valor 'Olá Dev'
        this.app = info ?? 'Olá Dev'
    }
}