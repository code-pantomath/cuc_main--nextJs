// import axios from "axios";
const axios = require('axios').default;


import { IUserRegisterAPIData } from "../interfaces/Interfaces";
import API_GetUserIpAdress from "./API.GetUserIpAdress";


type IUserRegisterAPIData__Add = { pswd?:string, }

interface IEAPI_RegisterUser {
    UserData:(IUserRegisterAPIData & IUserRegisterAPIData__Add), 
    DataSetter?:Function,
}


async function API_RegisterUser<IEAPI_RegisterUser> (UserData:(IUserRegisterAPIData & IUserRegisterAPIData__Add)): Promise<IUserRegisterAPIData|void> {

    const clientIpAdress:string = await API_GetUserIpAdress()

    const { data: res, } = await axios({
        method: "post",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/`,
        data: {
            firstName: UserData.firstName,
            lastName: UserData.lastName,
            email: UserData.email,
            password: UserData.pswd,
            ip: clientIpAdress,
        },
        // responseType: "json",
        // headers: {
        //   "Accept": "application/json",
        //   "ContentType": "application/json",
        // }
        
    })


    // DataSetter(() => res as unknown as IUserRegisterAPIData);


    return res as IUserRegisterAPIData;  

};


export default API_RegisterUser;