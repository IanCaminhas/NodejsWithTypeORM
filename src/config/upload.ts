/*
  É um arquivo de configuração para definir algumas coisas pra usar com multer.
  Exemplos: a configuração de armazenamento ao definir nomes específicos dos arquivos.
    Objetivo: evitar a colisão de nomes de arquivos no servidor já que todos os uploads
    vão cair na mesma pasta. Evitar dois ou mais arquivos com o mesmo nome!!!!
*/

import multer, { StorageEngine } from 'multer'
import path from 'node:path'
import crypto from 'node:crypto'

type UploadConfig = {
  directory: string
  storage: StorageEngine
}

/*
Vou usar um folder padrão como local/destino para armazenar os uploads enviados para o servidor. Ou seja: o diretório onde vão ser armazenadas as fotos.
Variável path.resolve() vai resolver o path completo de onde vai estar os arquivos(o local dos arquivos)
__dirname é uma variável global do nodejs. Essa variável pega por padrão o local do arquivo atual que estou manipulando(src/config/upload.ts).
Mas quero criar uma pasta uploads na raiz do projeto. Como estou em config, volto um nível que vai para src. Volto mais um nível estou na raiz
  Em suma: precisei informar '..' duas vezes para voltar dois níveis. Peguei o __dirname como referência.
  Quando chego na raiz, vou criar a pasta 'uploads'. Esse terceiro parâmetro é o nome da pasta.
*/
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

/*Esse é um objeto conter as configurações que desejo usar para os nossos serviços(um useCase, por exemplo).
  storage é a propriedade que vai conter as definições que o multer disponibiliza. Formas de armazenar de um upload usando o multer:
      Tem o memoryStorage(memória ram) e o diskStorage(em disco), etc...
  Transformação do nome do arquivo: filename
  filename(request, file, callback){} -> objetivo é pegar o nome do arquivo e concatenar com um hash. Resolve o nome do arquivo da
  forma como ele vai ser armazenado de fato.
*/
export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      /*
        Isso que estou criando é um hash. Vou usar isso para concatenar com o nome do arquivo.
        crypto.randomBytes(10) -> Representam o número de bytes a serem gerados
        toString('hex') -> transformo numa string no padrão hexadecimal.
      */
      const fileHash = crypto.randomBytes(10).toString('hex')
      /*file.originalname -> Nome do arquivo que veio do front-end
        em file posso receber image.png, image.jpg, avatar.png
        concateno image,hashGerado e extensão
      */
      const filename = `${fileHash}_${file.originalname}`
      //o filename que vai ser retornado
      callback(null, filename)
    },
  }),
} as UploadConfig
