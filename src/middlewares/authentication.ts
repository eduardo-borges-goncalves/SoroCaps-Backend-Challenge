import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token é obrigatório!" });
  }

  const [, token] = authHeader.split(' ')

  try {
    process.env.APP_SECRET && await jwt.verify(token, process.env.APP_SECRET)
    next()

  } catch (error: any) {
    return res.status(401).json({ message: "Token inválido!" });
  }
}

