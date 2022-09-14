import { Fragment } from 'react';

import { Box, Text, useMantineTheme } from "@mantine/core";
import { useSession } from 'next-auth/client';

import Head from 'next/head';
import Image from 'next/image';



function AffiliateProgram () {
    const [session, isAuthLoading] = useSession();

    const theme = useMantineTheme();


    return (
        <Fragment>

            <Head>
                <title>Affiliate | {process.env.WEBSITE_DOMAIN_NAME}</title>
                <meta name="description" content={`Subscribe to the ${process.env.WEBSITE_DOMAIN_NAME} affiliate program to win more free USD credits.`} />
            </Head>


            <Box mt="xl" pt="xl" component='main' sx={{ width: '100%', height: '100%', display:"flex", flexDirection: 'column', alignItems:"center", justifyContent: "space-evenly", }} >

                <Text size="xl" >This section is still under development...</Text>
                
                <div style={{ width:"25%", height:"100%", opacity:.55, marginTop:"5.55vh" }} >
                    <Image src="/imgs/general/webDev_01.png" width="100%" height="100%" layout='responsive' alt="Under Web Development"

                        style={{
                            transform:"skewY(2.5deg)",
                            filter:"grayscale(15%) contrast(115%) opacity(93%)",
                        }}
                    />
                </div>

                <Text size="lg" mb="xl" style={{opacity:.75,}} >Coming soon.</Text>


            </Box>


            {/* <div>
                {
                    !session &&
                    <h4>You have to be logged-in to access this page.</h4>
                }
            </div> */}

        </Fragment>
    );
}


export default AffiliateProgram;