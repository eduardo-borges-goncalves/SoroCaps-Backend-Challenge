import "./config/env";
import express, { json } from "express"
import router from "./routes"
import { database } from "./database/db";

import cors from "cors";

const app = express()

// create auth service
// create swager

app.use(json())
app.use(cors({ credentials: true, origin: true }));
app.use(router); 

app.listen(
  process.env.PORT,
  () => {
    database.sync()
      console.log(`Server is running at port ${process.env.PORT}`)
  }
)

