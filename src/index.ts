import "./config/env";
import express, { json } from "express"
import router from "./routes"
import { db } from "./models";
import cors from "cors";

const morganBody = require('morgan-body')
const fs = require('fs')
const path = require('path')
const moment = require('moment')

const app = express()

const log = fs.createWriteStream(
  path.join(__dirname, "./logs", `${moment().format('YYYY-MM-DD')}.log`),
  { flags: "a"}
)
morganBody(app, {
  noColors: true, 
  stream: log
})   

// create swager       

app.use(json())
app.use(cors({ credentials: true, origin: true }));
app.use(router);

db.sequelize.sync()
  .then(() => {
    app.listen(
      process.env.PORT,
      () => console.log(`Server is running at port ${process.env.PORT}`)
    )
  })


