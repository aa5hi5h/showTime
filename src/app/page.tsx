"use client"

import { trpcClient } from "@/trpc/client";
import { UserButton } from "@clerk/nextjs";



export default function Home() {

  const {data, isLoading} = trpcClient.getMessage.useQuery()

  if(isLoading){
    return <div>Loading....</div>
  }

  
  return (
    <div className="flex flex-col justify-between items-center p-10">
      is the content below bisivle ????
      <UserButton />
      <div className="text-7xl font-extrabold tracking-tighter ">{data?.title}</div>
            <div className="text-4xl font-semibold">{data?.description}</div>
    </div>
  );
}
