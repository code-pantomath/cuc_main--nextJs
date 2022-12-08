import { Fragment, useEffect, useState } from 'react'
import type { NextPage } from 'next'

import styles from "../../../styles/css/wallet.module.css";


import {
    Badge,
    Box,
    Paper,
    useMantineTheme,
    Text,
    Button,
    Chips,
    Chip,
    Menu,
    Divider,
    TextInput,
    Slider,
    Transition,
    Group,
    ScrollArea,
    Modal,
    Loader,
} from '@mantine/core';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { ArrowNarrowDown, CircleDashed, Minus, Plus } from 'tabler-icons-react';
import walletPagePaymentMethods from '../../../models/wallet/walletPagePaymentMethods';
import { IUserWalletAPIData } from '../../../contacts/interfaces/Interfaces';
import contacts from '../../../contacts/contacts';

import walletPageChargeAmountsArr from '../../../models/wallet/walletPageChargeAmounts';
import Head from 'next/head';


const wallet: NextPage = () => {
    const router = useRouter();
    const [session, isSessionLoading] = useSession();
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
    
    const theme = useMantineTheme();


    const [walletData, setWalletData] = useState<IUserWalletAPIData>();
    const [walletCreditsAmount, setWalletCreditsAmount] = useState<number|string>("0.0");

    const [userEmailToTransferCreditsTo, setUserEmailToTransferCreditsTo] = useState<string>("");
    const [walletCreditsTransferAmount, setWalletCreditsTransferAmount] = useState<number|string>(3);


    const [isPaymmentMethodsMenuOpened, setIsPaymmentMethodsMenuOpened] = useState<boolean>(false);
    const [paymmentMethodsMenuCurrActiveOpt, setPaymmentMethodsMenuCurrActiveOpt] = useState<string>("Bank-Cards");
    const [paymentAmount, setPaymentAmount] = useState<number|string>("");
    const [paymentData, setPaymentData] = useState<{ id:string|number, amount:string|number }>();
    const [isPaymentRedirectModalShown, setIsPaymentRedirectModalShown] = useState<boolean>(false);

    

    useEffect(() => {

        setIsPageLoaded(true);

    }, [])


    useEffect(() => {

        (isPageLoaded && session) && (
            async () => {

                const wallet = await contacts.API.GetUserWallet({ userId: (session?.user)?.id });;
                setWalletData(wallet);

                setWalletCreditsAmount(wallet.value!);
            }
        )();

    }, [isPageLoaded, session]);



    async function AddCreditsBtnClick_EV () {
        if (!paymentData?.amount || !paymmentMethodsMenuCurrActiveOpt) return;


        setIsPaymentRedirectModalShown(true);

        setTimeout(() => {
            (
                async () => {
                    
                    const paymentPageUrl:string = (`https:
                        ?id_d=${paymentData?.id}
                        &cart_uid=
                        &ai=
                        &unit_cnt=
                        &curr=${(walletPagePaymentMethods.methodsArr.find(m => m.name === paymmentMethodsMenuCurrActiveOpt))?.shortName}
                        &lang=en-US
                        &digiuid=C8B52D08-B203-4341-BA3A-3D8BCF507B23
                        &_ow=
                        &_ids_shop=
                        &failpage=https:
                        &email=${session?.user?.email || ''}
                    `);

                    
                    window?.open(paymentPageUrl.trim().replace(/ /g, ''), "_blank");
                    setIsPaymentRedirectModalShown(false);
                    
                }
            )();
        }, 4000)
        
    }



    async function transferWalletCredits_clickEV() {
        if (walletCreditsTransferAmount < 3 || walletCreditsTransferAmount > walletData?.value!) return;
        if (userEmailToTransferCreditsTo?.trim()?.replace(/ /g, '') === "") return;
        if (userEmailToTransferCreditsTo?.toLowerCase() === session?.user?.email) {
            setUserEmailToTransferCreditsTo(() => "You can't use your own email address!");
            return;
        };

        const res = await contacts.API.TransferWalletCredits({
            userId: (session?.user )?.id,
            receiverEmail: userEmailToTransferCreditsTo?.toLowerCase(),
            amount: walletCreditsTransferAmount,
        });

        if (!res?.id) {
            setUserEmailToTransferCreditsTo(() => "Please check the email addres you entered!");
            return;
        } 
        else setWalletData(() => res);

        console.log(res);
    }




    return (
        <Fragment>

        <Head>
            <title>Wallet | {process.env.WEBSITE_DOMAIN_NAME}</title>
            <meta name="description" content={`Credits wallet details of a ${process.env.WEBSITE_DOMAIN_NAME} user.`} />
        </Head>



        <Modal opened={isPaymentRedirectModalShown} onClose={() => setIsPaymentRedirectModalShown(false)} >

            <Text size="md" >You will be redirected to an external payment page to complete the charge process within seconds...</Text>
            <Box component='div' p="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Loader size="md" />
            </Box>

        </Modal>



        <Transition mounted={(!!session && isPageLoaded)} transition="pop" >
            {
                (animStyles) => (

                    <main style={{ width: "100%", height: "100%", ...animStyles }} >

                        <Box component="section" className={styles.section_1} >

                            <Paper shadow="sm" className={styles.walletBalanceBox} >
                                

                                <Badge className={styles.balanceBadge} variant="gradient" gradient={{ from: theme.colors.violet[3], to: theme.colors.violet[9] }}>
                                    <CircleDashed className={styles.balanceBadgeIcon} size={18} color={'#ffff'} />
                                    
                                    <Text className={styles.balanceBadgeTxt} >{((walletData?.value?.toString()?.length as number)<2?walletData?.value+".0":walletData?.value) || "0.0"} <span style={{color:"#fd0"}} >$</span></Text>

                                </Badge>

                                {/* <Button className={styles.balanceAddBtn} variant="outline" uppercase rightIcon={<Plus size={16} color="#fd0" />} >
                                    Add 
                                </Button> */}

                                {/* <Text>Balance</Text> */}
                                

                            </Paper>

                            <Paper shadow="sm" className={styles.walletBalanceHistoryBox} style={{}} >
                                
                                {   !walletData?.history?.at(0) ?
                                    <h3>You still did not add any credits !</h3>
                                    
                                    :

                                    <Group className={styles.walletBalanceHistoryBoxStack} p="md" pb="xs" direction="column" noWrap  >
                                        <ScrollArea style={{ height: "100%", width:"100%" }}>

                                        {
                                            walletData?.history?.map((item, idx) => (
                                                <Paper className={styles.walletBalanceHistoryBoxStackItem} key={(item.id as string)+"--"+idx} >
                                                    <Group align="center" position="apart" pr="lg" pl="lg" >
                                                        <h4 style={{color:theme.colors.violet[3]}} >{item.value||""}.0{item.value.toString().length<2?<>&nbsp;</>:''} <span style={{color:"#fd0"}} >$</span></h4>

                                                        <h5 style={{opacity:.75,}} >{(item?.createdAt )?.split('T')[0].replace(/-/g, "/")}</h5>

                                                        {   
                                                            item.type === '+' ? <Plus color="#fd0" style={{opacity:.75,}} /> :
                                                            item.type === "-" ? <Minus color="red" style={{opacity:.75,}} /> : null
                                                        }
                                                    </Group>
                                                    
                                                    <Divider variant="dashed" size="xs" sx={{width:"96%", margin:"0 auto", opacity:.15, }} />
                                                </Paper>
                                            ))
                                        }
                                        </ScrollArea>
                                    </Group>
                                }

                            </Paper>

                            </Box>


                            <Box component="section" className={styles.section_2} >

                            <Paper shadow="md" className={styles.walletBalanceTransfersBox} >
                                    
                                <Text sx={{fontSize:"2.25vh",}} >Transfer credits</Text>

                                {/* <Divider color={"violet"} size="md" /> */}

                                <TextInput required type="text" label="Receiver account email address" placeholder="Email address" value={userEmailToTransferCreditsTo} onChange={(e) => setUserEmailToTransferCreditsTo(e?.currentTarget?.value)} />

                                <Slider label={(value) => `${value} $`} labelAlwaysOn min={3} max={49} 
                                    marks={[
                                        { value: 3, label: '3$' },
                                        { value: 9, label: '9$' },
                                        { value: 25, label: '25$' },
                                        { value: 49, label: '49$' },
                                    ]} 

                                    sx={{width: '55%', height: '15%'}}

                                    onChangeEnd={setWalletCreditsTransferAmount}

                                />

                                <Button variant='outline' onClick={async () => await transferWalletCredits_clickEV()} >
                                    Transfer
                                </Button>

                            </Paper>


                            <Paper shadow="md" p="xl" className={styles.walletBalanceLoaderBox} style={{}} >
                                
                                <Chips className={styles.amountsChips} color="violet" spacing="xl" size="md" radius="md" >
                                    {
                                        walletPageChargeAmountsArr.map(({ amount, id }, idx) => (
                                            <Chip value={amount} onClick={()=>setPaymentData({ id, amount })} key={+id+idx} >
                                                {amount} $
                                            </Chip>
                                        ))
                                    }
                                </Chips>


                                <Menu className={styles.paymentMethodsMenu} onChange={setIsPaymmentMethodsMenuOpened } placement="center" gutter={2} trigger="hover" withArrow control={<Button sx={{backgroundColor:theme.colors.dark[6], minWidth:"175%", transform:"translateX(-22.5%)"}} rightIcon={<ArrowNarrowDown size={18} color="#fd0" />} >{paymmentMethodsMenuCurrActiveOpt}</Button>} sx={{ '& .mantine-Menu-dropdown': { maxHeight:"5vh" }, }}  >
                                    {
                                        walletPagePaymentMethods.methodsArr.map(({ name, img }, idx) => (
                                            
                                                <Menu.Item key={name+idx} onClick={(e:any) => setPaymmentMethodsMenuCurrActiveOpt(name)} >
                                                    {name}
                                                </Menu.Item>
                                                
                                            
                                        ))
                                    }
                                </Menu>


                                <Group mt="xl" direction='column' align='center' sx={{ height:"100%", width:"100%", justifyContent:"space-between" }} >

                                    <div className={styles.paymentMethodImgContainer} >
                                        {
                                            walletPagePaymentMethods.methodsArr.map(({ name, img, }, idx) => {
                                                const ICON = paymmentMethodsMenuCurrActiveOpt === name ? (img ) : null;
                                                if (ICON) return <div/> || <ICON key={name+idx} size={25} style={{ display:"inline-block" }} />;
                                                else return null;
                                            })
                                        }
                                    </div>


                                    <Button className={styles.payActionBtn} variant="outline" onClick={async () => await AddCreditsBtnClick_EV()} >
                                        Add credits
                                    </Button>

                                </Group>


                            </Paper>

                        </Box>



                    </main>

                )
            }
          </Transition>

        </Fragment>
    )
}


export default wallet;

