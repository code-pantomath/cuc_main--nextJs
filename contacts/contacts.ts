import { IUserLoginAPIData, IUserRegisterAPIData, IUserAddUdemAccountsAPIData, IUserDeleteUdemAccountsAPIData, IServicesPurchaseAPIData, ITransferWalletCreditsAPIData, ICheckForServicesPurchaseAPIData } from "./interfaces/Interfaces";

import API_LoginUser from "./API/API.LoginUser";
import API_RegisterUser from "./API/API.RegisterUser";
import API_GetUserIpAdress from "./API/API.GetUserIpAdress";
import { API_AddUdemAccount, API_DeleteUdemAccount, API_GetUdemAccounts, } from "./API/API.UdemAccount";

import CLIENT_LoginUser from "./CLIENT/CLIENT.LoginUser";
import API_GetUserWallet from "./API/API.GetUserWallet";
import API_PurchaseService from "./API/API.PurchaseService";
import CLIENT_LogoutUser from "./CLIENT/CLIENT.LogoutUser";
import API_TransferWalletCredits from "./API/API.TransferWalletCredits";
import API_CheckForServicePurchase from "./API/API.CheckForServicePurchase";



const contacts = {

    API: {

        async RegisterUser(userData:IUserRegisterAPIData) {
            return (await API_RegisterUser(userData));
        },

        async LoginUser(userData:IUserLoginAPIData) {
            return await API_LoginUser(userData);
        },

        async GetUserIpAdress() {
            return await API_GetUserIpAdress();
        },


        async AddUdemAccount (userData:IUserAddUdemAccountsAPIData) {
            return await API_AddUdemAccount(userData);
        },

        async DeleteUdemAccount (accData:IUserDeleteUdemAccountsAPIData) {
            return await API_DeleteUdemAccount(accData);
        },

        async GetUdemAccounts (accData:{ id: string|number }) {
            return await API_GetUdemAccounts(accData);
        },


        async GetUserWallet (userData: { userId: string|number }) {
            return await API_GetUserWallet(userData.userId);
        },

        async TransferWalletCredits (transferData:ITransferWalletCreditsAPIData) {
            return await API_TransferWalletCredits(transferData);
        },


        async PurchaseService (purchaseData:IServicesPurchaseAPIData) {
            return await API_PurchaseService(purchaseData);
        },
        
        async CheckForServicePurchase (purchaseData:ICheckForServicesPurchaseAPIData) {
            return await API_CheckForServicePurchase(purchaseData);
        }

    },




    CLIENT: {

        async LoginUser(userData:IUserLoginAPIData, logInProviderKind?:string|undefined) {
            return await CLIENT_LoginUser(!logInProviderKind ? userData : userData, logInProviderKind);
        },

        async LogoutUser() {
            return await CLIENT_LogoutUser();
        }

    },


};



export default contacts;