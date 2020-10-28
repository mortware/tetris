import React from 'react';
import Cell from './Cell';
import { STAGE_HEIGHT, STAGE_WIDTH } from '../gameHelpers';

const Stage = ({ stage }) => {
    let cells = stage.map(row => row.map((cell, x) =>
        <Cell key={x} type={cell[0]} />
    ));

    return (
        <div className="stage" style={{
            gridTemplateRows: `repeat(${STAGE_HEIGHT}, calc(25vw / ${STAGE_WIDTH})`,
            gridTemplateColumns: `repeat(${STAGE_WIDTH}, 1fr)`,
        }}>
            {cells}
        </div>
    )
}

export default Stage;