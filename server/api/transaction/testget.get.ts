import { PrismaClient} from "@prisma/client";
import Debug from 'debug'


const prisma = new PrismaClient();

const debug = Debug('api:transaction:getAll');


export default defineEventHandler( async(event) => {

    // const result = await prisma.transactions.count({
    //     where:{
    //         device:{
    //             AND:{
    //                 branch:{
    //                     branchCode:'105'
    //                 },
    //                 type:'Washer'
    //             }

    //         }
    //     }
    // })

    //Count all record in transaction
    // const result = await prisma.transactions.count()
    

    const result = await prisma.transactions.findMany({
        distinct:['amount'],
        where:{
            device:{
                type:'Dryer'
            }
        }
    })

    return result

})
