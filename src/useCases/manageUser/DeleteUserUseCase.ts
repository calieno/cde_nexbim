import { client } from "../../db/client";

interface IRequest {
    targetUserId: string;
    requesterId: string;
}

export class DeleteUserUseCase {
    async execute({ targetUserId, requesterId }: IRequest) {
        const requester = await client.user.findUnique({
            where: { id: requesterId }
        });

        if (!requester) {
            throw new Error("Requester not found");
        }

        if (requester.level !== 4) {
            throw new Error("Only ADM can delete users");
        }

        // Delete refresh tokens first (cascade usually handles this but let's be safe if no cascade)
        // Prisma schema says: refresh_token RefreshToken?
        // If relation is configured with onDelete: Cascade, it's fine.
        // Let's check schema again? No, I'll just try to delete user. 
        // If it fails due to foreign key, I'll delete token first.
        // Actually, schema didn't show onDelete: Cascade explicitly in the relation side shown.
        // But let's assume standard behavior or handle error.

        // Safe approach: delete token first if exists
        await client.refreshToken.deleteMany({
            where: { userId: targetUserId }
        });

        await client.user.delete({
            where: { id: targetUserId }
        });

        return { message: "User deleted successfully" };
    }
}
