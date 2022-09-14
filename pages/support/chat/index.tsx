import { Box, Skeleton, Transition } from "@mantine/core";
import Head from "next/head";

import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";

import SupportChatWidget from "../../../components/SupportChatWidget.js";


import { io, Socket } from "socket.io-client";
import { getSession, useSession } from "next-auth/client";
import { GetServerSidePropsContext, NextPage } from "next";

// Create false methods to avoid undefiend errors berfore re-asigning the "socket" variable to a real "socket.io"'s socket...
let socket:Socket = {
    emit() {},
    on() {},
    once(){},
} as unknown as Socket;
////


const SupportChat: NextPage = (props) => {
    const router = useRouter();
    const [session, isAuthSessionLoading] = useSession();
    // const { user }:any = session as any;

    // const [theUserId, setTheUserId] = useState<string|number>("");

    const USER_ID = (props as any)?.userId ||(session?.user as any)?.id;


    const [msgsStrArr, setMsgsStrArr] = useState<string[]>([]);
    const [isChatBoxShown, setIsChatBoxShown] = useState<boolean>(false);



    const webSocketInitializer = async () => {
        socket = io(`${process?.env?.SUPPORT_SERVER_WEB_SOCKET__ENDPOINT_URL}`, {
            transports: ['websocket'],
        });

        
        socket?.on('connection', (connection, i) => {
            // //// console.log('The client is connected !');
            //// console.log(' ')
        });

        
        socket?.on("Send_AllMsgs", ({msgs}) => {
            // setMsgsData(() => msgs);

            // //// console.log(msgsData);
            for (let i = 0; i < msgs.length; i++) {
                // //// console.log(msgs);
                (msgs[i] as any)?.kind === "user" ? sendClientMsg((msgs[i] as any)?.msg) : receivedResponceMsg((msgs[i] as any)?.msg, USER_ID, false);
            }
            
            setIsChatBoxShown(true);
        });

        socket?.on("disconnection", () => {
            socket?.removeAllListeners();
        });


        socket?.on("Support_Msg", ({msg}) => {
            receivedResponceMsg(msg, USER_ID);
        });

    }


    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(true);

    // const [msgsData, setMsgsData] = useState([]);


    useEffect(() => {
        setIsPageLoaded(true);

        
        (
            async () => {
                const RCW__imports = await import("react-chat-widget");
                RCW__imports.toggleWidget();

                !USER_ID && setTimeout(() => setIsChatBoxShown(true), 1000);
                // !USER_ID && setIsChatBoxShown(true);
                
                //
                await webSocketInitializer();
                //
                
            }
        )()
        .then(() => {
            USER_ID && socket?.emit("Get_AllMsgs", {userId: USER_ID});
            // !USER_ID && setIsChatBoxShown(true);
        });
            


    }, []);



    const sendClientMsg = (resMsg: string) => {
        (
            async () => {
                (await import("react-chat-widget")).addUserMessage(resMsg);
            }
        )().catch(err => console.error(err?.message));
    };
    const receivedResponceMsg = (resMsg: string, userId: string = "", sendAlertToServerSocket: boolean = true) => {
        (userId && sendAlertToServerSocket) && socket?.emit("Support_Msg__Received", {msg: resMsg, userId, });
        import("react-chat-widget").then(mod => mod.addResponseMessage(resMsg)).catch(err => console.error(err));
    };
    



    const handleNewUserMessage = (msg: string) => {
        // //// console.log(`New message incoming! ${msg}`);

        if (msgsStrArr.length === 0) {
            setTimeout(() => {
                receivedResponceMsg("Hey! \n\nWe'll try to responce to you ASAP! \n Please be patient... 😘");
                setTimeout(() => !USER_ID && receivedResponceMsg("And please note that since you're not signed-in, \nThis chat will be unavailable to review once you close/refresh the page. \n\nHowever, if you want it to resist, you will need to register or sign in."), 1.75 * 1000)
            }, 2.75 * 1000);
        }

        setMsgsStrArr(prev => [...prev, msg]);


        socket.emit("User_Msg", {
            msg,
            userId: USER_ID,
            userIp: (session?.user as any)?.ip,
            userEmail: (session?.user as any)?.email,
        });
    };




    return (
        <Fragment>

            <Head>
                <title>Support Chat | {process.env.WEBSITE_DOMAIN_NAME}</title>
                <meta name="description" content={`Support live chat for ${process.env.WEBSITE_DOMAIN_NAME} users.`} />
            </Head>
          


            { !isChatBoxShown &&
                <Box p="md" style={{height:"80vh",width:"90%", margin:"0 auto", borderRadius:".75rem"}} >

                    <>
                        <Skeleton height={'90%'} mt={5} > <span>Loading...</span> </Skeleton>
                        <Skeleton height={'10%'} mt={5} />
                    </>
      
                </Box>
            }

            <Transition mounted={isChatBoxShown} transition="fade" duration={750} >
                {
                    (transStyles) => (
                        <Box component="main" style={{width:"90%",height:"80vh", margin:"0 auto",marginTop:".75%", borderRadius:".75rem", boxShadow:".15vh .15vh .75vh .05vh #000009", zIndex:100, overflow:"hidden", ...transStyles }} >
                            {   (isPageLoaded && typeof window !== "undefined") &&
                                <SupportChatWidget 
                                    handleNewUserMessage={handleNewUserMessage}
                                    title="Support Chat"
                                    subtitle={USER_ID ? "*If you didn't get a responce back within 15 minutes max, we'll get back to you via e-mail !" : "*We usually responce within a maximum of 15 minutes !"}
                                    senderPlaceHolder="Tell us.., what problem are you facing?"
                                    fullScreenMode
                                    autoFocus
                                    // resizable={false}
                                    emojis
                                    showBadge
                                    showCloseButton={false}
                                    showTimeStamp={!USER_ID} // Means show time stamp only for none-registered users..
                                    
                                    profileAvatar="/svgs/support/chatAgentAvatar_2.svg"
                                    profileClientAvatar="/svgs/support/chatUserAvatar_1.svg"

                                    style={{zIndex:200}}
                                />
                            }
                        </Box>
                    )
                }
            </Transition>


        </Fragment>
    );
}



export const getServerSideProps = async (ctx:GetServerSidePropsContext) => ( { props: { userId: ((await getSession(ctx) as any)?.user?.id) || "", }, } ); // Extractin the user id from next-auth seession JWT token in server  before building...


export default SupportChat;
