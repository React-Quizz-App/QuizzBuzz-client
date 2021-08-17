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
        case 'ADD_USER':
            let newUsersList = [...state.gameState.users];
            newUsersList.push({name: action.payload, score: 0})
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    users: newUsersList
                }
            };
        case 'START_GAME':
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    isGameStarted: true
                }
            }
        default:
            return state;
    }
}

export default gameReducer ;