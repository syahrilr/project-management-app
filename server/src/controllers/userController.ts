import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findMany()
        res.json(user)
    } catch (error: any) {
        res.status(500).json({ message: `An error occurred while fetching users ${error.message}` })
    }
}