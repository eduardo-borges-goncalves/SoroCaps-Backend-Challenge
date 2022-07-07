import express, { json } from "express"
import router from "./routes"
import { database  } from "./db";

import "./config/env";

const app = express()

// create routes

// create models

// register first model at database

// create auth service

// create swager

// npm i bcrypt  @types/bcrypt -D - criptografar senha do usuário 

app.use(router)
app.use(json())

app.listen(
  process.env.PORT, 
  () => {
    database.sync(),
    console.log(`Server is running at port ${process.env.PORT}`)
  }
)

