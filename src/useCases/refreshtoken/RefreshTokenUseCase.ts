import { client } from "../../db/client"
import { Time } from "../../lib/Time"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import { GenereteRefreshToken } from "../../provider/GenereteRefreshToken"

class RefreshTokenUseCase {
    async execute(refreshToken: string){

        //verifica se tem um Refresh Token válido]
        const vRefreshToken = await client.refreshToken.findFirst({
            where:{
                id: refreshToken
            }
        })
        if(!vRefreshToken){
            throw new Error('Refresh token invalid')
        }
        const vGenerateTokenProvider = new GenerateTokenProvider()
        const vToken = await vGenerateTokenProvider.execute(vRefreshToken.userId)
        
        const nowTimestamp: number = Time.generateTimestamp()
        if(nowTimestamp > vRefreshToken.experisIn){
            await client.refreshToken.deleteMany({
                where:{
                    userId: vRefreshToken.userId 
                }
            })
            const vGenerateRefreshToken = new GenereteRefreshToken()
            const newToken = await vGenerateRefreshToken.execute(vRefreshToken.userId)

            return { vToken, newToken: newToken }
        }

        return { vToken }
    }
}

export { RefreshTokenUseCase }