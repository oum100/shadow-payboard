import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import { stringifyQuery } from "vue-router";


const prisma = new PrismaClient();
const debug = Debug('api:device:getAll');

export default defineEventHandler( async(event) => {
    const query = getQuery(event)
    
    if(!query.merchantCode){
        throw createError({
            statusCode:400,
            statusMessage: "merchantCode parameter is required",
            stack:''
        })   
    }

    console.log(query.merchantCode)
    const device = await prisma.devices.findMany({
        where:{
            merchant:{
                merchantCode: query.merchantCode as string
            }
        },
        // where:{
        //     branch:{
        //         branchCode: "105"
        //     } 
        // },
        //Skip and Take for pagination
        // skip:3,
        // take:5,
        
        include:{
            branch:{
                select:{
                    branchName:true,
                    appKey:true,
                    appSecret:true
                }
            }
        }
    })
    return device
})
