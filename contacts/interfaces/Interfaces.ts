export interface IUserRegisterAPIData {
    id: string | number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    ip?: string,
}
////
export interface IUserLoginAPIData {
    id: string | number,
    uniqueCode?: string,
    name?: string,
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    // pswd?: string | undefined,
    wallet?: {
        owner?: number | string,
        type: string,
        currency: string,
        value: string | number,
        history?: any,
    },
    ip?: string,
}
////


export interface IUserAddUdemAccountsAPIData {
    name: string,
    email: string,
    id: string|number,
}
////
export interface IUserDeleteUdemAccountsAPIData {
    email?: string,
    userId: string|number,
    accId: string|number,
}
/////

export interface IUserWalletAPIData {
    currency?: string,
    history?: {
        id?: number| string,
        ownerId: string|number,
        type?: string,
        value: string|number,
        createdAt?: string|Date,
    } [],
    id?: string|number,
    ownerId: string|number,
    type?: string,
    value: string|number,
}
/////


///
export interface IServicesPurchaseAPIData {
    userId: string|number,
    serviceType: "gift" | "account",
    order: string,
    udemEmail: string,
}

export interface ICheckForServicesPurchaseAPIData {
    userId: string|number,
    serviceType: "gift" | "account",
    guid: string,
}
///

export interface ITransferWalletCreditsAPIData {
    userId: string|number,
    receiverEmail: string,
    amount: number | string,
}
///