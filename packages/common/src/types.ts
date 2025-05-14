import { z } from "zod";

export const userSignupSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
    name: z.string()
})

export const userLoginSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
})

export const createRoomSchema = z.object({
    name: z.string()
})