import Joi from "joi"

export async function validateNewPartner(body:any){
    const schema = Joi.object({

    }).unknown(true)
    return schema.validate(body)
}

export async function validateNewCyberpay(body:any){
    const schema = Joi.object({
        transaction_id: Joi.string().required(),
    }).unknown(true)
    return schema.validate(body)
}

export async function validateCyberpayPayment(body:any){
    const schema = Joi.object({
        payment_channel_id: Joi.string().required(),
        ref_1: Joi.string().required(),
        amount: Joi.number().required(),
    }).unknown(true)
    return schema.validate(body)
}

//Test from webhook
// payment_channel_id: 'P002',
// transaction_id: 'trans001',
// ref_1: 'ref0001',
// ref_2: 'ref0002',
// ref_3: 'ref3',
// service_fee: '0.03',
// bank_code: '5400'

//Test pay 1 baht   1st time
// payment_channel_id: 'P002',
// transaction_id: 'CPTZBDR4UU8D4G0DH4D5',
// ref_1: 'CP001SFFZ61FXVS8THWX',
// ref_2: 'CPT25481197156303002',
// ref_3: 'SNL24041717073253627',
// service_fee: 0.01,
// bank_code: '004'

//Test pay 1 baht 2nd time
// payment_channel_id: 'P002',
// transaction_id: 'CPTYDJHXTRLQCRC67YOT',
// ref_1: 'CP001SFFZ61FXVS8THWX',
// ref_2: 'CPT25481197156303002',
// ref_3: 'SNL24041717073253627',
// service_fee: 0.01,
// bank_code: '014'