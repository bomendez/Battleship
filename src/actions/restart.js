import { RESTART } from "./constants"

export const restart= (isFreePlay) => {
    return {
        type: RESTART,
        payload: {
            isFreePlay: isFreePlay,
        }
    }
}