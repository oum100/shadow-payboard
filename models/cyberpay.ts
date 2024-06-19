import Joi from "joi"

export async function validateNewCyberpay(body:any){
    const schema = Joi.object({
        transaction_id: Joi.string().required(),
    }).unknown(true)
    return schema.validate(body)
}