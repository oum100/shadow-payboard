import { PrismaClient} from "@prisma/client";
import Debug from 'debug'


const prisma = new PrismaClient();
const debug = Debug('api:transaction:getAll');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)

    // console.log(event.node.req.filter)
    const filter = query.filter
    const sDate = query.startDate
    const eDate = query.endDate

    // console.log("query:",query)
    // console.log("sDate::",sDate)
    // console.log("eDate::",eDate)

    let startTime, endTime
    if(query.startDate && query.endDate){
        const startDate = new Date(String(sDate))
        const endDate = new Date(String(eDate))
        startTime = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),0,0,0)
        endTime = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),23,59,59)
        
        console.log("start: ",startTime)
        console.log("end: ",endTime)
    }

    if(filter === "ALL"){
        const count = await prisma.transactions.aggregate({
            where:{
                AND:[
                    {createdAt: { gte: startTime } },
                    {createdAt: { lte: endTime } },
                ],  
            },
            _count: true,
            _sum:{
                amount : true
            }
        })
        const washerCount = await prisma.transactions.aggregate({
            where:{
                AND:[
                    {createdAt: { gte: startTime } },
                    {createdAt: { lte: endTime } },
                ], 
                device:{
                    type: "Washer"
                }
            },
            _count:true,
            _sum:{
                amount: true
            }

        })
        const dryerCount = await prisma.transactions.aggregate({
            where:{
                AND:[
                    {createdAt: { gte: startTime } },
                    {createdAt: { lte: endTime } },
                ], 
                device:{
                    type: "Dryer"
                }
            },
            _count:true,
            _sum:{
                amount: true
            }
        })


        return {
            totalCount: count,
            washerCount: washerCount,
            dryerCount: dryerCount
        }
    }
    
    // This for count record by branchName
    const count = await prisma.transactions.aggregate({
        where:{
            AND:[
                {createdAt: { gte: startTime } },
                {createdAt: { lte: endTime } },
            ], 
            device:{
                branch:{branchName: String(filter)}
            }
        },
        _count:true,
        _sum:{
            amount: true
        }
    })

    const washerCount = await prisma.transactions.aggregate({
        where:{
            AND:[
                {createdAt: { gte: startTime } },
                {createdAt: { lte: endTime } },
            ], 
            device:{
                branch:{branchName: String(filter)},
                type: "Washer"
            }
        },
        _count:true,
        _sum:{
            amount: true
        }
      
    })
    const dryerCount = await prisma.transactions.aggregate({
        where:{
            AND:[
                {createdAt: { gte: startTime } },
                {createdAt: { lte: endTime } },
            ], 
            device:{
                branch:{branchName: String(filter)},
                type: "Dryer"
            }
        },
        _count:true,
        _sum:{
            amount: true
        }
    })

    return {
        totalCount: count,
        washerCount: washerCount,
        dryerCount: dryerCount
    }
})