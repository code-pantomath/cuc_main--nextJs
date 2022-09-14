const axios = require('axios').default;

import { IServicesPurchaseAPIData } from "../interfaces/Interfaces";



async function API_PurchaseService (purchaseData:IServicesPurchaseAPIData):Promise<any> {

    const { serviceType:type, order, udemEmail, userId } = purchaseData;

    const { data: res, } = await axios({
        method: "POST",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/${userId}/services/purchase`,
        data: {
            type,
            order,
            udemEmail,
        },
    })

    return res;
};


export default API_PurchaseService;