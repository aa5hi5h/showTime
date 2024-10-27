import { prisma } from "@/lib/db";
import { Role } from "@/utilis/type";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { Authorizeuser } from "./utils";
import { use } from "react";


export const CreateTrpcContext = async(opts: {header: Headers})  => {

    const session = auth()
    
    return {
        db: prisma,
        session,
        ...opts
    }
}

const t = initTRPC.context<typeof CreateTrpcContext>().create()


export const CreateTrpcRouter = t.router
export const PublicProcedure = t.procedure

export const protectedProcedure = (...role: Role[]) => PublicProcedure.use(async({ctx,next}) => {

    const userId = (await ctx.session).userId

    if(!ctx.session || !userId){
         throw new TRPCError({code: "UNAUTHORIZED"})
    }

    await Authorizeuser(userId,role)

    return next({
        ctx: {...ctx, userId}
    })
})