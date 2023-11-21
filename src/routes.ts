import { Request, Response, Router } from "express"
import { CreateUserController } from "./useCases/createUser/CreateUserController"
import { client } from "./db/client"
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController"
import { ListUser } from "./useCases/listUser/ListUser"
import { EnsureAuthenticate } from "./middleware/ensureAuthenticate"
import { RefreshTokenController } from "./useCases/refreshtoken/RefreshTokenController"

const router = Router()

const vListUser = new ListUser()
const vCreateUserController = new CreateUserController() 
const vAuthenticateUserController = new AuthenticateUserController()
const vRefreshTokenController = new RefreshTokenController()

router.post('/createuser', vCreateUserController.handle)
router.post('/login', vAuthenticateUserController.handle)
router.post('/refresh-token', vRefreshTokenController.handle)


router.get('/listuser', EnsureAuthenticate, vListUser.execute)

export { router }

process.on('SIGINT', async () => {
    await client.$disconnect();
    process.exit();
});