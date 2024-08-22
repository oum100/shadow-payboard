import { PrismaClient} from "@prisma/client";
import Debug from 'debug'
import { date } from 'quasar'
import moment from 'moment-timezone';

const prisma = new PrismaClient();
const debug = Debug('api:transaction:getAll');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)

    // console.log(event.node.req.filter)
    const filter = query.filter
    const sDate = query.startDate
    const eDate = query.endDate

    // console.log("query:",query)
    console.log("-------RecordsCount-------")
    console.log("->sDate::",sDate)
    console.log("->eDate::",eDate)

    

    let startDate, endDate
    if(query.startDate && query.endDate){
        // startDate = new Date(String(sDate)).getTime() //ISO Format
        // endDate = new Date(String(eDate)).getTime()

        // console.log("->starDate: ",startDate)
        // console.log("->endDate: ",endDate)

        // startDate = new Date(startDate) //Make it to UTC
        // endDate = new Date(endDate)
 
        // console.log("->starDate-UTC: ",startDate)
        // console.log("->endDate-UTC: ",endDate)

        // startDate = startDate.toISOString()
        // endDate = endDate.toISOString()

        startDate = moment.tz(String(sDate),'Asia/Bangkok').toISOString()
        endDate = moment.tz(String(eDate),'Asia/Bangkok').toISOString()


        // console.log("->starDate-UTC: ",startDate)
        // console.log("->endDate-UTC: ",endDate)

        // startDate = startDate.toISOString()
        // endDate = endDate.toISOString()
        console.log("->starDate->ISO: ",startDate)
        console.log("->endDate->ISO: ",endDate)
    }

    if(filter === "ALL"){
        const count = await prisma.transactions.aggregate({
            where:{ 
                createdAt:{
                    gte: startDate,
                    lt: endDate
                }
            },
            _count: true,
            _sum:{
                amount : true
            }
        })
        const washerCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
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
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
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
    }else{
        // This for count record by branchName
        const count = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
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
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
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
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
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
    }
})