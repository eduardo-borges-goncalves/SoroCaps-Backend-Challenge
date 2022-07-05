import express from "express"
import { router } from "./routes"

import "./config/env";

const app = express()

// conect with database 

// create routes

// create auth service

// create swager

// npm i bcrypt  @types/bcrypt -D - criptografar senha do usuário 

app.use(router)

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))