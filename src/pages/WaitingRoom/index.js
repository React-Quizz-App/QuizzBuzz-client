import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

const WaitingRoom = () => {

    const data = useSelector(state => state.gameState);
    const user = useSelector(state => state.user);
    console.log('waiting room data: ', data);
    return (
        <> 
        {data.users && <div className="waiting-room-page">
            <header>
                <div>
                    <h1>QUIZZBUZZ</h1>
                </div>
            </header>
            <div className="waiting-room-outer-container">
                <div className="waiting-room-inner">
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
                                                                        <button className="start-game">START GAME</button>
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
        </>
     );
}
 
export default WaitingRoom;