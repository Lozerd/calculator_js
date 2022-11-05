import React, {useState} from "react";

interface ICalculatorBodyProps {
    children: React.ReactNode | React.ReactNode[]
}

const CalculatorBody = ({children}: ICalculatorBodyProps) => {
    const [offset, setOffset] = useState({x: 0, y: 0});


    function onDragStart(e: React.DragEvent<HTMLDivElement>) {
        // @ts-ignore
        setOffset({x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop});
    }

    function onDragEnd(e: React.DragEvent<HTMLDivElement>) {
        // @ts-ignore
        e.target.style.setProperty("--x", `${e.clientX - offset.x}px`);
        // @ts-ignore
        e.target.style.setProperty("--y", `${e.clientY - offset.y}px`);
    }

    return (
        <div className="calculator" draggable={true}
            onDragStart={e => onDragStart(e)}
            onDragEnd={(e) => onDragEnd(e)}
        >
            {children}
        </div>
    );
};

export default CalculatorBody;