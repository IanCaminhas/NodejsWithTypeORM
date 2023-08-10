import { Router } from 'express'
import { createRolesController } from '@roles/useCases/createRole'
import { listRolesController } from '@roles/useCases/listRoles'
import { showRolesController } from '@roles/useCases/showRole'
import { updateRolesController } from '@roles/useCases/updateRole'

const rolesRouter = Router()

rolesRouter.post('/', (request, response) => {
  return createRolesController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', (request, response) => {
  return showRolesController.handle(request, response)
})

rolesRouter.put('/:id', (request, response) => {
  return updateRolesController.handle(request, response)
})

export { rolesRouter }
