import Joi from 'joi'

export async function validateNewDevice(body:any){
    const schema = Joi.object({
        merchantCode: Joi.string().required(),
        branchCode: Joi.string().required(),
        deviceName: Joi.string().required(),
        uuid: Joi.string().required(),
        macAddr: Joi.string().required(),
        type: Joi.string().required(),
        status: Joi.string().required()
    }).unknown(true)
    return schema.validate(body)
}

export interface Device {
    merchantCode: string,
    branchCode: string,
    deviceName: string,
    uuid: string,
    macAddr: string,
    type: string,
    status: string,
    createdAt: string,
    updatedAt: string,    
}