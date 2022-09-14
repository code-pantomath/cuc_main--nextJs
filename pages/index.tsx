import { Fragment, useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import NextLink from 'next/link';
import Head from 'next/head';
// import Image from "next/image";

import animStyles from "../styles/css/homeBgImgAnim.module.css";


import homePageItemsImgs from '../models/home/homePageItemsImgs'


import { Text, MediaQuery, useMantineTheme, Divider, Button, Box, Blockquote, SimpleGrid, Transition, Group, Badge, Stepper, Avatar, ScrollArea,
} from '@mantine/core';
import { BrandMastercard, Check, CircleCheck, CreditCard, CurrencyBitcoin, CurrencyEthereum, CurrencyLitecoin, LetterM, LetterP, LetterQ, LetterW, Link, Mouse } from 'tabler-icons-react'
import ItemImgBox from '../components/ItemImgBox'
import HomeAnimatedTxt from '../components/HomeAnimatedTxt'
import FeatureCard from '../components/FeatureCard'
import homePageFeaturesCards from '../models/home/homePageFeaturesCards'
import BgLineOscillateShape from '../components/BgLineOscillateShape'



const Home: NextPage = () => {

  const theme = useMantineTheme();
  const [MainShellOpened, setMainShellOpened] = useState(true);

  
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [isImgsAnimMounted, setIsImgsAnimMounted] = useState<boolean>(false);


  useEffect(() => {
    setIsPageLoaded(true);

    setTimeout(() => setIsImgsAnimMounted(true), .25 * 1000);
  }, [])

  
  const viewportRef = useRef<HTMLDivElement>();

  const scrollToSection_3 = () => (viewportRef.current as any).scrollTo({ top: (viewportRef.current as any).scrollHeight / 6.35, behavior: 'smooth' });


  return (
    <Fragment>

      <Head>
        <title>{process.env.WEBSITE_DOMAIN_NAME}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="handheldFriendly" content="true" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="Get Udemy courses for a lower price, (75%)+ OFF 😲 ."></meta>
        <meta name="keywords" content="udemy, cheap udemy, cheap courses, free udemy course, cheap online course, free course, udemy discount, udemy for free, udemy cupon, cheap, low price course, cheapudemy, cheapudemy.com" ></meta>
      </Head>
      {/* ///// */}
      

      <ScrollArea p="0" m="0" style={{margin:"-1rem",marginRight:".01px",padding:0,  height:"89vh", position:"absolute"}} offsetScrollbars={true} viewportRef={viewportRef as any} type="auto" scrollbarSize={5} >



        <Box component='section' style={{ display:"grid", gridTemplateColumns:"repeat(24, 1fr)",gridTemplateRows:"repeat(24, 1fr)", width:"100%", height:"50vh", paddingTop:"1.25vh",  }} >

          <div style={{ overflow:"hidden", zIndex: 0, gridColumn:"1 / 25", gridRow:"1 / 25", transform:"translate(0, -2.75%) scale(105%)", }} >
            <img className={animStyles.homeBgImgAnim} style={{ objectFit:"cover", zIndex: 0, gridColumn:"1 / 25", gridRow:"1 / 25", width:"100%", height:"100%", opacity:"2.75%", }} width="100%" height="100%" src="/svgs/home/sec1_Bg1.svg" alt="Background svg" />
          </div>

          {/* <div style={{ overflow:"hidden", opacity:.55, position:"fixed", zIndex: 0, gridColumn:"1 / 25", gridRow:"1 / 25", transform:"translate(0, -2.5%) scale(250%)", }} >
            <img className={animStyles.homeBgImgAnim} style={{ objectFit:"cover", zIndex: 0, gridColumn:"1 / 25", gridRow:"1 / 25", width:"100%", height:"100%", opacity:"2.75%", }} width="100%" height="100%" src="https://payop.com/assets/images/landing/bg/bg_landing-world-map.svg" />
          </div> */}

          <MediaQuery
            query="(max-width: 1200px) and (min-width: 200px)"
            styles={{ fontSize: theme.fontSizes.md, gridColumn:"4 / 24", gridRow:"1 / 10", }}
            >

            <Blockquote cite="– Edmund Burke" color={theme.primaryColor} sx={t => ({ gridColumn:"2 / 22", gridRow:"3 / 5", fontSize:theme.fontSizes.xl*2, })} >
              Education is the cheap <br/> defense of any nation.
            </Blockquote>

          </MediaQuery>


          <Box style={{ gridColumn: "2 / 15", gridRow:"15 / 20" }} >
            <HomeAnimatedTxt
              txt={[
                "Save (75%)+ of your Udemy spendings 💸 ",
                "Pay using your best suitable methods 💳 ",
                "Receive the content ASAP⚡",
                "Contact the support at any time 🗣️ ",
              ]}
              txtStyle={{ color: theme.colors.violet[7], fontSize: "1.75vw", fontStyle:"italic", fontWeight:"bold", textShadow:`.25vh .45vh .75vh ${theme.black}` }}
              config={{
                cursorShape: "!",
                loopTime: 12,
              }}
            />
          </Box>


          <Box sx={{ gridColumn:"2 / 6", gridRow:"20 / 25", display:"flex", alignItems:"flex-start", justifyContent:"space-around" }} >
            
            <NextLink href="/app" >
              <Button fullWidth variant="gradient" gradient={{ from: theme.colors.violet[9], to: theme.colors.cyan[9] }} sx={{ width:"45%", boxShadow: `.15vh .25vh .75vh .05vh ${theme.black}`, }} >
                START
              </Button>
            </NextLink>

            <Button variant="gradient" onClick={scrollToSection_3} gradient={{ from: "#fd0", to: theme.colors.violet[9] }} sx={{ width:"45%", boxShadow: `.025vh .05vh .55vh 0.025vh ${theme.black}`, }} >
              HOW? :)
            </Button>

          </Box>


          <MediaQuery
            query="(max-width: 1200px) and (min-width: 200px)"
            styles={{ display:"none", }}
          >

            <SimpleGrid cols={3} spacing="xl" p={theme.spacing.xl*1.55} style={{ gridColumn:"15 / 25", gridRow:"1 / 25", transform:"translate(-2.75%, 2.5%)", zIndex:10, }} >
              {
                homePageItemsImgs.imgsArr.map(({ name, uri }, idx) => (
                  <Transition key={name+idx} mounted={isImgsAnimMounted} transition={((++idx)>3?"slide-up":"slide-down")} duration={((++idx) * 5 * 15) + 25} >
                    {
                      (styles) => (
                        <div style={styles} >
                          <ItemImgBox key={name+idx} name={name} uri={uri} idx={idx} boxClassName={animStyles.homeItemsImgsAnim} />
                        </div>
                      )
                    }
                  </Transition>
                ))
              }

            </SimpleGrid>
    
          </MediaQuery>

          <Divider variant='dotted' size="sm" color={isImgsAnimMounted ? theme.colors.violet[9] : "transparent"} sx={{width:"2355%", transform:"translateX(1.1%)", zIndex:0,}} />

        </Box>


        {/* #__SECTION__2 : */}


        <Box component='section' p={theme.spacing.xl*1.45} pb={theme.spacing.xl*2.75} style={{ overflow:"hidden", zIndex: 5, paddingTop:"2.75%",  }} >

          {/* <div  ></div> */}
          <Group direction="row" position="left" grow noWrap spacing={theme.spacing.xl*2} style={{ position:"relative", }} >
            
            <Transition mounted={isImgsAnimMounted} transition={"fade"} duration={2500} >
              {
                (styles) => (
                  <BgLineOscillateShape styles={{ zIndex:0, opacity:.75, width:"35%", position:"absolute", transform:"scale(225%, 100%) translate(35%, 15%)", ...styles }} />
                )
              }
            </Transition>


            {
              homePageFeaturesCards.cardsArr.map((card, idx) => (
                <Transition mounted={isImgsAnimMounted} transition="pop" key={card.title+idx} >
                  {
                    (styles) => (
                        <FeatureCard
                          cardContainerStyle={{ transform:"skewY(.25turn)", ...styles, }}
                          imgConfig={{
                            src: card.imgSrc,
                            alt: card.name,
                          }}
                          badgeConfig={{
                            content: card.badge,
                          }}
                          titleTxtConfig={{
                            content: card.title + " !",
                          }}
                          txtConfig={{
                            content: card.description,
                          }}
                        />
                    )
                  }
                </Transition>
              ))
            }
            
          </Group>

        </Box>

        <Divider variant='dashed' size="xs" color={isImgsAnimMounted ? theme.colors.gray[8] : "transparent"} sx={{width:"98%", zIndex:0, margin:"0 auto"}} />


        {/* #__SECTION__3 : */}


        <Box component='section' p="xl" pb={theme.spacing.xl*2.75} style={{ position:"relative", overflow:"hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"space-between", gap: theme.spacing.xl*2.75, backgroundImage:"url()", backgroundRepeat:"no-repeat",  }}>


          <div style={{ position: "absolute", zIndex:0, width:"100%", height:"100%",  transform: "translate(25%, -15%) scale(107.5%) rotate(-7.75deg)", opacity:.075, }} >
            <img src="/svgs/home/sec3_Bg1.svg" style={{ width:"75%", }} alt="Background svg" />
          </div>

          <div style={{ position: "absolute", zIndex:0, width:"100%", height:"100%",  transform: "translate(-27.75%, 17.75%) scale(107.5%) rotate(180deg) rotate(-17.75deg)", opacity:.05, }} >
            <img src="/svgs/home/sec3_Bg1.svg" style={{ width:"75%", }} alt="Background svg" />
          </div>


          <Badge size='xl' style={{ zIndex:10, position:"relative", }} >This is how it works 😁  </Badge>

          <Stepper active={0} size="md" onStepClick={():null => null} completedIcon={<CircleCheck />} orientation="horizontal" style={{ zIndex:10, position:"relative", }} >
            <Stepper.Step style={{ color:'#fd0' }} icon={<Link style={{ color: theme.colors.violet[9] }} size={18} />} label="1- Check course URL" description="Info about Aviablility & Pricing" allowStepClick={false} allowStepSelect={false} />
            <Stepper.Step icon={<Mouse style={{ color:"#fd0" }} size={18} />} label="2- Choose service type" description="As a Gift? / Account?" allowStepClick={false} allowStepSelect={false} />
            <Stepper.Step icon={<CreditCard style={{ color:"#fd0" }} size={18} />} label="3- Payment" description="Pay for the service" allowStepClick={false} allowStepSelect={false} />
            <Stepper.Step icon={<Check style={{ color:"#fd0" }} size={18} />} label="4- DONE." description="A matter of hours ⌛" allowStepClick={false} allowStepSelect={false} />
          </Stepper>


        </Box>

        <Divider variant='dashed' size={theme.spacing.xs/6} color={isImgsAnimMounted ? theme.colors.gray[9] : "transparent"} sx={{width:"98%", zIndex:0, margin:"0 auto"}} />


        {/* #__SECTION__4 : */}


        <Box component='section' p="xl" pb={theme.spacing.xl*4.75} style={{ overflow: "hidden", display: "flex", alignItems:"center", justifyContent:"center", flexDirection:"column", backgroundImage:"url()", position:"relative",  }} >

          <img src="/svgs/home/sec4_Bg1.svg" style={{ zIndex:"0", position: "absolute", width: "99vw", height: "100%", transform:"scale(102%, 120%) translateX(-.5%)", opacity:.075, }} alt="Background svg" />          

          <Badge size='xl' style={{  }} >Accepted payment methods 💫 </Badge>

          <section dir="ltr" style={{ height:"55vh", width:"100%", marginTop:"4.75%", display:"grid", gridTemplateColumns:"repeat(24, 1fr)", gridTemplateRows:"repeat(24, 1fr)", }} >
            
            <Text weight={750} style={{ gridColumn:"2 / 17", gridRow:"8 / 12", fontSize: "3.25vw", }} >We accept 
              {/* <Space /> */}
              <span> </span>
              <HomeAnimatedTxt
                txt={[
                  "Credit ", "Debit ", "Prepaid ", "Virtual ", "Almost All Bank-"
                ]}
                txtStyle={{ color:"#fd0", fontSize: "2.75vw", fontWeight:"750", fontStyle: "normal", textShadow:`.15vh .25vh .45vh ${theme.black}` }}
                config={{
                  cursorShape: "Cards",
                  loopTime: -1,
                }}
              />

              {/* Cards */}
            </Text>

            <Badge size="lg" color={theme.colors.violet[6]} radius="md" sx={{ gridColumn:"2 / 16", gridRow:"1 / 10", width:"25%", height:"15%", opacity:"75%", color:"#fd0", borderLeft:".45vh dashed #fd0", }} >Bank-Cards</Badge>

            <Group p="xl" spacing="xl" align="center" sx={{ gridColumn:"2 / 16", gridRow:"12 / 20", }} >

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" style={{  }} >
                <BrandMastercard size="75%" color="#fd0" />
              </Avatar>

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" style={{ }} >
                <BrandMastercard size="75%" color="#fd0" />
              </Avatar>

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" style={{ }} >
                {/* <LetterV size="75%" color="#fd0" /> */}
                <div style={{ border:".55vh solid #fd0", borderRadius:theme.radius.sm*1.5, padding:"0% 15%", transform:"scale(80%, 60%)", }} >
                  <span style={{ color:"#fd0", }} >V</span>
                </div>
              </Avatar>

            </Group>
            
            <div style={{ zIndex:"2", gridColumn:"16 / 25", gridRow:"1 / 8", marginTop:"-10%", width:"100%", height:"400%", opacity:"100%", backgroundImage:"url(/svgs/home/payment_SBg1.svg)", backgroundRepeat:"no-repeat", objectFit:"cover", }} >
              {/* <img src="/svgs/home/payment_SBg1.svg" style={{ zIndex:"1", width:"30vw", position:"relative", }} ></img> */}
              <img src="/imgs/home/3D/CreditCards_3d.png" width={"100%"} style={{ zIndex:"2", opacity:"85%", transform:"scale(55%)",  }} alt="CreditCards payment gateway svg" />
            </div>

          </section>


          <Divider size="lg" variant="dashed" color={theme.colors.violet[9]} style={{ zIndex:"0", opacity:.075, width:theme.spacing.xl*30, marginTop:".75%", transform:"rotate(-30deg) translate(-2.75%, 0%)", }} />

          
          <section dir="rtl" style={{ height:"55vh", width:"100%", marginTop:"2.75%", display:"grid", gridTemplateColumns:"repeat(24, 1fr)", gridTemplateRows:"repeat(24, 1fr)", }} >
            
            
            <div dir="ltr" style={{ gridColumn:"1 / 17", gridRow:"8 / 12", }} >

              <Text ml="25%" weight={750} style={{ gridColumn:"2 / 17", gridRow:"8 / 12", fontSize: "3.25vw", }} >We accept 
                <span> </span>

                <HomeAnimatedTxt
                  txt={[
                    "BTC ", "LTC ", "ETH ", "USDT ",
                  ]}
                  txtStyle={{ color:"#fd0", fontSize: "2.75vw", fontWeight:"750", fontStyle: "normal", textShadow:`.15vh .25vh .45vh ${theme.black}` }}
                  config={{
                    cursorShape: "Currency",
                    loopTime: -1,
                  }}
                />

                {/* Crypto */}
              </Text>

            </div>


            <Badge size="lg" color={theme.colors.violet[6]} radius="md" sx={{ gridColumn:"9 / 22", gridRow:"3 / 13", width:"30%", height:"15%", opacity:"75%", color:"#fd0", borderLeft:".45vh dashed #fd0", }} >
              Crypto Currencies
            </Badge>

          
            <Group p="xl" spacing="xl" align="center" sx={{ gridColumn:"8 / 25", gridRow:"12 / 20", }} >

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" >
                {/* <LetterV size="75%" color="#fd0" /> */}
                <span style={{ color:"#fd0", fontSize:"1.75vw", }} >T</span>
              </Avatar>

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" >
                <CurrencyEthereum size="75%" color="#fd0" />
              </Avatar>

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" >
                <CurrencyLitecoin size="75%" color="#fd0" />
              </Avatar>

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" >
                <CurrencyBitcoin size="75%" color="#fd0" />
              </Avatar>

            </Group>


            <div style={{ zIndex:"2", gridColumn:"16 / 25", gridRow:"1 / 8", marginTop:"-10%", width:"100%", height:"400%", opacity:"96%", backgroundImage:"url(/svgs/home/payment_SBg1.svg)", backgroundRepeat:"no-repeat", objectFit:"cover", }} >
              {/* <img src="/svgs/home/payment_SBg1.svg" style={{ zIndex:"1", width:"30vw", position:"relative", }} ></img> */}
                <img src="/imgs/home/3D/CryptoCurrencies_3d.png" width={"100%"} style={{ zIndex:"2", opacity:"85%", transform:"scale(55%)", }} alt="Crypto Currencies payment method svg" />
            </div>

          </section>



          <Divider size="xl" variant="dashed" color={"#fd0"} style={{ zIndex:"0", opacity:.025, width:theme.spacing.xl*35, marginTop:".75%", transform:"rotate(30deg) translate(-2.75%, 0%)", }} />
          
          
          <section dir="ltr" style={{ height:"55vh", width:"100%", marginTop:"4.75%", display:"grid", gridTemplateColumns:"repeat(24, 1fr)", gridTemplateRows:"repeat(24, 1fr)", }} >
            
            <Text weight={750} style={{ gridColumn:"2 / 17", gridRow:"8 / 12", fontSize: "3.25vw", }} >We accept 
              {/* <Space /> */}
              <span> </span>
              <HomeAnimatedTxt
                txt={[
                  "WebMoney ", "QIWI ", "PM ", "More "
                ]}
                txtStyle={{ color:"#fd0", fontSize: "2.75vw", fontWeight:"750", fontStyle: "normal", textShadow:`.15vh .25vh .45vh ${theme.black}` }}
                config={{
                  cursorShape: "e-wallets",
                  loopTime: -1,
                }}
              />

              {/* Cards */}
            </Text>

            <Badge size="lg" color={theme.colors.violet[6]} radius="md" sx={{ gridColumn:"2 / 16", gridRow:"1 / 10", width:"25%", height:"15%", opacity:"75%", color:"#fd0", borderLeft:".45vh dashed #fd0", }} >
              E-Wallets
            </Badge>

            <Group p="xl" spacing="xl" align="center" sx={{ gridColumn:"2 / 16", gridRow:"12 / 20", }} >

              {/* <Avatar size="lg" color={theme.colors.violet[6]} radius="md" style={{ borderBottom:".25vh solid #fd0", }} >
                <LetterA size="55%" color="#fd0" style={{ transform: "translateX(10%)" }} />
                <LetterC size="55%" color="#fd0" style={{ transform: "translateX(-10%)", }} />
              </Avatar> */}

              {/* <Avatar size="lg" color={theme.colors.violet[6]} radius="md" style={{ borderBottom:".25vh solid #fd0", }} >
                <LetterP size="55%" color="#fd0" style={{ transform: "translateX(0%)" }} />
              </Avatar> */}

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" style={{ borderBottom:".25vh solid #fd0", }} >
                <LetterW size="55%" color="#fd0" style={{ transform: "translateX(10%)" }} />
                <LetterM size="55%" color="#fd0" style={{ transform: "translateX(-10%)"}} />
              </Avatar>

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" style={{ borderBottom:".25vh solid #fd0", }} >
                <LetterQ size="55%" color="#fd0" style={{ transform: "translateX(-10%)"}} />
                {/* <LetterI size="55%" color="#fd0" style={{ transform: "translateX(-10%)"}} /> */}
              </Avatar>

              <Avatar size="lg" color={theme.colors.violet[6]} radius="md" style={{ borderBottom:".25vh solid #fd0", }} >
                <LetterP size="55%" color="#fd0" style={{ transform: "translateX(10%)" }} />
                <LetterM size="55%" color="#fd0" style={{ transform: "translateX(-10%)"}} />
              </Avatar>


            </Group>
            
            <div style={{ zIndex:"2", gridColumn:"16 / 25", gridRow:"1 / 8", width:"100%", height:"400%", transform:"translateY(-10%)", opacity:"100%", backgroundImage:"url(/svgs/home/payment_SBg1.svg)", backgroundRepeat:"no-repeat", objectFit:"cover", }} >
              {/* <img src="/svgs/home/payment_SBg1.svg" style={{ zIndex:"1", width:"30vw", position:"relative", }} ></img> */}
              <img src="/imgs/home/3D/eWallet_3d.png" width={"100%"} style={{ zIndex:"2", opacity:"75%", transform:"scale(50%) translateY(5%) skew(-7.75deg)",  }} alt="E-Wallets payment method svg" />
            </div>

          </section>




        </Box>

        <Divider size="sm" variant="dashed" color={theme.colors.violet[9]} style={{ zIndex:"0", opacity:.25, width:"98%", margin:"0 auto", transform:"translateY()", marginTop:".25%" }} />



        {/* #__SECTION__5 : */}


        <Box component='section' p="xl" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", }} >

          <Badge mb="xl" size='xl' style={{  }} >Important links 🔗 </Badge>

          <Group mt="xl" mb="xl" align="center" spacing="xl" >

            {/* <NextLink href="/about" >
              <Button variant="subtle" style={{ backgroundColor:theme.colors.dark[6] }} >
                About us
              </Button>
            </NextLink> */}

            <NextLink href="/about/faq" >
              <Button variant="subtle" style={{ backgroundColor:theme.colors.dark[6] }} >
                Q & A
              </Button>
            </NextLink>

            <NextLink href="/terms-of-service" >
              <Button variant="subtle" style={{ backgroundColor:theme.colors.dark[6] }} >
                Terms of Service
              </Button>
            </NextLink>

            <NextLink href="/polices/privacy-policy" >
              <Button variant="subtle" style={{ backgroundColor:theme.colors.dark[6] }} >
                Privacy Policy
              </Button>
            </NextLink>


            <NextLink href="/affiliate-program" >
              <Button variant="subtle" style={{ backgroundColor:theme.colors.dark[6] }} >
                Affiliate program
              </Button>
            </NextLink>


            {/* <NextLink href="/support/chat" >
              <Button variant="subtle" style={{ backgroundColor:theme.colors.dark[6] }} >
                Support Chat
              </Button>
            </NextLink> */}

            
          </Group>

        </Box>




        {/* #__SECTION__6 : */}



      </ScrollArea>

    </Fragment>
  )
}

export default Home;
