import { hash } from "bcryptjs"

import { client } from "../../db/client"
import { UUIDGenerator } from "../../lib/UuidGenerator"
import { Time } from "../../lib/Time"

type IUser = {
    id?: string
    username: string
    name: string
    email: string
    password: string
    cellphone: string
    level?: number
    created_at?: number
    updated_at?: number
}

class CreateUserUseCase {
    async execute({ id, username, name, email, password, cellphone, level, created_at, updated_at }: IUser) {
        // VERIFICAR SE O USUARIO EXISTE
        const userAreadyExists = await client.user.findFirst({
            where: {
                username,
            }
        })

        if (userAreadyExists) {
            throw new Error(" User already exists  ")

        }

        // CADASTRA O USUARIO
        const passwodHash = await hash(password, 8)
        const myUUID: string = UUIDGenerator.generateUUIDv4()
        const timestamp: number = Time.generateTimestamp();

        const user = await client.user.create({
            data: {
                id: myUUID,
                username,
                name,
                email,
                password: passwodHash,
                cellphone,
                level: level || 1,
                created_at: timestamp,
                updated_at: timestamp,

            }
        })
        return user
    }
}

export { CreateUserUseCase }