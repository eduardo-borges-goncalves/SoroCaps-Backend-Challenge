import { UserModel } from "../models/user";
import * as bcrypt from "bcrypt"
import { createToken } from "./jwt";

export const login = async (userLogin: string, password: string) => {

  const user = await UserModel.findOne({
    where: { userLogin }
  })

  if (await bcrypt.compare(password, user.password)) {
    const access_token = createToken(user.id)

    return {
      id: user.id,
      name: user.name,
      access_token
    }
  }
}