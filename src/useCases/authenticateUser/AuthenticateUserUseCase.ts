import { client } from "../../db/client"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"

type IUserAuth = {
    username: string
    password: string
}

class AuthenticateUserUseCase {
    async execute({ username, password }: IUserAuth) {
        // Verificar se o usuario existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        })

        if (!userAlreadyExists) {
            throw new Error('User or password incorret!')
        }

        //Verificar se a senha bate
        const passwordMach = await compare(password, userAlreadyExists.password)


        if (!passwordMach) {
            throw new Error('User or password incorret!')
        }

        //Gerar o token
        const vGenerateTokenProvider = new GenerateTokenProvider()
        const vToken = await vGenerateTokenProvider.execute(userAlreadyExists.id)

        await client.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExists.id
            }
        })

        const vGenerateRefreshToken = new GenerateRefreshToken()
        const vRefreshToken = await vGenerateRefreshToken.execute(userAlreadyExists.id)

        return { vToken, vRefreshToken }
    }
}

export { AuthenticateUserUseCase }