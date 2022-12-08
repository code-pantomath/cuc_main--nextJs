import { Fragment, useEffect, useState } from 'react'
import type { NextPage } from 'next'

import coreStyles from "../../styles/css/wallet.module.css";
import styles from "../../styles/css/account.module.css";


import {
  Box,
  Button,
  Paper,
  Notification,
  TextInput,
  Text,
  useMantineTheme,
  Transition,
  Modal,
  Group,
} from '@mantine/core';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Icon, Trash, TrashX, X } from 'tabler-icons-react';
import AccountCard from '../../components/AccountCard';
import contacts from '../../contacts/contacts';
import { Session } from 'inspector';
import { IUserAddUdemAccountsAPIData, IUserDeleteUdemAccountsAPIData } from '../../contacts/interfaces/Interfaces';
import Head from 'next/head';
import { AxiosError } from 'axios';

////
interface ICourseData {
  name: string,
  description: string,
  rating: string,
  students: string,
  features?: any,
  imgUrl: string,

  error?: any,
}
/////

type Session__Add__Ty = (Session|null) & {
  user?: {
    id?: string|number,
    ip?: string,
    name?: string,
    email?: string,
  }
}


const account: NextPage = () => {
  const router = useRouter();
  const [ses, isLogging] = useSession();
  const session = ses as unknown as Session__Add__Ty;
  
  const theme = useMantineTheme();

  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [errNoti, setErrNoti] = useState<{ err:string[], icon:Icon|JSX.Element, }|undefined>();


  const [udemAccDeletionModalData, setUdemAccDeletionModalData] = useState<any>();

  const [udemAccountName, setUdemAccountName] = useState<string>("");
  const [udemAccountEmail, setUdemAccountEmail] = useState<string>("");

  const [udemAccountsArr, setUdemAccountsArr] = useState<Array<any>>([]);


  useEffect(() => {
    (
      async () => {
        const userUdemAccounts = await contacts.API.GetUdemAccounts({ id: session?.user?.id as number, });
        setUdemAccountsArr(userUdemAccounts);
      }
    )()
    setIsPageLoaded(true);
  }, [])


  async function btnAddAccClick_EV() {
    if (!(udemAccountName && udemAccountEmail)) return;

    try {
      const res = await contacts.API.AddUdemAccount({ name: udemAccountName, email: udemAccountEmail, id: session?.user?.id as string, });
    
      setUdemAccountsArr(res);


    } catch(err) {
      setErrNoti({
        err: ["Error", "You are only allowed to add the details of a maximum of 5 accounts at a time !"],
        icon: <X size={18} />,
      })
      setTimeout(() => setErrNoti(undefined), 2.5 * 1000)
    }
  }

  async function udemAccBtnClick_EV(accData:(IUserAddUdemAccountsAPIData & IUserDeleteUdemAccountsAPIData)) {

    setUdemAccDeletionModalData(accData);
    
  }

  async function udemAccDeletionModalBtnDeleteClick_EV () {
    const restOfUserUdemAccounts = await contacts.API.DeleteUdemAccount({
      userId: session?.user?.id as string,
      accId: udemAccDeletionModalData?.id,
    });


    setUdemAccountsArr(restOfUserUdemAccounts);
    setUdemAccDeletionModalData(null);

    setErrNoti({
      err: ["The account details has been deleted successfully !", ""],
      icon: <TrashX size={18} />
    });
    setTimeout(() => setErrNoti(undefined), 2.5 * 1000)
  }

  function udemAccDeletionModalBtnCancelClick_EV () {
    setUdemAccDeletionModalData(undefined);
  }




  return session ? (
    <Fragment>

      <Head>
        <title>Account | {process.env.WEBSITE_DOMAIN_NAME}</title>
        <meta name="description" content={`Account details of a ${process.env.WEBSITE_DOMAIN_NAME} user.`} />
      </Head>



      <Transition mounted={!!errNoti} transition="slide-left" >
        {
          (styles) => (
            <Notification style={{ position:"absolute", right:"1.5%", width:"25%", zIndex:101, ...styles, }} title={errNoti?.err[0]} icon={errNoti?.icon} color="red">
              {errNoti?.err[1]}
            </Notification>
          )
        }
      </Transition>



      <Modal
        opened={!!udemAccDeletionModalData}
        onClose={() => setUdemAccDeletionModalData(undefined)}
        title={`Are you sure? You want to delete the account (${udemAccDeletionModalData?.name}) ?`}
        centered
      >
        
        <Group >

          <Button onClick={async () => await udemAccDeletionModalBtnDeleteClick_EV()} >
            Yes, Delete
          </Button>

          <Button variant='outline' onClick={udemAccDeletionModalBtnCancelClick_EV.bind(this)} >
            No, Cancel
          </Button>

        </Group>F


      </Modal>



      <Transition mounted={(session && isPageLoaded)} transition="pop" >

        {
          (animStyles) => (

            <main style={{ width:"100%", height:"100%", ...animStyles }} >

              <Box component="section" className={coreStyles.section_1} >

              <Paper shadow="sm" className={coreStyles.walletBalanceBox} > 

                  <div className={styles.accountInfoContainer} >

                    <div className={styles.accountInfoContainer__COVER} ><><br/></></div>


                    <TextInput
                      ''}
                      placeholder={session?.user?.name || ''}
                      label="Name"
                      disabled

                      style={{color:"#fd0"}}
                    />

                    <TextInput
                      placeholder={session?.user?.email || ''}
                      label="Email address"
                      disabled
                    />

                    <TextInput
                      placeholder={(session?.user as any)?.uniquCode || ''}
                      label="Affiliate code"
                      disabled
                    />

                </div>

              </Paper>

              <Paper shadow="sm" className={coreStyles.walletBalanceHistoryBox} style={{}} >
                  
                <div className={styles.accountInfoContainer} >

                  <Text sx={{opacity:.75}} >Add udemy accounts basic info to select for services</Text>


                  <TextInput
                    placeholder={"name or uniqe id"}
                    label="Name / Id"

                    onChange={(e) => setUdemAccountName(e.currentTarget.value)}
                  />

                  <TextInput
                    placeholder="udemy account email address"
                    label="Email address"
                    type="email"

                    onChange={(e) => setUdemAccountEmail(e.currentTarget.value)}
                  />

                  <Button uppercase onClick={async () => await btnAddAccClick_EV()} >Add</Button>

                </div>


              </Paper>

              </Box>


              <Box component="section" className={coreStyles.section_2} >

              <Paper shadow="lg" p="xl" className={coreStyles.walletBalanceLoaderBox} style={{ width:'91.75%', marginLeft: "4%", borderRadius:"4.5vh" }} >
                  
                <div className={styles.accountsCardsContainer} >
                  { udemAccountsArr[0] ?

                    udemAccountsArr.map((acc, idx) => (
                      <AccountCard
                        key={acc?.name+idx || idx}
                        theme={theme}
                        picLetter={acc?.name?.at(0)?.toUpperCase() as string}
                        txtMain={acc?.name || ""}
                        txtSec={acc?.email || ""}
                        btnTxt={"Delete"}
                        btnIcon={<Trash size={18} color="#fd0" />}
                        btnFunc={async () => await udemAccBtnClick_EV(acc)}                   
                      />
                    ))

                    :

                    <div style={{margin:"0 auto"}} >
                      <Text size="xl" >You still did not add any accounts info !</Text>
                    </div>
                  }
                </div>

              </Paper>

              </Box>

            </main>

          )
        }

      </Transition>


    </Fragment>
  )

  :

  (
    <div>You have to sign-in to view this page !</div>
  )

}


export default account;
