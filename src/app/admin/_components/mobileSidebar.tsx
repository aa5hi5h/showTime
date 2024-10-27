import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"


const MobileviewAdminSidebar = () => {

    return (
        <Sheet>
            <SheetTrigger className="p-4"><Menu /></SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <SheetTitle>Dashboard</SheetTitle>
                </SheetHeader>
                <div className="p-2">
                <ul className="flex flex-col space-y-2">
                <li className="text-xl flex flex-col font-semibold p-2">
                    <span>Cinemas</span>
                    <span className="pl-4 pt-2">Create Cinema</span>
                </li>
                <li className="text-xl flex flex-col font-semibold p-2">
                    <span>Movies</span>
                    <span className="pl-4 pt-2">Create movies</span>
                </li>
                <li className="text-xl font-semibold p-2">Manage Admins</li>
                <li className="text-xl font-semibold p-2">Manage Managers</li>
            </ul>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileviewAdminSidebar