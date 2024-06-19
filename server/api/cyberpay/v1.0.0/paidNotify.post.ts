import {validateNewCyberpay} from '~/models/cyberpay'

export default defineEventHandler(async(event) =>{

    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }
    console.log("Body: ",body)

    const {error} = await validateNewCyberpay(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    const res = {
        status:true,
        message:'success',
        data:{
            transaction_id:body.transaction_id
        }
    }

    return res

})