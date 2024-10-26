import { CreateTrpcRouter, protectedProcedure, PublicProcedure } from "..";


export const appRouter = CreateTrpcRouter({
    getMessage: protectedProcedure("Admin").query(({ctx}) => {
        
        return { title: "Worst descission of my life ", description: "Joining this college" }
    })
})

export type AppRouter = typeof appRouter