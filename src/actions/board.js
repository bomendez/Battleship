import { BOARD_CLICK } from "./constants"

export const boardClick= (row, col, enemy, hit, miss, unselected) => {
    return {
        type: BOARD_CLICK,
        payload: {
            row: row,
            col: col,
            enemy: enemy,
            hit: hit,
            miss: miss,
            unselected: unselected
        }
    }
}