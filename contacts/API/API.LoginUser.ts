// import axios from "axios";
const axios = require('axios').default;


import { IUserLoginAPIData } from "../interfaces/Interfaces";


type IUserLoginAPIData__Add = { pswd?:string, }

interface IEAPI_LoginUser {
    UserData:(IUserLoginAPIData & IUserLoginAPIData__Add), 
    DataSetter?:Function,
}


async function API_LoginUser<IEAPI_LoginUser> (userData:(IUserLoginAPIData & IUserLoginAPIData__Add)): Promise<IUserLoginAPIData> {

    let { email, pswd: password, ip } = userData;


    const { data: res, } = await axios({
        method: "post",
        url: `${process.env.API_MAIN_SERVER_ENDPOINT_URL}/api/users/login/`,
        data: {
            email,
            password,
            ip: ip || "",
        },
        
    })


    return <IUserLoginAPIData>res;  

};


export default API_LoginUser;