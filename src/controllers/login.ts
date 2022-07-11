import { NextFunction, Request, Response } from "express";
import { login } from "../services/login";

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userLogin, password } = req.body;

        const user = await login(userLogin, password)

        user ?
            res.status(200).json({ data: user })
            :
            res.status(404).json({ message: "Dados inválidos" })

    } catch (error: any) {
        return next(new Error(error))
    }
}