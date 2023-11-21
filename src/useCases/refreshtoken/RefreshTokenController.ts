import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController{
    async handle(request: Request, response: Response){
        const { refreshtoken } = request.body

        const vRefreshTokenUseCase = new RefreshTokenUseCase()
        const vToken = await vRefreshTokenUseCase.execute(refreshtoken)

        return response.json(vToken)
    }
}

export { RefreshTokenController }