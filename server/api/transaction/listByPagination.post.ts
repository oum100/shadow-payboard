import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import { sassTrue } from "sass";
import { validatePagination} from "~/models/transaction";

const prisma = new PrismaClient();
const debug = Debug('api:transaction:listByPagination');

export default defineEventHandler( async(event) => {
    const body = await readBody(event)

    const {error} = await validatePagination(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }



    let startDate, endDate
    if(body.startDate && body.endDate){
        startDate = new Date(body.startDate).toISOString()
        endDate = new Date(body.endDate).toISOString()
        
        console.log("ListByPage->start: ",startDate)
        console.log("ListByPage->end: ",endDate)

        // startTime = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),0,0,0)
        // endTime = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),23,59,59)
        
        // // console.log("ListByPage->start: ",startTime)
        // // console.log("ListByPage->end: ",endTime)
        // startTime = startTime.toISOString()
        // endTime = endTime.toISOString()
    }



    // Calculate skip
    const requestPage = body.page
    const rowsPerPage = body.rowsPerPage != null? parseInt(body.rowsPerPage):20

    const skip = requestPage 
    const take = rowsPerPage
    
    if(body.branchName === 'ALL'){
        // console.log(body.branchName)
        const trans = await prisma.transactions.findMany({
            skip:skip,
            take:take,
            orderBy:{
                createdAt: "desc"
            },
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                },  
                device:{
                    AND:[
                        {merchant:{merchantCode: body.merchantCode}}
                    ]
    
                }
            },
            select:{
                order:true,
                deviceUuid:true,
                amount:true,
                status:true,
                jobState:true,
                paymentBy:true,
                createdAt:true,
                updatedAt:true,
                device:{
                    select:{
                        deviceName:true,
                        type:true,
                        merchantCode:true,
                        branch:{
                            select:{
                                branchCode: true,
                                branchName:true
                            } 
                        }
                    },
                       
                }
            }
        })
        // console.log("Total rows: ",trans.length)
        return trans
    }else{
        const trans = await prisma.transactions.findMany({
            skip:skip,
            take:take,
            orderBy:{
                createdAt: "desc"
            },
            where:{
                createdAt:{
                    gte: startDate,
                    lt: endDate
                }, 
                device:{
                    AND:[
                        {merchant:{merchantCode: body.merchantCode}},
                        {branch:{branchName: String(body.branchName)}}
                    ]
    
                }
                
            },
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
                        merchantCode:true,
                        branch:{
                            select:{
                                branchCode: true,
                                branchName:true
                            } 
                        }
                    },
                       
                }
            }
        })
        // console.log("Total rows: ",trans.length)
        return trans
    }
})