import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import { useFetch } from "nuxt/app";
import {validateCyberpayPayment} from '~/models/cyberpay'


const prisma = new PrismaClient();
const debug = Debug('api:cyberpay:painNotify');

export default defineEventHandler(async(event) =>{
    
    const headerPartnerId = event.node.req.headers.partnerid
    const headerSecretKey = event.node.req.headers.secretkey

    // console.log(headerPartnerId)
    // console.log(headerSecretKey)

    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }
    // console.log("Body: ",body)

    const {error} = await validateCyberpayPayment(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }    

    const cyberpay_URL = useRuntimeConfig().CYBERPAY_URL

    const cyberpay:any = await $fetch(cyberpay_URL,{
        method: 'POST',
        headers: {
            PartnerId: headerPartnerId as string,
            SecretKey: headerSecretKey as string
        },
        body:{
            payment_channel_id: body.payment_channel_id,
            ref_1: body.ref_1,
            amount: body.amount
        }
    })


    console.log("Cyberpay:",cyberpay)

    const resultData = await prisma.cyberpayPaymentRequest.create({
        data:{
            partner_id: headerPartnerId as string,
            payment_channel_id: body.payment_channel_id,
            ref_1: body.ref_1,
            ref_2: cyberpay.data.ref_2,
            ref_3: cyberpay.data.ref_3,
            qrText: cyberpay.data.qr_text,
            qrImage: cyberpay.data.qr_image,
            amount: body.amount,
        }
    })

    return{
        statusCode:200,
        statusMessage:'success',
        data:resultData
    }

    return cyberpay

})