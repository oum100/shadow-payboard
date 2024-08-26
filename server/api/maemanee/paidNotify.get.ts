import { PrismaClient } from "@prisma/client";
import Debug from 'debug'

const prisma = new PrismaClient();
const debug = Debug('api:cyberpay:painNotify');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)


    return query
})