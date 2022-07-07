import express from "express"
import router from "./routes"

const database = require( "./db")

import "./config/env";

const app = express()

// create routes

// create models

// register first model at database

// create auth service

// create swager

// npm i bcrypt  @types/bcrypt -D - criptografar senha do usuário 

app.use(router)

app.listen(
  process.env.PORT, 
  () => console.log(`Server is running at port ${process.env.PORT}`)
)