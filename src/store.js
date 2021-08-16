// in index.js
import { createStore } from 'redux';
import gameReducer from './reducers/gameReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(gameReducer, devToolsEnhancer());

export default store;

