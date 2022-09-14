// const axios = require('axios').default;

import { signIn, SignInOptions, SignInResponse } from "next-auth/client";

import { IUserLoginAPIData } from "../interfaces/Interfaces";


type IUserLoginAPIData__Add = { pswd?:string, }
// type funcReturnType = Promise<SignInResponse|undefined>;

interface IECLIENT_LoginUser {
    UserData: (IUserLoginAPIData & IUserLoginAPIData__Add), 
    DataSetter?: Function,
    logInKind?: string,
}


async function CLIENT_LoginUser<IECLIENT_LoginUser> (userData:((IUserLoginAPIData & IUserLoginAPIData__Add) | SignInOptions), logInKind:string="credentials", ): Promise<SignInResponse|undefined|void> {

    try {

        const { email, password, id, ip, uniqueCode, wallet, firstName, lastName, } = userData;
    
    
        const res = await signIn(logInKind, {
            redirect: false,
            name: `${firstName} ${lastName}`.trim().replace(/  /g, " "),
            email,
            password,
            id,
            ip,
            uniqueCode,
            wallet,
        });


        if (!(<SignInResponse><unknown>res)?.error) return res
        else return (<SignInResponse><unknown>res)?.error as any;  


    } catch(err:Error|unknown) {
        // del// console.log(err);
    }

};


export default CLIENT_LoginUser;