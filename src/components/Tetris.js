import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';

import './_styles.scss';

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        let dest = { x: dir, y: 0 };
        if (!checkCollision(player, stage, dest))
            updatePlayerPos(dest);
    }

    const startGame = () => {
        // reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        // increase level/speed
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        let dest = { x: 0, y: 1, collided: false };
        if (!checkCollision(player, stage, dest)) {
            updatePlayerPos(dest);
        } else {
            if (player.pos.y < 1) {
                console.log("Game Over!")
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true })
        }

    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <div className="wrapper" role="button" tabIndex="0" onKeyUp={keyUp} onKeyDown={e => move(e)}>
            <div className="tetris">
                <Stage stage={stage} />
                <aside>
                    {gameOver
                        ? (
                            <div>
                                <Display gameOver={gameOver} />
                                <StartButton callback={startGame} />
                            </div>
                        )
                        : (
                            <div>
                                <Display text={`Score: ${score}`} />
                                <Display text={`Rows: ${rows}`}/>
                                <Display text={`Level: ${level}`} />
                                <StartButton callback={startGame} />
                            </div>
                        )
                    }
                </aside>
            </div>
        </div >
    );
};

export default Tetris