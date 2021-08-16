
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

export { createGame, storeSocket };