import React, {useEffect, useState} from "react";
import "../css/BurgerButton.css";

const BurgerButton = () => {
    const burgerClassNameInitialState = "nav-burger";

    const [isOpen, setIsOpen] = useState(false);
    
    const [burgerClassName, setBurgerClassName] = useState(burgerClassNameInitialState);

    useEffect(() => {
        if (isOpen) {
            setBurgerClassName([burgerClassNameInitialState, "open"].join(" "));
        } else {
            setBurgerClassName(burgerClassNameInitialState);
        }
    }, [isOpen]);

    return (
        <div className={burgerClassName} onClick={() => setIsOpen(!isOpen)}>
            <div className="nav-burger-lines"/>
        </div>
    );
};

export default BurgerButton;