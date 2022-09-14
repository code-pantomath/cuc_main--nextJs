
interface IhomePageItemsImgs {
    cardsArr: Array<{name:string, imgSrc:string, badge:string, title:string, description:string, }>,
}
  
  
const homePageFeaturesCards : IhomePageItemsImgs = {
    cardsArr: [
        {
            name: "Programming learning image.",
            imgSrc: "/imgs/home/3D/Speed_3d.png",
            badge: "⚡",
            title: "FAST",
            description: `It takes us only a couple of hours to get the services we offer done successfully for you.`,
        },

        {
            name: "Programming learning image.",
            imgSrc: "/imgs/home/3D/Secure_3d.png",
            badge: "🔒",
            title: "SECURE",
            description: "Our payment gateway is protected by SSL security certificate and 3DS protocol.",
        },

        {
            name: "Programming learning image.",
            imgSrc: "/imgs/home/3D/Grab_3d.png",
            badge: "👌",
            title: "CHEAP",
            description: "Our goal is to make the process of getting educational content much easier and in-hand.",
        },

        {
            name: "Programming learning image.",
            imgSrc: "/imgs/home/3D/WideMediaRange_3d.png",
            badge: "🌐",
            title: "WIDE",
            description: "You can choose almost any course, we'll try our best to get it for you at the perfect price.",
        },

        {
            name: "Programming learning image.",
            imgSrc: "/imgs/home/3D/PaymentCard2_3d.png",
            badge: "🪙",
            title: "EZ2 PAY",
            description: "You can choose what best suits you between multiple payment method options.",
        },
        
    ],

}


export default homePageFeaturesCards;