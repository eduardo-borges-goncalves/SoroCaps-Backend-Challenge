import { UserModel } from "../models/user"

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userLogin, password } = req.body;
        const user = await UserModel.findOne({
            where: { userLogin }
        })

        if (await bcript.compare(user.password, password)) {
            const token = jwt.sign(
                { id: user.id },
                process.env.APP_SECRET,
                { expiresIn: "1d" }
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