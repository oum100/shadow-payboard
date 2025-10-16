import Joi from 'joi'
// const {$joi} = useNuxtApp()

export async function validateNewBranch(body:any){
    const schema = Joi.object({
        branchCode: Joi.string().required(),
        branchName: Joi.string().required(),
        appKey: Joi.string(),
        appSecret: Joi.string(),
    }).unknown(true)
    return schema.validate(body)
}