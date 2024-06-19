import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import { validateNewTrans} from "~/models/transaction"


const prisma = new PrismaClient();
const debug = Debug('api:transaction:new');

export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    const {error} = await validateNewTrans(body)
    if(error) {
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    const trans = await prisma.transactions.create({
        data:{
            order: body.order,
            deviceUuid: body.deviceUuid,
            amount: body.amount,
            status: body.status
        }
    })

    return trans

})