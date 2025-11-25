import 'express-async-errors'
import express, { NextFunction, Request, Response } from "express"
import { router } from "./routes"

import cors from "cors"

const vPort = 3030
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: "Error",
        message: error.message
    })
})

app.listen(vPort, () => { console.log('Server is running... in port ' + vPort) })

