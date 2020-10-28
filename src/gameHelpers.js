export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
    return Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )
}

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            // 1. Check for tetromino cell
            if (player.tetromino[y][x] !== 0) {

                if (
                    !stage[y + player.pos.y + moveY] || // 2. Check movement is inside stage (y)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] || //3. Check movement is inside stage (x)
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear' // 4. Check the cell we're movement isn't clear
                ) {
                    return true;
                }
            }
        }
    }
}