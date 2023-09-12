import path from 'node:path'
import { inject, injectable } from 'tsyringe'
import fs from 'node:fs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import uploadConfig from '@config/upload'

type UpdateAvatarDTO = {
  userId: string
  avatarFileName: string
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute({ avatarFileName, userId }: UpdateAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      /*
        Para o usuário alterar o avatar, ele precisa estar logado.
        Se não achou o user, quer dizer que o user não está autenticado
      */
      throw new AppError('Only authenticated users can change avatar', 401)
    }
    /*
    O usuário possui algum avatar ? Se sim, quero fazer uma substituição.
      Nesse caso, vou apagar o antigo e persistir o novo avatar. Não tem porque manter o antigo no servidor!! Haja disco!!!
    */
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      /*stat vai verificar se o arquivo realmente existe. Ou seja, está no local ?  */
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      //Estou deletando o avatar pré-existente
      if (userAvatarFileExists) {
        //unlink -> Vai no sistema de arquivos e apaga o arquivo do sistema de arquivos.
        await fs.promises.unlink(userAvatarFilePath)
      }
    }
    //Agora salvo o novo avatar. Mas antes... apaguei o avatar que existia
    user.avatar = avatarFileName
    //salvo o avatar filename. Retorno o user com o avatar filename também
    return this.usersRepository.save(user)
  }
}
