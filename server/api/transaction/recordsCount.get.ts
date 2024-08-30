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
        startDate = moment.tz(String(sDate),'Asia/Bangkok').toISOString()
        endDate = moment.tz(String(eDate),'Asia/Bangkok').toISOString()

        console.log("->starDate->ISO: ",startDate)
        console.log("->endDate->ISO: ",endDate)
    }

    

    if(filter === "ALL"){
        const totalCount = await prisma.transactions.aggregate({
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

        const totalCountQR = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                paymentBy:"qrcode"
            },
            _count:true,
            _sum:{
                amount: true
            }     
        })
        const totalCountCash = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                paymentBy:"cash"
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

        const washerQRCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    type: "Washer"
                },
                paymentBy:"qrcode"
            },
            _count:true,
            _sum:{
                amount: true
            }       
        })

        const washerCashCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    type: "Washer"
                },
                paymentBy:"cash"
            },
            _count:true,
            _sum:{
                amount: true
            }       
        })

        const dryerQRCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    type: "Dryer"
                },
                paymentBy:"qrcode"
            },
            _count:true,
            _sum:{
                amount: true
            }       
        })

        const DryerCashCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    type: "Dryer"
                },
                paymentBy:"cash"
            },
            _count:true,
            _sum:{
                amount: true
            }       
        })        

        return {
            totalCount: {
                countAll: totalCount,
                countQR: totalCountQR,
                countCash: totalCountCash,
            },
            washer:{
                countAll: washerCount,
                countQR: washerQRCount,
                countCash: washerCashCount
            },    
            dryer:{
                countAll: dryerCount,
                countQR:  dryerQRCount,
                countCash: DryerCashCount
            }    
        }
    }else{
        // This for count record by branchName
        const totalCount = await prisma.transactions.aggregate({
            where:{ 
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)},
                },
            },
            _count: true,
            _sum:{
                amount : true
            }
        })

        const totalCountQR = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)},
                },
                paymentBy:"qrcode"
            },
            _count:true,
            _sum:{
                amount: true
            }     
        })
        const totalCountCash = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)},
                },
                paymentBy:"cash"
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

        const washerQRCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)},
                    type: "Washer"
                },
                paymentBy:"qrcode"
            },
            _count:true,
            _sum:{
                amount: true
            }       
        })

        const washerCashCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)},
                    type: "Washer"
                },
                paymentBy:"cash"
            },
            _count:true,
            _sum:{
                amount: true
            }       
        })

        const dryerQRCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)},
                    type: "Dryer"
                },
                paymentBy:"qrcode"
            },
            _count:true,
            _sum:{
                amount: true
            }       
        })

        const DryerCashCount = await prisma.transactions.aggregate({
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },
                device:{
                    branch:{branchName: String(filter)},
                    type: "Dryer"
                },
                paymentBy:"cash"
            },
            _count:true,
            _sum:{
                amount: true
            }       
        })        

        return {
            totalCount: {
                countAll: totalCount,
                countQR: totalCountQR,
                countCash: totalCountCash,
            },
            washer:{
                countAll: washerCount,
                countQR: washerQRCount,
                countCash: washerCashCount
            },    
            dryer:{
                countAll: dryerCount,
                countQR:  dryerQRCount,
                countCash: DryerCashCount
            }    
        }
    }
})