import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {

        const title: string = req.body.title


        //Check title
        if (title.length > 300) {
            return res.status(403).json({ message: "Please write a shorter group name" })
        }

        if (!title.length) {
            return res
                .status(403)
                .json({ message: "Please write something before we can post it." })
        }

        //Create Post
        try {
            const result = await prisma.group.create({
                data: {
                    name: title,
                },
            })
            console.log(result);
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: err.message })
        }
    }
}