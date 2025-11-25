import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { username, name, email, password, cellphone, level } = request.body

        const vCreateUsersUseCase = new CreateUserUseCase()

        const user = await vCreateUsersUseCase.execute({
            username,
            name,
            email,
            password,
            cellphone,
            level
        })
        response.json(user)
    }
}

export { CreateUserController }