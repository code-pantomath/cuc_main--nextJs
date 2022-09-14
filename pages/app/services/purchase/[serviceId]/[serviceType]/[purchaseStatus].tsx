import { Group, Paper, Text, useMantineTheme } from "@mantine/core";
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { MoodSad, MoodSmile } from "tabler-icons-react";
import contacts from "../../../../../../contacts/contacts";



interface PageFunctionProps_Add {
    isPurchaseExist: boolean,
}

const ServicePurchaseStatus: NextPage<PageFunctionProps_Add> = function ({ isPurchaseExist, }) {
    const router = useRouter();
    const [session, isSessionLoading] = useSession();


    // const [isPurchaseExist, setIsPurchaseExist] = useState<boolean>(false);


    useEffect(() => {
        setTimeout(() => !session && router.replace('/'), 1000);
        setTimeout(() => router.replace('/account/wallet'), 5000);
    }, []);
   

    console.log(router.query);

    const { serviceType, purchaseStatus } = router.query;

    const isPurchaseOk:boolean = (purchaseStatus+"").toLowerCase() === "success";
    const isServiceTypGift:boolean = (serviceType+"").toLowerCase() === "gift";

    const theme = useMantineTheme();



    return (session) ? (
        <Fragment>

            <Head>
                <title>Purchase {purchaseStatus} | {process.env.WEBSITE_DOMAIN_NAME}</title>
                <meta name="description" content={`Credits wallet details of a ${process.env.WEBSITE_DOMAIN_NAME} user.`} />
            </Head>
            


            <Paper p="xl" radius="md" shadow="lg" sx={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"cebter", top:"50%", width:"50%", height:"50%", margin:"15vh auto", border:`.25vh solid ${theme.colors.violet[9]}` }} >
                
                <Group mt="xl" direction="column" spacing="xl" align="center" >

                    {
                        (isPurchaseOk && isPurchaseExist) ? 
                        <Text sx={{fontSize:"1.85vh"}} >Congrats {session?.user?.name} ;)
                            <br/>
                            The purchase was successful,
                            We will try our best to send you the {serviceType} ASAP !
                        </Text>
                        :
                        <Text size="xl" >Unfortunately {session?.user?.name} :( 
                            <br/>
                            The purchase was not successful, try again later !
                        </Text>
                    }

                    {   (isPurchaseOk && isPurchaseExist) ?
                        <MoodSmile size={125} color={theme.colors.violet[6]} style={{ marginTop:"10%" }} />
                        :
                        <MoodSad size={125} color={theme.colors.violet[6]} style={{ marginTop:"10%" }} />
                    }

                </Group>

            </Paper>

        </Fragment>
    )
    
    :

    <div>You must be logged-in to acces this page!</div>;
}



interface IServicePurchaseStatus_GetServerSideProps {
    isPurchaseExist: boolean,
}

export async function getServerSideProps(ctx:GetServerSidePropsContext):Promise<GetServerSidePropsResult<IServicePurchaseStatus_GetServerSideProps>> {
    
    try {

        const { req, params, } = ctx;


        if (req.headers.referer?.toLowerCase() === `${process.env.WEBSITE_DOMAIN_NAME?.toLowerCase()}/app`) {
            return { props: { isPurchaseExist: true } };
        }


        const { id:userId, }:any = await contacts.API.CheckForServicePurchase({
            userId: ((await getSession(ctx) as any)?.user?.id),
            serviceType: params?.serviceType as any,
            guid: params?.serviceId as string,
        });

        return {
            props: {
                isPurchaseExist: (!!userId),
            },
            // redirect: false,
            // notFound: false,
        }


    } catch (err:any) {
        console.error(err['message'] || "");
        return {
            props: {
                isPurchaseExist: false,
            },
        }
    }

}


export default ServicePurchaseStatus;