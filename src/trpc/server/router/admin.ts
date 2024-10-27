import { CreateTrpcRouter, protectedProcedure } from "..";


export const AdminRouter = CreateTrpcRouter({
    admins: protectedProcedure("Admin").query(({ctx}) => {
        return ctx.db.admin.findMany()
    }),
    adminme: protectedProcedure().query(({ctx}) => {
        return ctx.db.admin.findUnique({where:{adminId: ctx.userId}})
    })

})