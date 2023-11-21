import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle( request: Request, response: Response){
        const { username, password } = request.body

        const vAuthenticateUserUseCase = new AuthenticateUserUseCase()

        const token = await vAuthenticateUserUseCase.execute({
            username,
            password
        })
        return response.json(token )
    }
}

export { AuthenticateUserController }