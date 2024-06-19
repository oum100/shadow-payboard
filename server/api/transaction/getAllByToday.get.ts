import { PrismaClient} from "@prisma/client";
import Debug from 'debug'


const prisma = new PrismaClient();

const debug = Debug('api:transaction:getAll');
var days = 0; // Days you want to subtract   
// var days = 0.291666666666667
const tNow = new Date();
const endYear = tNow.getFullYear()
const endMonth = tNow.getMonth()
const endDate = tNow.getDate()

// Method 1 : working
const endTime = new Date(endYear,endMonth,endDate,23,59,59)
const startTime = new Date(endYear,endMonth,endDate - days,0,0,0)

// Method 2
// const endTime = tNow.setHours(23,59,59)




// var startTime = new Date();
// var startTime = new Date(endTime.getTime() - (days * 24 * 60 * 60 * 1000));  // For one day hour set to 7




export default defineEventHandler( async(event) => {
    // console.log("StartTime: ",startTime.toLocaleString());
    // console.log("EndTine: ",endTime.toLocaleString());

    const trans = await prisma.transactions.findMany({
        orderBy:{
            createdAt: "desc"
        },

        where: {
            AND:[
                {createdAt: { gte: startTime } },
                {createdAt: { lte: endTime } },
                // {device:{branchCode: "105"}}
            ]  
        },

        // where:{
        //     AND: [
        //         { createdAt: { lte: new Date() }},
        //         { createdAt: { gte: new Date('2024-12-1 00:00:00') }},
        //         // { createdAt: { gte: new Date( new Date().getTime() - (1 * 23 * 59 * 59 * 1000 ) ) }}
        //     ]
        // },

        // where:{
        //     AND: [
        //         { createdAt: { lte: new Date('2024-12-1 23:59:59') }},
        //         { createdAt: { gte: new Date('2023-12-31 00:00:00') }},
        //     ]
        // },


        // where:{
        //     device:{
        //         branchCode: "106"
        //     }
        // },
        // skip:29,
        // take:1,
        select:{
            order:true,
            deviceUuid:true,
            amount:true,
            status:true,
            jobState:true,
            createdAt:true,
            updatedAt:true,
            device:{
                select:{
                    deviceName:true,
                    type:true,
                    branch:{
                        select:{
                            branchCode: true,
                            branchName:true
                        } 
                    }
                },
                   
            }
        }
    }).catch(async(e) =>{
        await prisma.$disconnect()
        process.exit(1)
    })

    // const count = trans.length

    // const page = 1
    // const PAGESIZE = 5
    // const data = trans.slice((page-1)*PAGESIZE, page*PAGESIZE)

    return trans
    
    

    // const trans = await prisma.$transaction.length

    // return trans
})
