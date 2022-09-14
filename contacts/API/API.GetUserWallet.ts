const axios = require('axios').default;

import { IUserWalletAPIData } from "../interfaces/Interfaces";


async function API_GetUserWallet(userId:string|number):Promise<IUserWalletAPIData> {

    const { data: res, } = await axios({
        method: "GET",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/${userId}/wallet`,     
    })

    return res as IUserWalletAPIData;
};


export default API_GetUserWallet;
