import { prisma } from "@/lib/db";
import { CreateTrpcContext, CreateTrpcRouter, PublicProcedure } from "..";
import { createMovies } from "@/Form/CreateMovies";



export const MoviesROuter = CreateTrpcRouter({
    movies: PublicProcedure.query(async({ctx}) => {
        return await prisma.movie.findMany({})
    }),
    createMovies: PublicProcedure.input(createMovies).mutation(async({ctx,input}) => {
        return await prisma.movie.create({data: input})
    })
})