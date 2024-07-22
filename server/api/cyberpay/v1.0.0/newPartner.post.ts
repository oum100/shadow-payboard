import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import {validateNewPartner} from '~/models/cyberpay'


const prisma = new PrismaClient();
const debug = Debug('api:cyberpay:painNotify');

export default defineEventHandler(async(event) => {
    
})