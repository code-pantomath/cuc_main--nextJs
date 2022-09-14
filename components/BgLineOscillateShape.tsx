import { FC, CSSProperties, } from "react";


const BgLineOscillateShape: FC<{ styles?:CSSProperties, className?:string, }> = ({ styles, className, }) => {
    return (
        <div style={{ ...styles, }} >
            <img src="/svgs/home/BgLineOscillateShape_SVGCompo.svg" alt="Background svg" />
        </div>
    );
}


export default BgLineOscillateShape;