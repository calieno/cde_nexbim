import { client } from "../../db/client";

interface IRequest {
    targetUserId: string;
    newLevel: number;
    requesterId: string;
}

export class UpdateUserLevelUseCase {
    async execute({ targetUserId, newLevel, requesterId }: IRequest) {
        // 1. Check if requester exists and get their level
        const requester = await client.user.findUnique({
            where: { id: requesterId }
        });

        if (!requester) {
            throw new Error("Requester not found");
        }

        // 2. Check if target user exists
        const targetUser = await client.user.findUnique({
            where: { id: targetUserId }
        });

        if (!targetUser) {
            throw new Error("User not found");
        }

        // 3. Validate permissions
        // Levels: 1 (Default), 2, 3, 4 (ADM)

        const requesterLevel = requester.level;
        const currentTargetLevel = targetUser.level;

        if (requesterLevel === 4) {
            // ADM can do anything (promote or demote)
            // Proceed
        } else if (requesterLevel === 3) {
            // Level 3 can promote to 3
            if (newLevel > 3) throw new Error("Insufficient permissions to promote to ADM");
            if (newLevel < currentTargetLevel) throw new Error("Only ADM can demote users");
            if (newLevel === currentTargetLevel) throw new Error("User is already at this level");

            // Can only promote Level 1 or 2
            if (currentTargetLevel >= 3) throw new Error("Cannot promote this user");

        } else if (requesterLevel === 2) {
            // Level 2 can promote Level 1 to 2
            if (newLevel > 2) throw new Error("Insufficient permissions");
            if (newLevel < currentTargetLevel) throw new Error("Only ADM can demote users");

            if (currentTargetLevel !== 1) throw new Error("Can only promote Level 1 users");
        } else {
            throw new Error("Insufficient permissions");
        }

        // 4. Update user
        const updatedUser = await client.user.update({
            where: { id: targetUserId },
            data: {
                level: newLevel,
                updated_at: Math.floor(Date.now() / 1000)
            }
        });

        return updatedUser;
    }
}
