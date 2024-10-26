import { prisma } from "@/lib/db";
import { Role } from "@/utilis/type";
import { TRPCError } from "@trpc/server";


export const getUserRole = async(id: string) => {

    const[adminExist,managerExist] = await Promise.all([
        await prisma.admin.findUnique({where:{userId: id}}),
        await prisma.manger.findUnique({where:{userId: id}})
    ])

    const roles: Role[] = []

    if(adminExist) roles.push("Admin")
    if(managerExist) roles.push("manager")

    return roles

}

export const  Authorizeuser = async(
    uid: string,
    role: Role[]
) => {

    if(!role || role.length === 0){
       return null
    }

    const userRole = await getUserRole(uid)

    if(!userRole.some((UserRole) => role.includes(UserRole))){
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "You are not authorized to acces this page."            
        })
    }


}