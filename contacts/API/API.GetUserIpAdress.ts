import axios from "axios";

async function API_GetUserIpAdress():Promise<string> {

    const { data: { ip: res }, } = await axios({
        method: "GET",
        url: "https://api.ipify.org?format=json",     
    })

    return res;

};


export default API_GetUserIpAdress;