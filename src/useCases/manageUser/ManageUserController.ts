import { Request, Response } from "express";
import { UpdateUserLevelUseCase } from "./UpdateUserLevelUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class ManageUserController {
    async updateUserLevel(request: Request, response: Response) {
        const { id } = request.params; // target user id
        const { level } = request.body;
        const requesterId = (request as any).userId;

        const updateUserLevelUseCase = new UpdateUserLevelUseCase();
        const user = await updateUserLevelUseCase.execute({
            targetUserId: id,
            newLevel: Number(level),
            requesterId
        });

        return response.json(user);
    }

    async deleteUser(request: Request, response: Response) {
        const { id } = request.params;
        const requesterId = (request as any).userId;

        const deleteUserUseCase = new DeleteUserUseCase();
        const result = await deleteUserUseCase.execute({
            targetUserId: id,
            requesterId
        });

        return response.json(result);
    }
}
