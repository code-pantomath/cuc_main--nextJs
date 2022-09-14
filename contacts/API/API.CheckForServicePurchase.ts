const axios = require('axios').default;

import { ICheckForServicesPurchaseAPIData, IServicesPurchaseAPIData } from "../interfaces/Interfaces";


async function API_CheckForServicePurchase(purchaseData:ICheckForServicesPurchaseAPIData):Promise<IServicesPurchaseAPIData> {

    const { userId, guid, serviceType } = purchaseData;

    const { data: res, } = await axios({
        method: "GET",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/${userId}/services/purchase/${serviceType}/${guid}`,
    })

    return res as IServicesPurchaseAPIData;
};


export default API_CheckForServicePurchase;