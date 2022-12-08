import { Fragment, useEffect, useState } from 'react'
import type { NextPage } from 'next';

import { useSession } from "next-auth/client";


import {
  useMantineTheme,
  Button,
  Box,
  Paper,
  Notification,
  Transition,
  Group,
  TextInput,
  Checkbox,
  Modal,
} from '@mantine/core';
import { At, Check, Lock as LockICON, LockAccess, UserCircle, X, } from 'tabler-icons-react';

import styles from "../../styles/css/sign.module.css";
import { useForm } from '@mantine/form';

import { useRouter } from 'next/router';
import contacts from '../../contacts/contacts';
import axios, { AxiosError } from 'axios';
import { IUserLoginAPIData, IUserRegisterAPIData } from '../../contacts/interfaces/Interfaces';
import Head from 'next/head';


////


interface IValidators {
  signUp: { 
    [key:string]:((value:string, values?:any) => string|null) 
  }

  signIn: { 
    [key:string]:((value:string, values?:any) => string|null) 
  }

}

type signError = {
  title: string,
  detail: string,
  traceId?: string,
  status?: string,
}


////


////

////


const sign: NextPage = (theProps) => {
  const props = theProps as any;


  const router = useRouter();
  const [session, isAuthSessionLoading] = useSession();
  const theme = useMantineTheme();


  const route_:string|string[]|undefined = router.query.index;
  const [route, setRoute] = useState<typeof route_>(route_);
  const isSignUp:boolean = route === "up" && typeof route !== "undefined";

  const [isNotiShown, setIsNotiShown] = useState<boolean>(false);

  const [ipAddress, setIpAddress] = useState<string>("");



  useEffect(() => {
    (
      async () => {
        const ip = await contacts.API.GetUserIpAdress();
        setIpAddress(() => ip);
      }
    )();
  }, [])


  useEffect(() => {
    const _route:string|undefined = router.query.index?.toString().trim().toLowerCase();
    setRoute(_route);

    ((_route !== "up" && _route !== "in" && _route !== "out") && typeof _route !== "undefined") && router.replace("/");

  }, [route_]);



  const [userRegistrationDataRes, setUserRegistrationDataRes] = useState<IUserRegisterAPIData>();
  const [userLogInDataRes, setUserLogInDataRes] = useState<IUserLoginAPIData>();
  const [signErr, setSignErr] = useState<signError>();

  useEffect(():any => userRegistrationDataRes && setTimeout(() => router.push("/sign/in"), 2.75 * 1000), [userRegistrationDataRes]);


  //// SIGN_UP LOGIC CODE STARTS : /////

  const vailadators:IValidators = {

    signUp: {

      email: (val, vals) => (
        !(/^\S+@\S+$/.test(val)) ? 'Invalid email' :
        !(val.length <= 45) ? "Email address text must not contain more than 45 characters!"
        :null
      ),

      pswd: (val, vals) => (
        !(/^(?=.*[a-z]).{8,}$/.test(val) ) ? "Password must have at leats 8 characters!" :
        !(val.length <= 32) ? "Password must not contain more than 32 characters!" :
        !(val.split("").some(char=>(+char)-(+char)===0) && val.split("").some(char=>(+char)-(+char)!==0)) ? "The password must contain both letters and numbers!" 
        : null
      ),

      repeat_pswd: (val, vals) => (
        val === vals.pswd ? null : "The passwords are not Identical!"
      ),

    },

    signIn: {

      email: (val, vals) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),

      pswd: (val, vals) => (
        !(/^(?=.*[a-z]).{8,}$/.test(val) ) ? "Password must have at leats 8 characters!" : 
        !(val?.split("").some(char=>(+char)-(+char)===0)) ? "The password must contain both letters and numbers!" : null
      ),

    },

  }



  const Form_SignUp = useForm({

    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      pswd: '',
      repeat_pswd: "",
      termsOfService: true,

      // ip: ipAddress,
    },

    validate: {
      email: vailadators.signUp.email,
      pswd: vailadators.signUp.pswd,
      repeat_pswd: vailadators.signUp.repeat_pswd,
    },


  });

  // Form_SignUp.setFieldValue("ip", (async () => await axios.get("/api/UserInfo/ip"))() as unknown as string)

  //// SIGN_UP LOGIC CODE ENDS . /////


  // ******************************** //


  //// SIGN_IN LOGIC CODE STARTS : /////

  const Form_SignIn = useForm({

    initialValues: {
      email: userRegistrationDataRes?.email || "",
      pswd: userRegistrationDataRes?.password || "",
      termsOfService: false,

      // ip: ipAddress,
    },

    validate: {
      email: vailadators.signIn.email as any,
      pswd: vailadators.signIn.pswd as any,
    },


  });

  useEffect(() => {
    userRegistrationDataRes && Form_SignIn?.setValues(vals => ({...vals, email: userRegistrationDataRes?.email, pswd: userRegistrationDataRes?.password, }));
  }, [userRegistrationDataRes]);

  //// SIGN_IN LOGIC CODE ENDS . /////

  
  
  async function SubmitForm_EV (values: (typeof Form_SignUp.values | typeof Form_SignIn.values)) {
    
    if (isSignUp) {

      try {

        const res = await contacts.API.RegisterUser(values as unknown as IUserRegisterAPIData)
        .catch((err: AxiosError | Error) => {
          if (axios.isAxiosError(err)) {
            // // del// console.log((err.response?.data as signError)?.detail);
            const { title, detail } = err.response?.data as signError;
            setSignErr(() => ({ title, detail, }));
            setTimeout(() => setSignErr(undefined), 2.75 * 1000)
            
          }
          else {
          }
        })
        ;
        console.log(res)
        setUserRegistrationDataRes(res as IUserRegisterAPIData);

        if (res?.email) {
          setIsNotiShown(true);
          setTimeout(() => setIsNotiShown(false), 2.75 * 1000);
        }


      } catch (err) {
        // del// console.log(err);
      }


    } else {

      try {
        const res = await contacts.API.LoginUser(values as unknown as IUserLoginAPIData)
        .catch((err: AxiosError | Error) => {
          if (axios.isAxiosError(err)) {
            const { title, detail } = err.response?.data as signError;
            setSignErr(() => ({ title, detail, }));
            setTimeout(() => setSignErr(undefined), 2.75 * 1000)
          }
        })
        ;

        setUserLogInDataRes(res as IUserLoginAPIData);

        if (res?.email) {

          const loggingRes = await contacts.CLIENT.LoginUser(res);

          if (loggingRes) {

            setIsNotiShown(true);
            setTimeout(() => setIsNotiShown(false), 2.75 * 1000);

            setTimeout(() => router.reload(), 3000);

          } else {
            setTimeout(async () => await SubmitForm_EV(Form_SignIn.values), 1000);
          }

        }

      } catch (err) {
        // del// console.log(err);
      }

    }

  }




  return ((isSignUp || route_ !== "out") && !(!!session)) ? (
    <Fragment>

      <Head>
        <title>Sign {route_} | {process.env.WEBSITE_DOMAIN_NAME}</title>
        <meta name="description" content={`Sign ${route_} to ${process.env.WEBSITE_DOMAIN_NAME}`} />
      </Head>



      <Transition mounted={Boolean(signErr)} transition="slide-left" >
        {
          (styles) => (
            <Notification style={{ position:"absolute", right:"1.5%", width:"25%", ...styles, }} title={signErr?.title} icon={<X size={18} />} color="red">
              {signErr?.detail}
            </Notification>
          )
        }
      </Transition>

      <Transition mounted={(typeof signErr === "undefined" && (!!userRegistrationDataRes || !!userLogInDataRes) && isNotiShown)} transition="slide-left" >
        {
          (styles) => (
            <Notification style={{ position:"absolute", right:"1.5%", width:"25%", ...styles, }} title={`Congrats ${(userLogInDataRes || userRegistrationDataRes)?.firstName} ${(userLogInDataRes || userRegistrationDataRes)?.lastName} ! 🥳 `} icon={<Check size={18} />} color="green" >
              {`You have ${
                userLogInDataRes && !userLogInDataRes ? "registered" :
                userLogInDataRes ? "logged in" : ""
              } successfully as '${(userRegistrationDataRes || userLogInDataRes)?.email}' `}
            </Notification>
          )
        }
      </Transition>


      <Paper className={styles.signUpFormBoxContainer} shadow="sm" sx={{ opacity:Number(isSignUp)+1, }} style={{ borderColor:!isSignUp?"#fd0":theme.colors.violet[9], }} >

        <Box sx={{ maxWidth: 300 }} mx="auto" >
          
          <form onSubmit={(isSignUp ? Form_SignUp : Form_SignIn).onSubmit(SubmitForm_EV)}
          
          >


            { isSignUp &&
              <TextInput
                icon={<UserCircle size={18} color="#fd0" opacity={.45} />}
                required
                label="First name"
                placeholder="your first name"
                {...Form_SignUp.getInputProps('firstName')}
                className={styles.signUpFormTextInput}
                style={{marginTop:"2.5%"}}
              />
            }

            { isSignUp &&
              <TextInput
                icon={<UserCircle size={18} color="#fd0" opacity={.45} />}
                required
                label="Last name"
                placeholder="your last name"
                {...Form_SignUp.getInputProps('lastName')}
                className={styles.signUpFormTextInput}
              />
            }
            
            <TextInput
              icon={<At size={18} color="#fd0" opacity={.45} />}
              required
              label="Email"
              placeholder="your@email.com"
              {...(isSignUp ? Form_SignUp.getInputProps('email') : Form_SignIn.getInputProps('email'))}
              className={styles.signUpFormTextInput}
              style={{marginBottom:"10%"}}

              onChange={(e) => {
                if (isSignUp) {
                  Form_SignUp.setFieldValue("email", e.currentTarget.value);
                } else {
                  Form_SignIn.setFieldValue("email", e.currentTarget.value);
                }
              }}
            />

            <TextInput
              icon={<LockICON size={18} color="#fd0" opacity={.45} />}
              required
              label="Password"
              placeholder="your password"
              {...(isSignUp ? Form_SignUp.getInputProps('pswd') : Form_SignIn.getInputProps('pswd'))}
              className={styles.signUpFormTextInput}
              style={{marginBottom:"10%"}}

              type={!isSignUp ? "text" : "text"}
              onChange={(e) => {
                // // del// console.log(e.currentTarget.value);
                if (isSignUp) {
                  Form_SignUp.setFieldValue("pswd", e.currentTarget.value);
                } else {
                  Form_SignIn.setFieldValue("pswd", e.currentTarget.value);
                }
              }}
            />

            { isSignUp &&
              <TextInput
                required
                icon={<LockAccess size={18} color="#fd0" opacity={.45} />}
                label="Confirm password"
                placeholder="your password"
                {...Form_SignUp.getInputProps('repeat_pswd')}
                className={styles.signUpFormTextInput}
                style={{marginBottom:"10%"}}
              />
            }


            { isSignUp &&
              <Checkbox
                required
                mt="md"
                label="I agree to the terms of service"
                {...Form_SignUp.getInputProps('termsOfService', { type: 'checkbox' })}
              />
            }


            <Group position={isSignUp ? "right" : "center"} mt="md" >
              <Button type="submit" style={{ backgroundColor:!isSignUp ? "#fd0" : theme.colors.violet[9], }} >{isSignUp ? "Sign up" : "Sign in"}</Button>
            </Group>


          </form>

        </Box>

      </Paper>

    </Fragment>
  )


  :


  (
    <Fragment>

      { route_ === "out" &&
        <Modal
          className={styles.confirmGitfPurchaseModal}
          opened
          onClose={() => router.replace('/')}
          title="Are you sure? You want to sign out?"
          centered
        >
        
          <Group >

            <Button onClick={async () => {
              await contacts.CLIENT.LogoutUser();
              // router.reload();
            }} 
            >
              Yes, Confirm
            </Button>

            <Button variant='outline' onClick={() => router.replace('/')} >
              No, Cancel
            </Button>

          </Group>


        </Modal>
      }

    </Fragment>
  )


}



export default sign;
