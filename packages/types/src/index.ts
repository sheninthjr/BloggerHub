import { z } from 'zod';

export const UserInput = z.object({
    email:z.string().email(),
    name:z.string(),
    image:z.string()
})

export type UserInputParams = z.infer<typeof UserInput>
