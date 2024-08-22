import { PrismaClient} from "@prisma/client";
import Debug from 'debug'
import moment from 'moment-timezone'

const prisma = new PrismaClient();
const debug = Debug('api:transaction:paymentType');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)

    // console.log(event.node.req.filter)
    const filter = query.filter
    const sDate = query.startDate
    const eDate = query.endDate

    // console.log("query:",query)
    console.log("-------paymentRevenue-------")
    console.log("->sDate::",sDate)
    console.log("->eDate::",eDate)

    //Preparing information for filtering startdate and enddate
    let startDate, endDate
    if(query.startDate && query.endDate){
        startDate = moment.tz(String(sDate),'Asia/Bangkok').toISOString()
        endDate = moment.tz(String(eDate),'Asia/Bangkok').toISOString()

        console.log("->starDate->ISO: ",startDate)
        console.log("->endDate->ISO: ",endDate)
    }

    if(filter === "ALL"){
        const qrResult = await prisma.transactions.aggregate({
            where:{ 
                paymentBy:"qrcode",
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

        const cashResult = await prisma.transactions.aggregate({
            where:{ 
                paymentBy:"cash",
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
        
        if(!qrResult._sum.amount){qrResult._sum.amount=0}
        if(!cashResult._sum.amount){cashResult._sum.amount=0}

        return {
            qrResult: qrResult,
            cashResult: cashResult
        }
    }else{
        const qrResult = await prisma.transactions.aggregate({
            where:{ 
                paymentBy:"qrcode",
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)}
                }
            },
            _count: true,
            _sum:{
                amount : true
            }
        })

        const cashResult = await prisma.transactions.aggregate({
            where:{ 
                paymentBy:"cash",
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)}
                }
            },
            _count: true,
            _sum:{
                amount : true
            }
        })

        if(!qrResult._sum.amount){qrResult._sum.amount=0}
        if(!cashResult._sum.amount){cashResult._sum.amount=0}

        return {
            qrResult: qrResult,
            cashResult: cashResult
        }
    }



    // return {
    //     totalCount: count,
    //     washerCount: washerCount,
    //     dryerCount: dryerCount
    // }




})