import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { initTRPC } from "@trpc/server";


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