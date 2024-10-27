import { CreateTrpcRouter, protectedProcedure, PublicProcedure } from "..";
import { AdminRouter } from "./admin";


export const appRouter = CreateTrpcRouter({
    admin: AdminRouter
})

export type AppRouter = typeof appRouter