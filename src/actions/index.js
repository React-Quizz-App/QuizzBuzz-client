
const changeState = (data) => {
    return {
        type: 'CHANGE_GAME_STATE',
        payload: data
    }
}

const storeSocket = (socket) => {
    return {
        type: 'STORE_SOCKET',
        payload: socket
    }
}

const storeUser = (user) => {
    return {
        type: 'STORE_USER',
        payload: user
    }
}

const addUser = (user) => {
    return {
        type: 'ADD_USER',
        payload: user
    }
}

const startGame = () => {
    return {
        type: 'START_GAME',
    }
}

const incrementQuestionNumber = () => {
    return {
        type: 'INCREMENT_QUESTION'
    }
}

const updateScore = (user) => {
    return {
        type: 'UPDATE_SCORE',
        payload: user
    }
}

export { changeState, storeSocket, storeUser, addUser, startGame, incrementQuestionNumber, updateScore };