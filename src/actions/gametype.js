import { SET_GAME_TYPE } from "./constants"

export const setGameType= (gameType) => {
    return {
        type: SET_GAME_TYPE,
        payload: {
            gameType: gameType
        }
    }
}