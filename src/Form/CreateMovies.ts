import { GENERE } from "@prisma/client"
import z from "zod"

export const createMovies = z.object({
    name: z.string().min(1,{
        message: "Movie Name must be grater than 1"
    }),
    director: z.string(),
    duration: z.number(),
    poster: z.string(),
    releaseDate: z.string(),
    Genere: z.nativeEnum(GENERE)
})

export type CreateMoviesForm = z.infer<typeof createMovies>