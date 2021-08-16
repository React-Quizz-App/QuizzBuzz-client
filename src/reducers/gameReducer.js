const initState = {
    gameState: {},
}

const gameReducer = (state=initState, action) => {
    switch(action.type) {
        case 'CREATE_GAME':
            return action.payload;
        default:
            return state;
    }
}

export default gameReducer ;