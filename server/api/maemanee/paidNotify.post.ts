import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
// import {validateNewCyberpay} from '~/models/cyberpay'

const prisma = new PrismaClient();
const debug = Debug('api:cyberpay:painNotify');

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }
    console.log("Body: ",body)

    // const {error} = await validateNewCyberpay(body)
    // if(error){
    //     throw createError({
    //         statusCode:400,
    //         statusMessage: error.details[0].message,
    //         stack:''
    //     })   
    // }

    return body
})