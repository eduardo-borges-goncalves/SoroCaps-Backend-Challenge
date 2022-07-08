import express, { json } from "express"
import router from "./routes"
import { database  } from "./db";

import "./config/env";
import cors from "cors";

const bodyParser = require('body-parser')

const app = express()

// ASSOCIATIONS
// create auth service
// create swager
// npm i bcrypt  @types/bcrypt -D - criptografar senha do usuário 

app.use(cors({ credentials: true, origin: true }));
app.use(json())
// parse application/json


// parse application/x-www-form-urlencoded

app.use(router)


app.listen(
  process.env.PORT, 
  () => {
    database.sync(),
    console.log(`Server is running at port ${process.env.PORT}`)
  }
)

