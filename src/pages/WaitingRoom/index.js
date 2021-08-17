import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

const WaitingRoom = () => {
    
    let data = { gamestate : {
                                roomName : "zlcqum",
                                category: "Entertainment Film",
                                difficulty: "hard",
                                host: "Tom",
                                users: [
                                    {name: "Ben", score: 0},
                                    {name: "Rafika", score: 0},
                                    {name: "Akash", score: 0},
                                    {name: "Jawwad", score: 0},
                                    {name: "Ben", score: 0}
                                ],
                                questionNumber: 1,
                                socket: {},
                                user: "Tom"
    }};

    return ( 
        <div className="waiting-room-page">
            <header>
                <div>
                    <h1>QUIZZBUZZ</h1>
                </div>
            </header>
            <div className="waiting-room-outer-container">
                <div className="waiting-room-inner">
                    <div className="waiting-message">
                        <h1>This is {data.gamestate.host}'s room </h1>
                        <h2>Please wait for other players...</h2>
                    </div>
                    <div className="player-section">
                    {data.gamestate.users.map(user => {
                        return <div className="player-card" key={user.name}> <h3> {user.name} </h3> </div>
                    })}
                    </div>
                    {data.gamestate.host === data.gamestate.user ? <div className="start-section">
                                                                        <div className="game-link">
                                                                            <div className="game-link-left">
                                                                                <p>Share room name to friends:</p>
                                                                            </div>
                                                                            <div className="game-link-right">
                                                                                 <span>{data.gamestate.roomName}</span>
                                                                            </div>
                                                                        </div>
                                                                        <button className="start-game">START GAME</button>
                                                                    </div> 
                                                                    : null}
                </div>
            </div>
            {console.log(data)}
        </div>
     );
}
 
export default WaitingRoom;