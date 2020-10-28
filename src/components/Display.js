import React from 'react';

const Display = ({ gameOver, text }) => {
    return (
        <div className={`display ${gameOver ? "gameover" : ""}`}>
            {text}
        </div>
    )
}

export default Display;