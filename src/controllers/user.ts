import { Request, Response, NextFunction } from "express"
import { UserModel } from "../models/user"
import * as bcrypt from "bcrypt";

interface User {
    userId: string,
    name: string,
    userLogin: string,
    password: string,
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.findAll({
            attributes: ['id', 'name', 'userLogin']
        })
        return res.status(200).json({
            data: users
        })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await findUser(req.params.id)
        if (!user) {
            res.status(400).send({ error: "Usuário não encontrado" })
        }

        return res.status(200).json({
            data: { id: user.id, name: user.name, userLogin: user.userLogin }
        })

    } catch (error: any) {

    }
}

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, userLogin, password } = req.body;
        if (!name || !userLogin || !password) {
            res.status(400).send({ error: "Característica necessária à criação não informada" })
        }

        const hashPassword = await bcrypt.hash(password, 16)
        const user = await UserModel.create({
            name, userLogin, password: hashPassword
        })
        return res.status(201).json({
            data: { id: user.id, name: user.name, userLogin: user.userLogin }
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

        const hashPassword = await bcrypt.hash(password, 8)
        await UserModel.update(
            {
                name: name || user.name,
                userLogin: userLogin || user.userLogin,
                password: hashPassword || user.password
            },
            {
                where: { id: user.id },
                returning: true,
                plain: true
            }    
        )

        const updatedUser = await findUser(req.params.id)
        
        return res.status(201).json({
            data: { 
                id: updatedUser.id, 
                name: updatedUser.name, 
                userLogin: updatedUser.userLogin 
            }
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