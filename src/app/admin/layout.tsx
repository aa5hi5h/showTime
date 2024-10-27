'use client'
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { trpcClient } from "@/trpc/client";
import { useSession } from "@clerk/nextjs";
import { Clipboard } from "lucide-react";
import React from "react";
import AdminSidebar from "./_components/Sidebar";
import MobileviewAdminSidebar from "./_components/mobileSidebar";


export default function Layout({children}:{children:React.ReactNode}){

    const adminMe = trpcClient.admin.adminme.useQuery()

    const session = useSession()
    const { toast } = useToast()

    const userId = session.session?.user.id

    if(!userId){
        return <div>You are not loged in...</div>
    }

    const handleCopyClick = async() => {
        try{
            await navigator.clipboard.writeText(userId)
            toast({title: "UserId Copied"})
        }catch(error){
            console.log("ERROR")
        }
    }

    if(!adminMe.data?.id){
        return (
            <div className="max-w-sm mx-auto">
                <div>
                    Hey , we hate to break it to you 
                    <span> You are not listed as Admin in our server</span>
                </div>
                <div>
                    YOu need to contact to our admin and hand them your uniqueID , if you want to get
                    this access.
                </div>
                <span>
                    {userId}
                </span>
                <Button onClick ={handleCopyClick}>
                    <Clipboard  />
                </Button>
            </div>
        )
    }else{
        return (
            <div className="grid grid-cols-5">
                <div className="col-span-1 hidden sm:flex">
                    <AdminSidebar />
                </div>
                <div className="col-span-1 flex sm:hidden">
                    <MobileviewAdminSidebar />
                </div>
                <div className="col-span-4">
                    {children}
                </div>
            </div>
        )
    }
}