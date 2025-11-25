import { Request, Response, Router } from "express"
import { CreateUserController } from "./useCases/createUser/CreateUserController"
import { client } from "./db/client"
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController"
import { ListUser } from "./useCases/listUser/ListUser"
import { EnsureAuthenticate } from "./middleware/ensureAuthenticate"
import { RefreshTokenController } from "./useCases/refreshtoken/RefreshTokenController"

import { ManageUserController } from "./useCases/manageUser/ManageUserController"

const router = Router()

const vListUser = new ListUser()
const vCreateUserController = new CreateUserController()
const vAuthenticateUserController = new AuthenticateUserController()
const vRefreshTokenController = new RefreshTokenController()
const vManageUserController = new ManageUserController()

router.post('/createuser', vCreateUserController.handle)
router.post('/login', vAuthenticateUserController.handle)
router.post('/refresh-token', vRefreshTokenController.handle)


router.get('/listuser', EnsureAuthenticate, vListUser.execute)
router.patch('/users/:id/level', EnsureAuthenticate, vManageUserController.updateUserLevel)
router.delete('/users/:id', EnsureAuthenticate, vManageUserController.deleteUser)

export { router }

process.on('SIGINT', async () => {
    await client.$disconnect();
    process.exit();
});