import express, {Request, RequestHandler, Response} from "express";
import { Jwt } from "jsonwebtoken";
import { userSignupSchema } from "@repo/validators"

const app = express();

app.use(express.json());

app.post("/signup", ((req: Request, res: Response) => {
    const result = userSignupSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Invalid input" });
    }

    // Proceed with valid data
    res.json({ message: "success" });

})as RequestHandler);

app.post("/login", (req:Request, res:Response) => {

})

app.post("/room", (req:Request, res:Response) => {

})


app.listen(3001);