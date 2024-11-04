import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import { validateNewDevice } from "~/models/device"

const prisma = new PrismaClient();
const debug = Debug('api:device:new');

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)

    const {error} = await validateNewDevice(body)
    if(error) {
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    const duplicate = await prisma.devices.findFirst({
        where:{macAddr: body.macAddr}
    })

    if(duplicate){
        throw createError({
            statusCode:400,
            statusMessage: "Duplicated branchCode.",
            stack:''
        })  
    }

    const device = await prisma.devices.create({
        data: body
    })
    .catch((err) => {
        debug("error: ",err)
        throw(err.data)
    })

    return device

})