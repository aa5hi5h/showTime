"use client"
import { usePathname, useRouter } from "next/navigation"
import AdminPage from "../page"


const AdminSidebar = () => {

    const pathname = usePathname()
    const router = useRouter()

    const dashboardPage = pathname.endsWith("admin")

    const cinemaPage = pathname.endsWith("cinema")
    const moviesPage = pathname.endsWith("movies")
    const managerPage = pathname.endsWith("manager")
    const manageAdminPage = pathname.endsWith("admin")

    return (
        <div className="flex p-2 border-r-2 border-black mr-[2rem]">
            <ul className="flex flex-col space-y-2">
                <li onClick={() => router.push("/admin")} className={`text-2xl font-semibold hover:cursor-pointer ${ dashboardPage ? "text-red-600": "text-black"}`}>Dashboard</li>
                <li className="text-xl flex flex-col font-semibold p-2">
                    <span onClick={() => router.push("/admin/cinema")} className={`hover:text-red-600 hover:cursor-pointer ${ cinemaPage ? "text-red-600": "text-black"}`}>Cinemas</span>
                    <span onClick={() => router.push("/admin/cinema/new")} className={`pl-4 pt-2 hover:text-red-600 hover:cursor-pointer ${ cinemaPage ? "text-red-600": "text-black"}`}>Create Cinema</span>
                </li>
                <li className="text-xl flex flex-col font-semibold p-2">
                    <span onClick={() => router.push("/admin/movies")} className={`hover:text-red-600 hover:cursor-pointer ${ moviesPage ? "text-red-600": "text-black"}`}>Movies</span>
                    <span onClick={() => router.push("/admin/movies/new")} className={`pl-4 hover:text-red-600 hover:cursor-pointer pt-2 ${ moviesPage ? "text-red-600": "text-black"}`}>Create movies</span>
                </li>
                <li onClick={() => router.push("/admin/manage/admin")} className={`text-xl hover:text-red-600 hover:cursor-pointer font-semibold p-2 ${ manageAdminPage ? "text-red-600": "text-black"}`}>Manage Admins</li>
                <li onClick={() => router.push("/admin/manage/manager")} className={`text-xl hover:text-red-600 hover:cursor-pointer font-semibold p-2 ${ managerPage ? "text-red-600": "text-black"}`}>Manage Managers</li>
            </ul>
        </div>
    )
}


export default AdminSidebar