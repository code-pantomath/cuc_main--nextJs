import { useState } from 'react'
import type { NextPage } from 'next'

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Divider,
  ScrollArea,
  Button,
  Group,
} from '@mantine/core';
import { Apps, Logout, Message2, QuestionMark, SmartHome, UserCheck, UserCircle, UserPlus, Wallet } from 'tabler-icons-react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import Link from 'next/link'



interface MainAppShell_Interface {
  navOpened: boolean,
}


const MainAppShell: NextPage<MainAppShell_Interface> = ({ children, navOpened, }) => {

  const router = useRouter();
  const [session, isSessionLogging] = useSession();


  const theme = useMantineTheme();
  const [opened, setOpened] = useState(navOpened);


  const navBarDisplayVal:string = opened ? "flex" : "none";

  const mainShellNavSecBtnsColor:string = theme.colorScheme === "dark" ? theme.white : theme.black

  // del// console.log(session, isSessionLogging);


  if (session && (router.asPath.toLowerCase() === "/sign/in" || router.asPath.toLowerCase() === "/sign/up")) router.replace("/");
  if (!session && (router.asPath.toLowerCase() === "/sign/out")) router.replace('/');

  

  return (

    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}

      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed


      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" style={{ display: navBarDisplayVal, }} fixed width={{ sm: 150, lg: 200 }} >


          {/* <Text>Application navbar</Text> */}
          
          <Navbar.Section>

            <Button fullWidth onClick={() => session ? router.push("/support/chat") : window.open(`/support/chat`, "_blank")} variant='gradient' gradient={{ from: theme.colors.violet[6], to: theme.colors.violet[9] }} rightIcon={<Message2 color="#fd0" />} >
              Support Chat
            </Button>

          </Navbar.Section>


          <Divider my="xs" />


          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs" >

          <Button disabled={!!session} my="md" onClick={() => router.push("/sign/up")} leftIcon={<UserPlus size={20} color="#fd0" />} fullWidth sx={(t) => (
            { opacity:.95, backgroundColor: "transparent", color: mainShellNavSecBtnsColor, borderColor: theme.colors.violet, '&:hover': { color: "#fd0" }, }
          )} >
            Sign Up
          </Button>

          <Button my="md" onClick={() => router.push(`/sign/${session?"out":"in"}`)} leftIcon={!session ? <UserCheck size={20} color="#fd0" /> : <Logout size={20} color="#fd0" />} fullWidth sx={(t) => (
            { opacity:.95, backgroundColor: "transparent", color: mainShellNavSecBtnsColor, borderColor: theme.colors.violet, '&:hover': { color: "#fd0" }, }
          )} >
            Sign {session ? "out" : "in"}
          </Button>

          <Button onClick={() => router.push("/")} my="md" leftIcon={<SmartHome size={20} color="#fd0" />} fullWidth styles={{ leftIcon: { transform: "translate(-27%, 0%)" } }} sx={(t) => (
            { opacity:.95, backgroundColor: "transparent", color: mainShellNavSecBtnsColor, borderColor: theme.colors.violet, '&:hover': { color: "#fd0" }, }
          )} >
            Home
          </Button>

          <Button disabled={!session} onClick={() => router.push("/account")} my="md" leftIcon={<UserCircle size={20} color="#fd0" />} styles={{ leftIcon: { transform: "translate(15%, 0%)" } }} fullWidth color="violet" sx={(t) => (
            { opacity:.95, backgroundColor: "transparent", color: mainShellNavSecBtnsColor, borderColor: theme.colors.violet, '&:hover': { color: "#fd0" }, }
          )} >
            Account
          </Button>

          <Button disabled={!session} onClick={() => router.push("/account/wallet")} my="md" leftIcon={<Wallet size={20} color="#fd0" />} fullWidth sx={(t) => (
            { opacity:.95, backgroundColor: "transparent", color: mainShellNavSecBtnsColor, borderColor: theme.colors.violet, '&:hover': { color: "#fd0" }, }
          )} >
            Wallet
          </Button>

          <Button my="md" onClick={() => router.push("/app")} leftIcon={<Apps size={20} color="#fd0" />} styles={{ leftIcon: { transform: "translate(-20%, 0%)" } }} fullWidth sx={(t) => (
            { opacity:.95, paddingRight:"17%", backgroundColor: "transparent", color: mainShellNavSecBtnsColor, borderColor: theme.colors.violet, '&:hover': { color: "#fd0" }, }
          )} >
            App
          </Button>


          </Navbar.Section>


          <Divider mt="md" mb="md" />

          <Button onClick={() => router.push("/about/faq")} variant="outline" sx={{ opacity:.75, }} rightIcon={<QuestionMark size={22} />} >
            <span style={{color:"#fd0"}} >FAQ</span>
          </Button>


          <Navbar.Section>

          </Navbar.Section>


        </Navbar>
      }

    //   aside={
    //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
    //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
    //         <Text>Application sidebar</Text>
    //       </Aside>
    //     </MediaQuery>
    //   }

      header={
        <Header fixed={false} height={70} p="md" >
          <div style={{width:"100%", height:"100%", position:"absolute", padding:0, margin:0, background:"transparent", transform:"translate(-.75%, -22%)", zIndex:100}} />

          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text size="lg" ml="xs" color={theme.colors.violet[6]} >CheapUdemy<span style={{ color: "#fd0"||theme.colors.violet[6], fontSize:"2vh", }} ><span style={{color:"#fff"}} >.</span>com</span> </Text>
          
            <div style={{ height:"175%", width:"4.25%", transform:"scale(125%) translate(25%, 5%)", justifySelf:"center", margin:"0 43%", opacity:.65, }} >
              <img alt={`${process.env.WEBSITE_DOMAIN_NAME} website logo`} src="/imgs/general/CheapUdemyLogo_01.png" style={{ width:"100%", height:"100%" }} />
            </div>
          
          </div>
        </Header>
      }

      footer={
        <Footer height={40} p="md" >
          

          <Group sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", }} >


            <Group align='center' spacing="lg" sx={{ transform:"translateY(-35%)", opacity:.75, color:theme.colors.violet[3], }} >

              {/* <Link href="/about/faq" >
                <Text size="sm" weight={10} sx={{ cursor:"pointer", ":hover":{ opacity:.45, }, }} >FAQ</Text>
              </Link> */}

              <Link href="/terms-of-service" >
                <Text size="sm" weight={10} sx={{ cursor:"pointer", ":hover":{ opacity:.45, }, }} >Terms of Service</Text>
              </Link>

              <Link href="/polices/privacy-policy" >
                <Text size="sm" weight={10} sx={{ cursor:"pointer", ":hover":{ opacity:.45, }, }} >Privacy Policy</Text>
              </Link>

            </Group>


            <Group sx={{ transform:"translate(102.25%, -35%) scale(90%)", opacity:.55, filter:"grayscale(45%)" }} >

              <img src="/svgs/general/visa.svg" style={{ width:"2.5rem", height:"1.25rem" }} alt="Visa card svg" />
              <img src="/svgs/general/mastercard.svg" style={{ width:"2.5rem", height:"1.25rem" }} alt="MasterCard svg" />
              <img src="/svgs/general/mir.svg" style={{ width:"2.5rem", height:"1.25rem", transform:"scale(125%)" }} alt="MIR Card svg" />
              <img src="/svgs/general/unionpay.svg" style={{ width:"2.5rem", height:"1.25rem", transform:"scale(111%)" }}  alt="UnionPay svg" />

            </Group>


            <Group align='center' spacing="lg" style={{ opacity:.9, color:theme.colors.violet[6], fontStyle:"italic", fontWeight:"75", transform:"translateY(-35%)", }} >

              <Text>Support<span style={{color:"#fd0",opacity:.75}} >@</span>cheapudemy.com</Text>
              <span style={{color:"#fd0",opacity:.75}} >|</span>
              <Text>Contact<span style={{color:"#fd0",opacity:.75}} >@</span>cheapudemy.com</Text>

            </Group>


          </Group>


        </Footer>
      }

      
    >

      {/* App page contents here... */}
      {
        children
      }


    </AppShell>

  )
}

export default MainAppShell;
