import { CreateTrpcContext } from "@/trpc/server";
import { appRouter } from "@/trpc/server/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";



const CreateCOntext = (req: NextRequest) => {
    return CreateTrpcContext({
        header: req.headers
    })
}

const handler = (req: NextRequest) => {
    return (
        fetchRequestHandler({
            endpoint: "/api/trpc",
            router: appRouter,
            req: req,
            createContext: () => CreateCOntext(req)
        })
    )
}

export {handler as GET, handler as POST}