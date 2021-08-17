
const changeState = (data) => {
    return {
        type: 'CREATE_GAME',
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

export { changeState, storeSocket, storeUser, addUser, startGame };