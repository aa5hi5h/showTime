import { CreateTrpcRouter, PublicProcedure } from "..";


export const appRouter = CreateTrpcRouter({
    getMessage: PublicProcedure.query(({}) => {
        
        return { title: "Worst descission of my life ", description: "Joining this college" }
    })
})

export type AppRouter = typeof appRouter