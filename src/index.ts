import "./config/env";
import express, { json } from "express"
import router from "./routes"

import { db } from "./models";
import cors from "cors";

const app = express()

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


