import { Fragment, useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'


import {
  Text,
  useMantineTheme,
  Button,
  Box,
  Paper,
  Kbd,
  Notification,
  Transition,
  Skeleton,
  List,
  ThemeIcon,
  Group,
  Drawer,
  Modal,
} from '@mantine/core';
import { ArrowBarRight, Checkbox, CircleDashed, Gift, InfoCircle, Mail, Man, Star, X, } from 'tabler-icons-react';

import styles from "../../styles/css/app.module.css";
import { useHotkeys } from '@mantine/hooks';
import axios, { AxiosError } from 'axios';
import contacts from '../../contacts/contacts';
import { useSession } from 'next-auth/client';
import AccountCard from '../../components/AccountCard';
import { SERVICE_ACCOUNT_PRICE, SERVICE_GIFT_PRICE } from '../../constants/CONSTANTS';
import { IServicesPurchaseAPIData } from '../../contacts/interfaces/Interfaces';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';


interface ICourseData {
  name: string,
  description: string,
  rating: string,
  students: string,
  features?: any,
  imgUrl: string,
  giftServicePrice: string,
  accountServicePrice: string,

  error?: any,
}



const app: NextPage = (props) => {
  const [session, isAuthSessionLoading] = useSession();
  const router = useRouter();

  const theme = useMantineTheme();
  


  const [errNoti, setErrNoti] = useState<string[]>(["", ""]);


  const [isUrlPasted, setIsUrlPasted] = useState<boolean>(false);
  const [pastedUrl, setPastedUrl] = useState<string>("");
  const [courseData, setCourseData] = useState<ICourseData>();
  const [isCourseDataReady, setIsCourseDataReady] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  
  const [userUdemAccounts, setUserUdemAccounts] = useState<Array<any>>([]);
  const [choosenAccData, setChoosenAccData] = useState<any>();
  const [choosenServiceType, setChoosenServiceType] = useState<IServicesPurchaseAPIData["serviceType"]|''>("");
  


  const checkPastedUrl = useCallback<(URL:string,)=>(string | boolean)>((URL:string): (string | boolean) => {
    if (typeof URL !== "string") return false;
    if (URL.trim()?.replace(":

    
    const url:string = URL.trim().toLowerCase().replace("www.", "");

    if (url.startsWith("https:
      return url;
    }

    return false;

  }, []);

  


  useEffect(() => {
    if (!isUrlPasted) return;

    (
      async () => {

        const responce = await fetch("/api/GetCourseData/all", {
          method: "POST",
          body: JSON.stringify({
            CourseUrl: pastedUrl
          }),
        });

        const result = await responce.json();

        

        setIsCourseDataReady(true);
        setCourseData(result);

        if (result && session) {
          const udemAccounts = await contacts.API.GetUdemAccounts({ id: (session?.user)?.id as string, });
          setUserUdemAccounts(udemAccounts);
        }

      }
    )();

  }, [isUrlPasted]);



  useHotkeys([
    ['ctrl+v', async () => {
      
      try {

        if (isUrlPasted) return;

        const currCopiedTxtVal:string = (await navigator?.clipboard?.readText()) || "";
        let url:string = "";

        if (checkPastedUrl(currCopiedTxtVal)) {
          url = currCopiedTxtVal;
          setPastedUrl(url);
          setIsUrlPasted(true);
        }
        else {
          setErrNoti(["Invalid URL", "The pasted text is not a valid URL or does not lead to a 'Udemy' course page!"]);
          setTimeout(() => setErrNoti(["",""]), 2.5 * 1000)

          return;
        };

      } catch(err:any) {
        console.error(err?.message || err);

        alert("Oops 😅,\n it seems like your browser is blocking us from reading the URL! \n Please consider using another browser 💓.")
      }

    }],


  ]);



  function btnBuyService_click(serviceType: IServicesPurchaseAPIData["serviceType"]|''):void {
    if (session) {
      serviceType === "gift" && setIsDrawerOpen(true);
      setChoosenServiceType(serviceType)

    } else {
      setErrNoti(["Authentication is required", "Yout must be logged-in to pay for the service."]);
      setTimeout(() => setErrNoti(["",""]), 2.5 * 1000)
    }
  }


  async function udemAccBtnClick_EV (acc:any):Promise<void> {
    setIsDrawerOpen(false);
    setChoosenAccData(acc);
  }


  async function btnConfirmBuyServiceClick_EV (serviceType: IServicesPurchaseAPIData["serviceType"]|''):Promise<void> {
    const res = await contacts.API.PurchaseService({
      userId: (session?.user )?.id,
      serviceType: serviceType as ("account" | "gift"),
      order: pastedUrl?.split("https:
      udemEmail: choosenAccData?.email || session?.user?.email,
    })
    .catch((err: AxiosError | Error) => {
      if (axios.isAxiosError(err)) {
        
        const { title, detail } = err.response?.data as any;
        
        setChoosenAccData(undefined);
        setChoosenServiceType('');

        setErrNoti([title, detail]);
        setTimeout(() => setErrNoti(['','']), 2.75 * 1000)
      }
      else {
        
      }
    })
    ;

    
    
    res && router.push(`/app/services/purchase/${res?.createdAt?.replace(/[:|.|-]/g,'')}i${res?.id}/${serviceType}/${!res?.id ? 'un' : ''}success`)

  }

  
  
  



  return (
    <Fragment>

      <Head>
        <title>Service | {process.env.WEBSITE_DOMAIN_NAME}</title>
        <meta name="description" content={`Check if ${process.env.WEBSITE_DOMAIN_NAME} offers services to get you the Udemy course you want want for a lower price.`} />
      </Head>



      <Transition mounted={Boolean(errNoti[0])} transition="slide-left" >
        {
          (styles) => (
            <Notification style={{ position:"absolute", right:"1.5%", width:"25%", zIndex:101, ...styles, }} title={errNoti[0]} icon={<X size={18} />} color="red">
              {errNoti[1]}
            </Notification>
          )
        }
      </Transition>


      <Modal
        className={styles.confirmGitfPurchaseModal}
        opened={!!choosenAccData||choosenServiceType==='account'}
        onClose={() => { setChoosenAccData(undefined); setChoosenServiceType(''); }}
        title={choosenServiceType==="gift" ? `Are you sure?\nYou want us to get you the course to the account (${choosenAccData?.name}) as a gitf for (${+((courseData?.giftServicePrice || SERVICE_GIFT_PRICE) )-.00}$) ?` : `Are you sure?\nYou want us to send you the details of a new account that contains the course, for (${+((courseData?.accountServicePrice || SERVICE_ACCOUNT_PRICE) )-.00}$) ?`}
        centered
      >
        
        <Group >

          <Button onClick={async () => await btnConfirmBuyServiceClick_EV(choosenServiceType) } >
            Yes, Confirm
          </Button>

          <Button variant='outline' onClick={() => { setChoosenAccData(undefined); setChoosenServiceType(''); }} >
            No, Cancel
          </Button>

        </Group>


      </Modal>


      
      {
        !isUrlPasted ?
        <Box style={{opacity:.9}} p="xl" pt={theme.spacing.xl*2.5} className={styles.mainBox} >

          <Text size="lg" >Copy the course's page URL, then </Text>

          <div>
            <Text size="xl" color="#fd0" >Press</Text>
            <div style={{ transform:"translateX(-15%)", color:theme.colors.violet[6], }} > <Kbd>Ctrl</Kbd> + <Kbd> V </Kbd> </div>
          </div>

          <Text size="lg" weight={50} >to paste the url here and view the services we can offer you !</Text>
        </Box>

        :

        !isCourseDataReady ? 
        <Box p="md" className={styles.mainBox} >

          <>
            <Skeleton height={'40%'} mt={5} > <span>Processing...</span> </Skeleton>
            <Skeleton height={'20%'} mt={5} />
            <Skeleton height={'15%'} mt={5} />
            <Skeleton height={'10%'} mt={5} />
          </>

        </Box>

        :null

      }

      <Transition mounted={isCourseDataReady} transition="pop" >
          {
            (transStyles) => (
              
              <Box p="lg" style={{ ...transStyles, }} >

                <Group direction="row" style={{ width: '100%', height: '100%', }} noWrap >

                  <Paper p="xs" style={{ width:"15%", height:"7.5%", transform:"translateY(3.5%)", border:`.25vh solid ${theme.colors.violet[9]}`, borderRight:"none", borderBottom: "none", borderBottomRightRadius:0,borderBottomLeftRadius:0,  }} >

                    <div className={styles.courseImgContainer} >
                      <img src={courseData?.imgUrl} className={styles.courseImg} alt="Udemy course image." />
                    </div>

                  </Paper>

                  <Paper p="xs" style={{ width:"100%", minHeight:"100%", transform:"scaleY(150%)", borderTop:`.25vh solid ${theme.colors.violet[9]}`, borderRight:`.25vh solid ${theme.colors.violet[9]}`, }}  >

                    <Box component="div" style={{ width:"100%", minHeight:"100%", transform:"scaleY(85%)" }} >
                      <Text>According to this course details shown below, we value the service of getting the course for you as : </Text>
                      <Text>Gift <span><Gift size={16} color="#fd0" style={{transform:"translateY(15%)"}} /></span> :  <span style={{color:"#fd0"}} >{courseData?.giftServicePrice} $</span> </Text>
                      <Text>Account <span><Mail size={16} color="#fd0" style={{transform:"translateY(15%)"}} /></span> :  <span style={{color:"#fd0"}} >{courseData?.accountServicePrice} {(((courseData?.accountServicePrice ) + 0) - ((courseData?.accountServicePrice )+0) === 0) && "$"}</span> </Text>
                    </Box>

                  </Paper>

                </Group>

                
                <Paper p="lg" style={{ border:`.25vh solid ${theme.colors.violet[9]}`, borderTop:"none", }} >
                  <List
                    spacing="xs"
                    size="md"
                    center
                  >

                    <List.Item icon={<ThemeIcon color={theme.colors.violet[9]} radius="xl" size={24} > <CircleDashed size={18} /> </ThemeIcon>} >{courseData?.name}</List.Item>
                    <List.Item icon={<ThemeIcon color={theme.colors.violet[9]} radius="xl" size={24} > <InfoCircle size={18} /> </ThemeIcon>} >{courseData?.description}</List.Item>
                    <List.Item icon={<ThemeIcon color={theme.colors.violet[9]} radius="xl" size={24} > <Star size={18} /> </ThemeIcon>} >{courseData?.rating} 🌟</List.Item>
                    <List.Item icon={<ThemeIcon color={theme.colors.violet[9]} radius="xl" size={24} > <Man size={18} /> </ThemeIcon>} >{courseData?.students} Students</List.Item>

                  </List>
                </Paper>


                <Group mt="xl" className={styles.buyBtnsContainer} direction="row" align="center" noWrap position="center" >
                  <Button className={styles.buyBtn} onClick={() => btnBuyService_click("gift")} >BUY AS A GIFT SERVICE</Button>
                  { (((courseData?.accountServicePrice ) + 0) - ((courseData?.accountServicePrice )+0) === 0) &&
                    <Button className={styles.buyBtn} onClick={() => btnBuyService_click("account")} >BUY AS AN ACCOUNT SERVICE</Button>
                  }
                </Group>




                <Drawer
                  opened={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                  title={userUdemAccounts[0] ? "Choose an account to send the course to : " : ""}
                  padding="xl"
                  size="xl"
                  position="bottom"
                  
                  >

                  {/* Drawer content */}
                  <Box p="xl" style={{width: "100%", height: "100%", }} >
                    <div className={styles.drawerAccountsCardsContainer} >
                      { userUdemAccounts[0] ?
                        userUdemAccounts.map((acc, idx) => (
                          <AccountCard
                            key={acc?.name+idx || idx}
                            styles={{ width: "15%" }}
                            theme={theme}
                            picLetter={acc?.name?.at(0)?.toUpperCase() as string}
                            txtMain={acc?.name || ""}
                            txtSec={acc?.email || ""}
                            btnTxt={"Choose"}
                            btnIcon={<Checkbox size={18} color="#fd0" />}
                            btnVariant="outline"
                            btnFunc={async () => await udemAccBtnClick_EV(acc)}                        
                          />
                        ))

                        :

                        <Group direction='column' spacing={theme.spacing.xl*2} align="center" >
                          <Text size="xl" >You still didn not add any account to send the course to!, please navigate to your 'account' page and add one or more. </Text>
                          <Link href="/account" >
                            <Button rightIcon={<ArrowBarRight size={18} color="#fd0" />} >
                              Navigate
                            </Button>
                          </Link>
                        </Group>
                          
                      }
                    </div>
                  </Box>

                </Drawer>


              </Box>


            )
          }
      </Transition>


    </Fragment>
  )
}


export default app;
