import { CSSProperties, FC } from "react"

import { Box, useMantineTheme } from "@mantine/core";
import Image from "next/image";


interface IEItemImgBox { 
  styles?:any,
  uri:string,
  name:string,
  idx:number,
  boxClassName?: string,
  imgClassName?: string,
};


const ItemImgBox: FC<IEItemImgBox> = ({ children, styles, uri, name, idx, boxClassName, imgClassName }) => {

  const theme = useMantineTheme();


  const stylesObj: CSSProperties = {
    boxShadow: `.15vh .25vh 1.75vh .45vh ${theme.black}`,
    transform: `skew(-2.75deg, -0.75deg) rotate(-45deg)`,
    margin: theme.spacing.sm,
    overflow: "hidden",
    // opacity: .96,
  }


  return (
    <Box className={(++idx)%2!==0?boxClassName:boxClassName} style={{...stylesObj, zIndex:(++idx), borderTop:`.75vh solid ${theme.colors.violet[9]}`, borderBottom:`.45vh solid #fd0`, borderRadius: theme.radius.lg, ...styles, }} >
      <Image className={(++idx)>2?imgClassName:' '} width={"250vw"} height={"250vh"} sizes="75%" layout="responsive" loading="lazy" alt={name} style={{ filter:"blur(.75px)", transform:`rotate(${(++idx)>3?'90':'0'}deg)`, opacity: .96, }} src={uri} />
      {children}
    </Box>
  )
};

export default ItemImgBox;