import React from 'react';

import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';

import gameReducer from '../reducers/gameReducer';

const TestProviders = ({ initState }) => {
    initState ||= {
        gameState: {},
        socket: {},
        user: ""
    }
    const testStore = createStore(() => gameReducer(initState, { type: '@@INIT' }))

    return ({ children }) => (
        <MemoryRouter>
            <Provider store={testStore}>
                <Router>
                    { children }
                </Router>
            </Provider>
        </MemoryRouter>
    )
}

const renderWithProviders = (ui, options={}) => {
    let TestWrapper = TestProviders(options)
    render(ui, { wrapper: TestWrapper, ...options })
}

import axios from 'axios';
jest.mock('axios')
axios.get.mockResolvedValue({ data: { message: [] }})

global.renderWithProviders = renderWithProviders;
global.React = React;