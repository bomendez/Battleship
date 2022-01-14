import { UPDATE_SCORE } from "./constants";

export const updateScore = (aiScore, playerScore, freePlayScore) => {
    return {
        type: UPDATE_SCORE,
        payload: {
            aiScore: aiScore,
            playerScore: playerScore,
            freePlayScore, freePlayScore,
        }
    }
}