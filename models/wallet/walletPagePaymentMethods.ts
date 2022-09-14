import { CreditCard, Icon, } from "tabler-icons-react";

interface IwalletPagePaymentMethods {
    methodsArr: Array<{name:string, shortName:string, img:string|JSX.Element|Icon}>,
}
  
  
const walletPagePaymentMethods : IwalletPagePaymentMethods = {
    methodsArr: [
        {
            name: "Bank-Cards",
            shortName: "GMZ",
            img: CreditCard,
        },

        {
            name: "Webmoney",
            shortName: "WMZ",
            img: CreditCard,
        },

        // {
        //     name: "Qiwi",
        //     shortName: "GMQ",
        //     img: CreditCard,
        // },

        {
            name: "Bitcoin",
            shortName: "BTC",
            img: CreditCard,
        },

        {
            name: "Litecoin",
            shortName: "LTC",
            img: CreditCard,
        },

        {
            name: "Ethereum",
            shortName: "GMH",
            img: CreditCard,
        },

        {
            name: "USD Theatre",
            shortName: "GMT",
            img: CreditCard,
        },
    ],
}


export default walletPagePaymentMethods;