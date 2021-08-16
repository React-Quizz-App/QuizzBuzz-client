
const createGame = (data) => {
    return {
        type: 'CREATE_GAME',
        payload: data
    }
}

export { createGame };