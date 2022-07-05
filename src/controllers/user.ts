import { Request, Response, NextFunction } from "express"

interface User {
    userId: string, 
    name: string, 
    userLogin: string, 
    password: string, 
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = ""// conectar com db e pegar users;
    return res.status(200).json({
        data: users
    })
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = ""// conectar com db e pegar user;
    return res.status(200).json({
        data: user
    })
}

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = ""// conectar com db e CRIAR user;
    return res.status(201).json({
        data: user
    })
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = ""// conectar com db e ATUALIZAR user;
    return res.status(201).json({
        data: user
    })
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = ""// conectar com db e DELETAR user;
    return res.status(204)
}