import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startGame } from '../../actions';
import './style.css';

const WaitingRoom = () => {

    // const data = useSelector(state => state.gameState);
    // const user = useSelector(state => state.user);
    // const socket = useSelector(state => state.socket);
    // const dispatch = useDispatch()

    const data = {
        roomName: "afkewb",
        cataegory: "Entertainment",
        difficulty: "hard",
        host: "Akash",
        users: [
            {name: "Tom", score: 0}, {name: "Jawwad", score:0}, {name:"Rafika", score:0}
        ],
    }
    const user = "Akash"
    function handleButtonClick(){
        dispatch(startGame());
        let newState = {
            ...data,
            isGameStarted: true
        }
        socket.emit('send state to players', newState )
    }
    return (
        <> 
        {data.users && <div className="waiting-room-page">
            {/* <header>
                <div>
                    <h1>QUIZZBUZZ</h1>
                </div>
            </header> */}
            <div className="outer-container">
                <div className="inner-container">
                    <div className="waiting-message">
                        <h1>This is {data.host}'s room </h1>
                        <h2>Please wait for other players...</h2>
                    </div>
                    <div className="player-section">
                    {data.users.map(user => {
                        return <div className="player-card" key={user.name}> <h3> {user.name} </h3> </div>
                    })}
                    </div>
                    {data.host === user ? <div className="start-section">
                                                                        <div className="game-link">
                                                                            <div className="game-link-left">
                                                                                <p>Share room name to friends:</p>
                                                                            </div>
                                                                            <div className="game-link-right">
                                                                                 <span>{data.roomName}</span>
                                                                            </div>
                                                                        </div>
                                                                        <button onClick={handleButtonClick} className="btn start-game">START GAME</button>
                                                                    </div> 
                                                                    : 
                                                                    <div className="start-section">
                                                                        <div className="game-link">
                                                                            <div className="game-link-left">
                                                                                <p>Share room name to friends:</p>
                                                                            </div>
                                                                            <div className="game-link-right">
                                                                                 <span>{data.roomName}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                    }
                </div>
            </div>
            {console.log(data)}
        </div>}
        {data.isGameStarted && <Redirect to='/game' />}
        </>
     );
}
 
export default WaitingRoom;