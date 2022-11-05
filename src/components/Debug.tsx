import React, {useEffect} from "react";
import {DEBUG} from "../App";

interface IDebugProps {
    objectToDebug: any,
    makeLogs?: boolean
}

const Debug = ({objectToDebug, makeLogs = false}: IDebugProps) => {

    useEffect(() => {
        if (makeLogs) {
            console.log(objectToDebug);
        }
    }, [makeLogs, objectToDebug]);

    return (
        <div>
            {DEBUG ? objectToDebug : null}
        </div>
    );
};

export default Debug;