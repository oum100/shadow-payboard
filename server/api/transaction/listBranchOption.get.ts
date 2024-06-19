import { PrismaClient } from "@prisma/client";
import Debug from 'debug'


const prisma = new PrismaClient();
const debug = Debug('api:transaction:listByMerchant');

export default defineEventHandler(async(event) => {
    const branchList = await prisma.branchs.findMany({
        where:{},
        distinct: ['branchName'],
        select: {
            branchCode: true,
            branchName: true
   
        },
    })

    return branchList
})