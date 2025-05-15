import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userSignupSchema, createRoomSchema, userLoginSchema } from "@repo/common/types";
import { middleware, AuthRequest } from './middleware';
import { jwtsecret } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
const app = express();
app.use(express.json());

function generateSlug(length = 30): string {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function createRoom(adminId: string, name: string) {
    const slug = generateSlug();

    const existing = await prismaClient.room.findUnique({ where: { slug } });

    if (existing) return createRoom(adminId, name);

    const room = await prismaClient.room.create({
        data: {
            name,
            slug,
            adminId
        }
    });

    return room;
}

app.post("/signup", async (req: Request, res: Response) => {
    const result = userSignupSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ "message": "Wrong input" });
        return;
    }

    const { email, password, name } = result.data;

    try {
        const existingUser = await prismaClient.user.findFirst({ where: { email } });
        if (existingUser) {
            res.status(411).json({ "message": "Account already exists" });
            return;
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await prismaClient.user.create({
            data: {
                email: email,
                password: hashedpassword,
                name: name
            }
        })

        res.status(200).json({ "message": "Registration successful" });
        return;

    } catch (e) {
        res.status(500).json({ "error": "An unknown error occurred" });
        return;
    }

});

app.post("/login", async (req: Request, res: Response) => {

    if (!jwtsecret) {
        res.status(500).json({ "message": "Server error" });
        return;
    }

    const result = userLoginSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ "message": "wrong input" });
        return;
    }

    const { email, password } = result.data;

    const user = await prismaClient.user.findFirst({ where: { email: email } })

    if (!user) {
        res.status(400).json({ "message": "User does not exist, please sign up" });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(400).json({ message: "Wrong password, please try again" });
        return;
    }

    const token = jwt.sign({ "userId": user.id }, jwtsecret);
    res.status(200).json({ "token": token });
})

app.post("/room", middleware, async (req: AuthRequest, res: Response) => {
    const result = createRoomSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ "message": "wrong input" });
        return;
    }

    const { name } = result.data;
    const adminId = req.userId as string;

    const existingRoom = await prismaClient.room.findFirst({
        where: {
            adminId,
            name: name,
        },
    });

    if (existingRoom) {
        res.status(400).json({ "message": "room name already exists" });
        return;
    }

    const room = await createRoom(adminId, name);

    res.json({ "slug": room.slug, "roomId": room.id });
})

app.get('/room/:slug', async (req: AuthRequest, res: Response) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug: slug
        }
    })

    if (!room) {
        res.status(400).json({ "message": "room doesnt exist" });
        return;
    }

    res.status(200).json({ "roomId": room.id });
    return;
})

app.get("/chats/:roomId", async (req: AuthRequest, res: Response) => {
    const roomId = Number(req.params.roomId);

    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })

    res.json({ messages });
    return;
});

app.listen(3001);