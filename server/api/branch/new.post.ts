import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import { validateNewBranch } from "~/models/branch"

const prisma = new PrismaClient();
const debug = Debug('api:branch:new');

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)

    const {error} = await validateNewBranch(body)
    if(error) {
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    const duplicate = await prisma.branchs.findUnique({
        where:{branchCode:body.branchCode}
    })

    if(duplicate){
        throw createError({
            statusCode:400,
            statusMessage: "Duplicated branchCode.",
            stack:''
        })  
    }

    const branch = await prisma.branchs.create({
        data:{
            branchCode: body.branchCode,
            branchName: body.branchName,
            appKey: null,
            appSecret: null
        }
    })
    .catch((err) => {
        debug("error: ",err)
        throw(err.data)
    })

    return branch
})