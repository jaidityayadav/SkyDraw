import express, { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { userSignupSchema } from "@repo/common"
import { middleware, AuthRequest } from './middleware';
import { jwtsecret } from "@repo/backend-common";
const app = express();
app.use(express.json());

app.post("/signup", ((req: Request, res: Response) => {

}) as RequestHandler);

app.post("/login", (req: Request, res: Response) => {
    const result = userSignupSchema.safeParse(req.body);

    if(!jwtsecret){
        res.status(500).json({"message":"Error retrieving from server"});
        return;
    }

    if (result.success) {
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