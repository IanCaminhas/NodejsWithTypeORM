import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import multer from 'multer'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'
import { isAuthenticated } from '@shared/middlewares/isAuthenticated'
import uploadConfig from '@config/upload'
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarController'
import { ShowProfileController } from '@users/useCases/showProfile/ShowProfileController'
import { UpdateProfileController } from '@users/useCases/updateProfile/UpdateProfileController'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)
const updateProfileController = container.resolve(UpdateProfileController)
const upload = multer(uploadConfig)

/*Para criar um usuário, invoco o middleware isAuthenticated.
Ou seja, para garantir que o user está autenticado.
Aqui estou protegendo a rota.
*/
usersRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    },
  }),
  (request, response) => {
    return createUserController.handle(request, response)
  },
)

/*Para listar os users, invoco o middleware isAuthenticated.
Ou seja, para garantir que o user está autenticado.
Aqui estou protegendo a rota.
*/
usersRouter.get(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  (request, response) => {
    return listUsersController.handle(request, response)
  },
)

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request, response) => {
    return createLoginController.handle(request, response)
  },
)

/*

password_confirmation: Joi.string()
        .valid(Joi.ref('password')) //pego a referência para validar. No caso é o password
        .when('password', { //Qual validação desejo fazer ?
          is: Joi.exist(), se tem valor informado, password_confirmation passa a ser requerido tbm[password_confirmation]
          then: Joi.required(),
        }),
        Em suma:
        Inicialmente, password_confirmation não é requerido. Mas se password for preenchido, password_confirmation
        passa a ser requerido sim
 */

usersRouter.put(
  '/profile',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  (request, response) => {
    return updateProfileController.handle(request, response)
  },
)

/*Por que patch ? porque estamos fazendo a atualização de uma única informação. Que no caso é o campo avatar
    Revisão: usamos patch para atualizações pequenas.
  upload.single('avatar') -> pegando o arquivo enviado através do multer */
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    return updateAvatarController.handle(request, response)
  },
)

usersRouter.get('/profile', isAuthenticated, (request, response) => {
  return showProfileController.handle(request, response)
})

export { usersRouter }
