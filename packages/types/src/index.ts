import { z } from 'zod';

export const UserInput = z.object({
    email:z.string().email(),
    firstname:z.string(),
    lastname:z.string()
})

export type UserInputParams = z.infer<typeof UserInput>