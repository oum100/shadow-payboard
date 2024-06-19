import { PrismaClient } from "@prisma/client";
import Debug from 'debug'


const prisma = new PrismaClient();
const debug = Debug('api:branch:listBranch');

export default defineEventHandler( async(event) => {
    const trans = await prisma.branchs.findMany({
        select:{
            branchCode:true,
            branchName:true
        }
    })
    // return {
    //     ...trans
    // }
    return trans 
})