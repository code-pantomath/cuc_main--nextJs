import { FC, CSSProperties, } from "react";


const CardBgShape: FC<{ styles?:CSSProperties, }> = ({ styles }) => {
    return (
        <div style={{ position: 'absolute', zIndex:0, width: "25%", opacity:"10%", transform:"translate(-19.8%, .75%) scaleY(135%) scaleX(155%)", ...styles }} >
            <img src="/svgs/home/CardBgShapeSVGCompo.svg" alt="Background svg" />
        </div>
    );
}


export default CardBgShape;