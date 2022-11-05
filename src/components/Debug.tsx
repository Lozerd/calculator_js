import React from "react";
import {DEBUG} from "../App";

interface IDebugProps {
    objectToDebug: any
}

const Debug = ({objectToDebug}: IDebugProps) => {
    return (
        <div>
            {DEBUG ? objectToDebug : null}
        </div>
    );
};

export default Debug;