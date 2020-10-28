import React from 'react';

const StartButton = ({ callback }) => {
    return (
        <div className="start-button" onClick={callback}>
            Start Game
        </div>
    )
}

export default StartButton;