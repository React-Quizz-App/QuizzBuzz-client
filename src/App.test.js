import { screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    test('it renders the landing page with a Create Game Button', () => {
        renderWithProviders(<App />)
        const createGameButton = screen.getByRole('button', { name: 'Create Game'} )
        expect(createGameButton.textContent).toBe('Create Game')
    })
})