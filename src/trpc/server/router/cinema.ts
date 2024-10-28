import { prisma } from "@/lib/db";
import { CreateTrpcRouter, PublicProcedure } from "..";
import { CreateCinemaSchema } from "@/Form/CreateCinema";



export const CinemaRouter = CreateTrpcRouter({
    getCinemas: PublicProcedure.query(async({ctx}) => {
        return await prisma.cinema.findMany({ include: {"Screens": {include:{"showTime" : {include: {"Movie" : true }}}}}})
    }),
    createCinema: PublicProcedure.input(CreateCinemaSchema).mutation(async({ctx,input}) => {
        return ctx.db.cinema.create({data:{
            name: input.name,
            address: {
                create:{
                    address: input.address
                }
            }
        }})
    })
})

