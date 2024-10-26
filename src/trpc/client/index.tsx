"use client"
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { AppRouter } from "../server/router";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



export const trpcClient = createTRPCReact<AppRouter>()


export const TRPCClientProvider = (props:{children:React.ReactNode}) => {

    const [queryClient] = useState(() => new QueryClient())

    const [trpc] = useState(() => trpcClient.createClient({
        links:[
            httpBatchLink({
                url: "http://localhost:3000"
            })
        ]
    }))



    return (
        <QueryClientProvider client={queryClient}>
            <trpcClient.Provider client={trpc} queryClient={queryClient}>
                {props.children}
            </trpcClient.Provider>
        </QueryClientProvider>
    )
}