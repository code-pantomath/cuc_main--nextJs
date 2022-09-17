import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { ColorSchemeProvider, MantineProvider, ScrollArea, useMantineTheme } from '@mantine/core';
import MainAppShell from '../Layouts/MainAppShell';
import { Fragment, useState } from 'react';
import { Provider, useSession } from 'next-auth/client';

import { useOs } from '@mantine/hooks';

////
// GLOBAL Styles imports...
import "../styles/support-chat-widget.css"
////


// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';


function App(props: AppProps) {
  const { Component, pageProps } = props;

  const os = useOs();
  const isDeviceAndroid:boolean = os === 'android';
  const isDeviceIos:boolean = os === 'ios';
  const isDevicePhoneOrTablet:boolean = (isDeviceAndroid || isDeviceIos);

  const [authSession, isAuthSessionLoading] = useSession();
  //const theme = useMantineTheme();

  const [MainAppShellOpened, setMainAppShellOpened] = useState<boolean>(true);


  return !isDevicePhoneOrTablet ? (
    <Fragment>

      <Head>
        <title>{process.env.WEBSITE_DOMAIN_NAME}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="handheldFriendly" content="true" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="A website that offers services to get Udemy courses for a lower price."></meta>
      </Head>
      
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=UA-187621071-2`} />
      <Script strategy="lazyOnload" >
          window?.dataLayer = window?.dataLayer || [];
          function gtag(){window?.dataLayer?.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-187621071-2', {
            page_path: window?.location?.pathname,
          });
      </Script>
      

        
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
          defaultRadius: "sm",
          fontFamily: "Cursive",
          primaryColor: "violet",
        }}
      >



        <Provider session={pageProps?.session} >

          <ScrollArea style={{ height: "100vh", width:"100vw", }} type="auto" scrollbarSize={5} dir="ltr" offsetScrollbars >
              
            <MainAppShell navOpened={MainAppShellOpened} >

              <Component {...pageProps} authSession={authSession} isAuthSessionLoading={isAuthSessionLoading} />
            
            </MainAppShell>

          </ScrollArea>

        </Provider>



      </MantineProvider>


    </Fragment>
  )

  :

  <div style={{ fontFamily:"Arial", }} >
    Currently, we don't support mobile phones or tablets.
  </div>

}


export default App;
