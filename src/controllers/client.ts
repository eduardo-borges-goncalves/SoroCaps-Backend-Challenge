import { Request, Response, NextFunction } from "express"

interface Client {
    clientId: string, 
    companyName: string, 
    cnpj: string, 
    address: string, 
}

export const getClients = (req: Request, res: Response, next: NextFunction) => {
    const clients = "" // escrever método que PEGA clients do DB

    return res.status(200).json({
        data: clients
    })
}

export const getClient = (req: Request, res: Response, next: NextFunction) => {
    const client = "" // escrever método que PEGA client do DB

    return res.status(200).json({
        data: client
    })
}

export const postClient = (req: Request, res: Response, next: NextFunction) => {
    const client = "" // escrever método que CRIA client do DB

    return res.status(201).json({
        data: client
    })
}

export const updateClient = (req: Request, res: Response, next: NextFunction) => {
    const client = "" // escrever método que ATUALIZA client do DB

    return res.status(201).json({
        data: client
    })
}

export const deleteClient = (req: Request, res: Response, next: NextFunction) => {
    const client = "" // escrever método que DELETA client do DB

    return res.status(201).json({
        data: client
    })
}