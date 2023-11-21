import { client } from "../../db/client";
import { Request, Response } from 'express'

class ListUser {
    async execute(request: Request, response: Response){
        const todosUsuarios = await client.user.findMany()
        
        if (!todosUsuarios) {
            throw new Error(" Not registery  ") 
            
        }
        
        response.json(todosUsuarios)
        
    }
}

export { ListUser }