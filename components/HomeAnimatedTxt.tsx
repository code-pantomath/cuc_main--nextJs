import { CSSProperties, FC } from "react"

import { useMantineTheme } from "@mantine/core";

import { Typewriter } from 'react-simple-typewriter'


interface IHomeAnimatedTxt {
    txt: string | string[],
    txtStyle? : CSSProperties,
    config?: {
        loopTime?: number,
        cursorShape?: string,
        isCursorVisible?: boolean,
        typeSpeed?: number,
        deleteSpeed?: number,
        delaySpeed?: number,
        loopDoneEvent?: () => void,
        typingEvent?: () => void,
    },
}


const HomeAnimatedTxt: FC<IHomeAnimatedTxt> = ({ txt, txtStyle, config }) => {

    const theme = useMantineTheme();

    const handleType = (count: number): void => {
        // access word count number
        //// del// console.log(count)
    }

    const handleDone = (): void => {
        //// del// console.log(`Done after 5 loops!`)
    }

    txt = typeof txt === "string" ? txt.trim().split(' ') : txt;


    return (
        <span style={txtStyle} >
            <Typewriter 
                words={txt}
                loop={config?.loopTime || 10}
                cursor={config?.isCursorVisible || true}
                cursorStyle={config?.cursorShape || "|"}
                typeSpeed={config?.typeSpeed || 25}
                deleteSpeed={config?.deleteSpeed || 15}
                delaySpeed={config?.delaySpeed || 1750}
                onLoopDone={config?.loopDoneEvent || handleDone}
                onType={config?.typingEvent || handleType}
            />
        </span>
    )
}

export default HomeAnimatedTxt;