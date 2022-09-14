const axios = require('axios').default;

import { IUserDeleteUdemAccountsAPIData, IUserAddUdemAccountsAPIData } from "../interfaces/Interfaces";


interface IEAPI_AddUdemAccount {
    accData:(IUserAddUdemAccountsAPIData), 
}


export async function API_AddUdemAccount<IEAPI_AddUdemAccount> (accData:IUserAddUdemAccountsAPIData) {

    const { name, email, id:userId, } = accData;


    const { data: res, } = await axios({
        method: "post",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/${userId}/udem/accounts`,
        data: {
            name,
            email,
        },
        
    })


    return res as IUserAddUdemAccountsAPIData[];  

};


export async function API_DeleteUdemAccount<accData extends IUserDeleteUdemAccountsAPIData> (accData:IUserDeleteUdemAccountsAPIData) {
    const { email, userId, accId } = accData;

    const { data: res, } = await axios({
        method: "delete",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/${userId}/udem/accounts/${accId}`,
    })


    return res as IUserDeleteUdemAccountsAPIData[]; 
}


export async function API_GetUdemAccounts (accData:{ id:string|number }) {
    const { id:userId, } = accData;

    const { data: res, } = await axios({
        method: "get",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/${userId}/udem/accounts`,
    })


    return res; 
}