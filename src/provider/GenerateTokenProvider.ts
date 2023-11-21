import { sign } from "jsonwebtoken"

class GenerateTokenProvider{
    async execute(userId: string){
        const token = sign({}, "09da6017-9082-48f3-b786-2f9e0f2e7817", {
            subject: userId,
            expiresIn: '30s'
        })
        return token 
    }
}

export { GenerateTokenProvider }