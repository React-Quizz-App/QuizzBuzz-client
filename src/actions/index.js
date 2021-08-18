
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

const updateScore = (user, score) => {
    return {
        type: 'UPDATE_SCORE',
        "user": user,
        "score": score
    }
}

const setQuizAsComplete = (user) => {
    return {
        type: 'COMPLETE_QUIZ',
        payload: user
    }
}

const resetQuestionNumber = () => {
    return {
        type: 'RESET_QUESTION_NUMBER',
    }
}

export { changeState, storeSocket, storeUser, addUser, startGame, incrementQuestionNumber, updateScore, setQuizAsComplete, resetQuestionNumber };