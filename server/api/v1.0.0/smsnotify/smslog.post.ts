
import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import {validateNewPartner} from '~/models/cyberpay'


const prisma = new PrismaClient();
const debug = Debug('api:smsnotify:smslog');

export default defineEventHandler( async(event)=>{
    const body = await readBody(event)

    console.log(body)
    const res = {
        status:true,
        message:'success',
        data:{
            // transaction_id:body.transaction_id
            msg:"ok"
        }
    }

    return res
} )