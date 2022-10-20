import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken"


const verifyToken = (req: NextApiRequest, res: NextApiResponse, next: any) => {

    const token = req.body.header("authorization");

    if (!token) return res.status(400).send("Access Denied");

    const secret = <Secret>process.env["JWT_TOKEN_SECRET"]

    const payload = jwt.verify(token, secret);

    res.send(payload);

    console.log('rodou aqui o verify');

    next();
};

export default verifyToken;