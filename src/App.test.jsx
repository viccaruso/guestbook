import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
  it('renders a list of guestbook entries', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email address/);
    userEvent.type(emailInput, 'test@test.com');

    const passwordInput = screen.getByPlaceholderText(/Password/);
    userEvent.type(passwordInput, 'test password');

    const loginButton = screen.getByRole('button', { name: /Login/ });
    userEvent.click(loginButton);

    const guestbookHeading = await screen.findByRole('heading', {
      name: /Guestbook/,
    });
  });
});
