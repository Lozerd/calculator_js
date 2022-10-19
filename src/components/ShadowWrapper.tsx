import React, {forwardRef, MouseEvent, Ref} from "react";
import PropTypes from "prop-types";

interface ShadowWrapperProps {
    children: PropTypes.ReactNodeArray | PropTypes.ReactNodeLike,
    mouseHandler: (event: MouseEvent<HTMLDivElement>) => void
}

const ShadowWrapper = forwardRef((
    {mouseHandler, children}: ShadowWrapperProps,
    shadowWrapperRef: Ref<HTMLDivElement>
) => {
    return (
        <div
            ref={shadowWrapperRef}
            className="shadow__wrapper"
            onMouseMove={mouseHandler}
            onMouseLeave={mouseHandler}>
            {children}
        </div>
    );
});

export default ShadowWrapper;