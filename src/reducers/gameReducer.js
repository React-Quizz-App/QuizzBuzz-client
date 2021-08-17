const initState = {
    gameState: {},
    socket: {},
    user: ""
}

const gameReducer = (state=initState, action) => {
    switch(action.type) {
        case 'CREATE_GAME':
            return {...state, 
                gameState: action.payload};
        case 'STORE_SOCKET':
            return {...state, 
                socket: action.payload};
        case 'STORE_USER':
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

export default gameReducer ;