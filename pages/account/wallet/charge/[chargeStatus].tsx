import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";



// NONE-COMPELTE Feature page..

export default function WalletChargeStatus () {
    const router = useRouter();

    useEffect(() => {
        router.replace('/account/wallet/');
    }, [])


    return (
        <Fragment>

            <Head>
                <title>Wallet | {process.env.WEBSITE_DOMAIN_NAME}</title>
                <meta name="description" content={`Credits wallet details of a ${process.env.WEBSITE_DOMAIN_NAME} user.`} />
            </Head>
          
          <div>.</div>

        </Fragment>
    );
}