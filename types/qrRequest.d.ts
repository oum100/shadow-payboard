export interface QRPromptPay {
    mobileNumber?: string
    nationalID?: string
    taxID?: string
    eWalletID?: string
    bankAccount:string
    amount:number
}

export interface QRMaeManee {
    billerID: string
    reference1: string
    reference2: string
    amount: number
    terminalID: string
}