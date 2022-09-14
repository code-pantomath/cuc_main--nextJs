import { CSSProperties, FC } from "react"

import { Badge, Button, Text, Card, Group, useMantineTheme, Divider } from "@mantine/core";
import Image from "next/image";


interface IFeatureCard {
    imgConfig?: {
        src: string,
        alt: string,
        opacity?: number | string,
        style?: CSSProperties,
    },
    badgeConfig?: {
        content: string,
        color?: string,
        style?: CSSProperties,
    },
    titleTxtConfig?: {
        content: string,
        style?: CSSProperties,
    },
    txtConfig?: {
        content: string,
        style?: CSSProperties,
    },
    btnConfig?: {
        content: string,
        txtColor?: any,
        isFullWidth?: boolean,
        style?: CSSProperties,
    },
    isBtnVisible?: boolean,

    cardStyle?: CSSProperties,
    cardContainerStyle?: CSSProperties,

};


const FeatureCard: FC<IFeatureCard> = ({ children, imgConfig, badgeConfig, txtConfig, titleTxtConfig, btnConfig, cardStyle, cardContainerStyle, isBtnVisible,  }) => {

    const theme = useMantineTheme();


    return (
        <div style={{ width:"25%", borderBottom:`.45vh solid ${theme.colors.violet[6]}`, borderRadius: "2.75%", ...cardContainerStyle, }} >
            <Card shadow="lg" p="lg" style={{ width:"100%", height:"100%", ...(cardStyle || {})}} sx={{ ":hover": { transform: "translateY(-2.5%)", transition:"transform .25s linear" }, ":not(:hover)":{ transition:"transform .15s linear" }, }} >

                <div style={{ zIndex:0, position:"absolute", width:"100%", height:"100%", opacity:.075, objectFit:"cover", backgroundImage:"url(/imgs/home/2D/CardBg.png)", backgroundRepeat:"no-repeat", backgroundSize:"90%", transform: "scale(120%)", }} >
                    <span/>{/* <Image src={"/imgs/home/CardBg.png"} width={"100%"} height={"100%"} alt={"Feature bg Card Image."} style={{ zIndex:0, objectFit: "cover", opacity: (.15 || imgConfig?.opacity), position:"absolute", ...(imgConfig?.style || {}) }} /> */}
                </div>


                <Card.Section style={{ display:"flex", alignItems:"center", justifyContent: "center", position:"relative", }} >
                    <Image loading="lazy" layout="intrinsic" src={imgConfig?.src as string} width={"250%"} height={"125%"} alt={imgConfig?.alt || "Feature Card Image."} style={{ zIndex:2, marginBottom:"4.75%", opacity: (.75 || imgConfig?.opacity), filter: "blur(.55px) contrast(115%) brightness(105%)", transform:"scaleY(150%) scaleX(75%)", ...(imgConfig?.style || {}) }} />
                </Card.Section>

                <Divider color={theme.colors.violet[9]} variant="dashed" size="sm" />

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm, }}>
                    <Text weight={500} style={{ color:"#fd0", ...titleTxtConfig?.style}} >{titleTxtConfig?.content || ""}</Text>
                    
                    <Badge color={badgeConfig?.color || theme.colors.violet[6]} variant="light" size="lg" style={{ fontSize: theme.fontSizes.md, color: "#fd0", ...badgeConfig?.style, }} >
                        {badgeConfig?.content || "💫"}
                    </Badge>
                </Group>

                <Text size="sm" mt="md" style={{ color: theme.colors.gray[4], lineHeight: 1.5, fontSize:"80%", opacity:.80, ...badgeConfig?.style }}>
                    {txtConfig?.content}
                    <br/>
                </Text>

                {
                    isBtnVisible && (
                        <Button variant="light" color={btnConfig?.txtColor || theme.colors.violet[9]} fullWidth={btnConfig?.isFullWidth || true} style={{ marginTop: 15, opacity: .96, display: isBtnVisible?"inline-block":"none", ...btnConfig?.style, }}>
                            {btnConfig?.content}
                        </Button>
                    )
                }
                
            </Card>
        </div>
    )
}

export default FeatureCard;