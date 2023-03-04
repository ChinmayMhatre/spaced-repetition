import prisma from "../../../prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {


        //Create Post
        try {
            const result = await prisma.word.create({
                data:{
                    word:req.body.word,
                    audio:req.body.audio,
                    definitions: req.body.definitions,
                    groupId: req.body.groupId
                }
        })
            console.log(result);
            res.status(200).json(result)
        } catch (err) {
            res.status(403).json({ err: err.message })
        }
    }
}