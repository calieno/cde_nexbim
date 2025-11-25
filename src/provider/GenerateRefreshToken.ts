import { client } from "../db/client"
import { UUIDGenerator } from "../lib/UuidGenerator"
import { Time } from "../lib/Time"

class GenerateRefreshToken {
    async execute(userId: string) {

        const myUUID: string = UUIDGenerator.generateUUIDv4()
        const timestamp: number = Time.generateTimestamp();
        const experisIn = timestamp + 30

        const vGenerateRefreshToken = await client.refreshToken.create({
            data: {
                id: myUUID,
                userId,
                experisIn,
                created_at: timestamp
            }
        })
        return vGenerateRefreshToken
    }
}

export { GenerateRefreshToken }

process.on('SIGINT', async () => {
    await client.$disconnect()
    process.exit()
})