const axios = require('axios').default;

import { ITransferWalletCreditsAPIData, IUserWalletAPIData } from "../interfaces/Interfaces";


async function API_TransferWalletCredits (transferData:ITransferWalletCreditsAPIData):Promise<IUserWalletAPIData> {

    const { userId, receiverEmail, amount, } = transferData;

    const { data: res, } = await axios({
        method: "POST",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/${userId}/wallet/transfer/${amount}/?email=${receiverEmail}`,
    })

    return res as IUserWalletAPIData;
};


export default API_TransferWalletCredits;