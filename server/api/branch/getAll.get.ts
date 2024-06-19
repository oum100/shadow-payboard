import { PrismaClient } from "@prisma/client";
import Debug from 'debug'


const prisma = new PrismaClient();
const debug = Debug('api:branch:getAll');

export default defineEventHandler( async(event) => {
    const trans = await prisma.branchs.findMany({
        include:{
            device:true
        }
    })
    return trans
})
