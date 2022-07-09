import { Request, Response, NextFunction } from "express"
import { ClientModel } from "../models/client"
import { SalesOrderModel } from "../models/salesOrder"

interface Client {
    clientId: string,
    companyName: string,
    cnpj: string,
    address: string,
}

export const getClients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clients = await ClientModel.findAll()
        if (clients.length === 0) {
            return res.status(204).send({ message: "Nenhum cliente cadastrado" })
        }

        return res.status(200).json({
            data: clients
        })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const getClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientId = req.params.id 

        const client = await ClientModel.findOne({
            where: { clientId }
        })
        if (!client) {
            return res.status(400).send({ error: "Cliente não encontrado" });
        }

        return res.status(200).json({
            data: client
        })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const postClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyName, cnpj, address } = req.body;
        if (!companyName || !cnpj || !address) {
            res.status(400).send({ error: "Propriedade necessária à criação de cliente ausente" })
        }
        const client = await ClientModel.create({ companyName, cnpj, address })
   
        return res.status(201).json({
            data: client
        })
    } catch (error: any) {
        return next(new Error(error));
    }
}

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientId = req.params.id
        const client = await ClientModel.findOne({
            where: { id: clientId }
        })
        if (!client) {
            return res.status(400).send({ error: "Cliente não encontrado" })
        }

        const { companyName, cnpj, address } = req.body;
        const updatedClient = await ClientModel.update(
            {
                companyName: companyName || client.companyName,
                cnpj: cnpj || client.cnpj,
                address: address || client.address
            },
            {
                where: {id: client.id},
                returning: true,
                plain: true,               
            }
        )

        return res.status(201).json({
            data: updateClient
        })
    } catch (error: any) {
        return next(new Error(error))
    }
}

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = await ClientModel.findOne({
            where: { id: req.params.id }
        });
        if (!client) {
            return res.status(400).send({ error: 'Cliente não encontrado' });
        };

        await client.destroy
        return res.status(204).send({})
    } catch (error: any) {
        return next(new Error(error))
    }
}