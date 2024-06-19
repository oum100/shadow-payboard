import { PrismaClient} from "@prisma/client";
import Debug from 'debug'



const prisma = new PrismaClient();
const debug = Debug('api:asset:recordsCount');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)

    const count = await prisma.devices.count({})
    // console.log('Count: ',count)
    return {
        totalCount: count,
    }
    
})