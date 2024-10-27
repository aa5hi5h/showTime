"use client"
import { UserButton } from "@clerk/nextjs"
import { ChartNoAxesColumn, ChartNoAxesGantt, Lock, Menu, UserRound} from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Label } from "./ui/label"



const Navbar = () => {

    return (
        <div className="flex justify-between items-center p-4">
            <div className="text-3xl font-semibold tracking-tight">ShowTime</div>
            <div className="flex gap-4">
                <UserButton />
                <Sheet>
                    <SheetTrigger asChild><Menu size={28} /></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Select one of the below options continue</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col pt-4 gap-4">
                            <div className="flex gap-4 items-center cursor-pointer">
                            <UserRound />
                            <span className="text-2xl font-semibold">User</span>
                            </div>
                            <div className="flex gap-4 items-center cursor-pointer">
                                <Lock />
                                <span className="text-2xl font-semibold">Admin</span>
                            </div>
                            <div className="flex gap-4 items-center cursor-pointer">
                                <ChartNoAxesGantt />
                                <span className="text-2xl font-semibold">Manager</span>
                            </div>
                        </div>
                        
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default Navbar