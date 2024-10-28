
import { ProjectionType, SoundSystem } from "@prisma/client";
import { z } from "zod";


export const SchemaCreateAddress = z.object({
    lng: z.number(),
    lat: z.number(),
    adress: z.string()
})

export const ScehemaCreateSceen = z.object({
    ProjectionType: z.nativeEnum(ProjectionType),
    SoundSystem: z.nativeEnum(SoundSystem),
    row: z.number(),
    coloumn: z.number(),
    price: z.number()
})

export const CreateCinemaSchema = z.object({
    name: z.string(),
    address: SchemaCreateAddress,
    screen: z.array(ScehemaCreateSceen)

})

export type CreateCinemaForm = z.infer<typeof CreateCinemaSchema>