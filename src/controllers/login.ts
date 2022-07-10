import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userLogin, password } = req.body;
        const user = await UserModel.findOne({
            where: { userLogin }
        })
        
        if (await bcrypt.compare(password, user.password)) {
            const token = process.env.APP_SECRET && jwt.sign(
                { id: user.id },
                process.env.APP_SECRET, 
                { expiresIn: "1h" }
            )

            const data = {
                id: user.id,
                name: user.name,
                token
            }

            return res.status(200).json({ data: data })
        } else {
            return res.status(404).json({ message: "Dados inválidos" })
        }
    } catch (error: any) {
        return next(new Error(error))
    }
}