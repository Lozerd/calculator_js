import React, {forwardRef, Ref} from "react";
import {ShadowBoxProps} from "../common/types";

const ShadowBox = forwardRef(({style}: ShadowBoxProps, shadowBoxRef: Ref<HTMLDivElement>) => {
    return (
        <div ref={shadowBoxRef} className="shadow__box" style={style}/>
    );
});

ShadowBox.displayName = "ShadowBox";

export default ShadowBox;