const initState = {
    gameState: {},
    socket: {},
    user: ""
}

const gameReducer = (state=initState, action) => {
    switch(action.type) {
        case 'CHANGE_GAME_STATE':
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
        case 'INCREMENT_QUESTION':
            let newQuestionNumber = state.gameState.questionNumber + 1;
            return {
                ...state,
                gameState: {...state.gameState, questionNumber: newQuestionNumber}
            };
        case 'UPDATE_SCORE':
            // let clientUser = state.user;
            let newUsers = [...state.gameState.users];
            let userIdx = newUsers.findIndex(item => item.name === action.user);
            newUsers[userIdx].score += action.score;
            return {
                ...state,
                gameState: {...state.gameState, users: newUsers}
            };
        default:
            return state;
    }
}

export default gameReducer ;