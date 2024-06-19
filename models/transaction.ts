import Joi, { number, string } from 'joi'

export async function validateNewTrans(body:any){
    const schema = Joi.object({
        order: Joi.string().required(),
        deviceUuid: Joi.string().required(),
        amount: Joi.string().required(),
        status: Joi.string().required(),
    }).unknown(true)
    return schema.validate(body)
}

export async function validatePagination(body:any){
    const schema = Joi.object({
        merchantCode: Joi.string().required(),
        branchName:Joi.string(),
        startDate:Joi.string().allow(''),
        endDate:Joi.string().allow(''),
        page:Joi.number().required(),
        rowsPerPage:Joi.number().required(),
        rowsNumber:Joi.number().required(),
        filter:Joi.string()
    }).unknown(true)
    return schema.validate(body)
}