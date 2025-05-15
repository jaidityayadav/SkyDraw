import { z } from "zod";

export const userSignupSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string()
})

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const createRoomSchema = z.object({
    name: z.string()
})