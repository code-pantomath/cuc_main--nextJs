import { CSSProperties, FC, Fragment } from "react"

import { Button, ButtonVariant, Card, Divider, MantineTheme, Text, } from "@mantine/core";


interface IAccountCard { 
  styles?: CSSProperties,
  btnStyles?: CSSProperties,
  theme: MantineTheme,

  picLetter: string,
  txtMain: string,
  txtSec?: string,
  btnTxt: string,
  btnIcon: JSX.Element,
  btnVariant?: ButtonVariant,
  btnFunc: Function,

//   session?: Session,
};


const AccountCard: FC<IAccountCard> = ({ children, styles, btnStyles, theme, picLetter, txtMain, txtSec, btnTxt, btnIcon, btnVariant, btnFunc, }) => {



    return (
        <Fragment>

            <Card shadow="sm" p="xl" withBorder style={{ width:"18%", height: "100%", borderTop:`.25vh solid ${theme.colors.violet[6]}`, overflow:"hidden", ...styles, }} >

                <Card.Section pt="xl" >

                    <div style={{ display:"flex", margin:"0 auto", alignItems:"center", justifyContent:"center", fontSize:"4vh", color:"#fd0", backgroundColor:theme.colors.violet[6], width:"25%", border:".25vh dotted #fd0", borderRadius:"100%", transform:"scale(125%)", overflow:"hidden", }} >
                        {picLetter || ""}
                    </div>

                </Card.Section>

                <Divider variant="dashed" style={{opacity:.25, color:"#fd0", margin:"10% 0"}} />

                <Card.Section>

                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"15%", }} >
                        <Text style={{fontSize:"2vh"}} >{txtMain || ""}</Text>
                        <Text style={{fontSize:"1.45vh", opacity:.25}} >{txtSec || ""}</Text>
                    </div>

                </Card.Section>

                <Card.Section>

                    <div style={{ marginTop:"15%", marginBottom:"1%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:"100%", height:"100%" }} >
                        <Button onClick={():any => btnFunc()} variant={btnVariant || "default"}  style={{ width: "75%", color:"#fd0", backgroundColor:(!(btnVariant==="outline") ? theme.colors.violet[9] : "none") }} rightIcon={btnIcon} >
                            {btnTxt}
                        </Button>
                    </div>

                </Card.Section>


                {
                    children && <Card.Section>{children}</Card.Section>
                }


            </Card>

        </Fragment>
    )

};

export default AccountCard;