
const createGame = (data) => {
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

export { createGame, storeSocket, storeUser };