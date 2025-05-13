import express, { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { userSignupSchema } from "@repo/validators"
import { middleware, AuthRequest } from './middleware';
import { jwtsecret } from "@repo/backend-common";
const app = express();
app.use(express.json());

console.log(jwtsecret);

app.post("/signup", ((req: Request, res: Response) => {

}) as RequestHandler);

app.post("/login", (req: Request, res: Response) => {
    const result = userSignupSchema.safeParse(req.body);

    if (result.success && jwtsecret) {
        const token = jwt.sign({ "userId": "1" }, jwtsecret);
        res.status(500).json({ "token": token })
    } else {
        res.status(400).json({ "message": "wrong input" })
    }
})

app.post("/room", middleware, (req: AuthRequest, res: Response) => {

    res.json({ "roomId": 123 })
})


app.listen(3001);