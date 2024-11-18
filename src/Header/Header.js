import React from "react";

const Header = ({handleStart, handleRestart,time, fastestTime}) => { // we destruct the props and define the stateVariables and functions here in place of "props"
    return ( 
        <>
        <h1> Match the Pairs</h1>
        <h2> Current time: {time} seconds</h2>
        <h1> Fastest Time: {fastestTime !== null ? `${fastestTime} seconds` : "N/A"}</h1>
        <button onClick={handleStart}> Start the Game</button>
        <button onClick={handleRestart}>Restart</button>
        </>
    )

}

export default Header;