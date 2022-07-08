import { Request, Response, NextFunction } from "express"
import { UserModel } from "../models/user"

interface User {
    userId: string,
    name: string,
    userLogin: string,
    password: string,
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.findAll()
        return res.status(200).json({
            data: users
        })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = findUser(req.params.id)
        if (!user) {
            res.status(400).send({ error: "Usuário não encontrado" })
        }

        return res.status(200).json({
            data: user
        })

    } catch (error: any) {

    }
}

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, userLogin, password } = req.body;
        if (!name || !userLogin || !password) {
            res.status(400).send({ error: "Usuário não encontrado " })
        }
        const user = await UserModel.create({
            name, userLogin, password
        })
        return res.status(201).json({
            data: user
        })

    } catch (error: any) {
        return next(new Error(error))
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, userLogin, password } = req.body
        const user = await findUser(req.params.id)
        if (!user) {
            res.status(400).send({ error: "Usuário não encontrado" })
        }
        const updatedUser = await UserModel.update(
            {
                name: name || user.name,
                userLogin: userLogin || user.userLogin,
                password: password || user.password
            },
            {
                where: { id: user.id },
                returning: true,
                plain: true
            }
        )
        return res.status(201).json({
            data: updatedUser
        })
    } catch (error: any) {
        return next(new Error(error))
    }

}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = findUser(req.params.id)
        if (!user) {
            res.status(400).send({ error: "Usuário não encontrado" })
        }

        return res.status(204).send({})
    } catch (error: any) {
        return next(new Error(error))
    }
}

const findUser = async (id: string) => {
    return await UserModel.findOne({
        where: { id }
    })
}