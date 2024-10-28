import { CreateTrpcRouter, protectedProcedure, PublicProcedure } from "..";
import { AdminRouter } from "./admin";
import { CinemaRouter } from "./cinema";
import { MoviesROuter } from "./movies";


export const appRouter = CreateTrpcRouter({
    admin: AdminRouter,
    movies: MoviesROuter,
    cinemas: CinemaRouter
})

export type AppRouter = typeof appRouter