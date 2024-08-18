import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import { validateNewTrans} from "~/models/transaction"
import { customAlphabet } from 'nanoid'

const prisma = new PrismaClient();
const debug = Debug('api:transaction:new');
const alphabet = '0123456789ABCDEF';
const nanoid = customAlphabet(alphabet, 15);

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
    const genOrderId = nanoid(15)

    const trans = await prisma.transactions.create({
        data:{
            order: body.order || genOrderId ,
            deviceUuid: body.deviceUuid,
            amount: body.amount,
            status: body.status,
            paymentBy: body.paymentBy
        }
    })

    return trans

})