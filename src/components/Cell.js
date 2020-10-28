import React from 'react';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type }) => {

    let tetromino = TETROMINOS[type];

    return (
        <div className="cell" style={{
            background: `rgba(${tetromino.color}, 0.8)`,
            border: `${tetromino.type === 0 ? '0px solid' : '4px solid'}`,
            borderBottomColor: `rgba(${tetromino.color}, 0.1)`,
            borderRightColor: `rgba(${tetromino.color}, 1)`,
            borderTopColor: `rgba(${tetromino.color}, 1)`,
            borderLeftColor: `rgba(${tetromino.color}, 0.3)`,
        }} />
    )
}

export default React.memo(Cell);