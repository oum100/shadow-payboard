import { PrismaClient} from "@prisma/client";
import Debug from 'debug'
import { date } from 'quasar'

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
        startDate = new Date(String(sDate)).getTime() //ISO Format
        endDate = new Date(String(eDate)).getTime()

        console.log("->starDate: ",startDate)
        console.log("->endDate: ",endDate)

        startDate = new Date(startDate)
        endDate = new Date(endDate)
        // startDate = new Date(Date.UTC(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),0,0,0))
        // endDate = new Date(Date.UTC(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),23,59,59))

        console.log("->starDate-UTC: ",startDate)
        console.log("->endDate-UTC: ",endDate)

        startDate = startDate.toISOString()
        endDate = endDate.toISOString()

        // startDate = date.formatDate(startDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        // endDate = date.formatDate(endDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')

        console.log("->starDate-ISO: ",startDate)
        console.log("->endDate-ISO: ",endDate)

        // startDate = new Date(
        //     startDate.getFullYear(),
        //     startDate.getMonth(),
        //     startDate.getDate(),
        //     startDate.getHours(),
        //     startDate.getMinutes(),
        // )

        // console.log("RecordsCount->starDate->2: ",startDate)
        // console.log("RecordsCount->endDate->2: ",endDate)

        // startTime = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),0,0,0)
        // endTime = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),23,59,59)

        // startTime = startTime.toISOString()
        // endTime = endTime.toISOString()
        
        // console.log("RecordsCount->starTimet: ",startTime)
        // console.log("RecordsCount->endTime: ",endTime)
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