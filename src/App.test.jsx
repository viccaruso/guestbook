import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

const server = setupServer(
  rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) =>
    res(ctx.json({ user: { email: 'test@test.com' } }))
  ),
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(
      ctx.json([
        { content: 'Hello, world!' },
        { content: 'Goodbye, world!' },
        { content: "I'm back, world!" },
      ])
    )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
  it('Should log a user in and redirect to Guestbook page', async () => {
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

    await screen.findByRole('heading', {
      name: /Guestbook/,
    });

    await screen.findByText('Hello, world!');
    await screen.findByText('Goodbye, world!');
    await screen.findByText("I'm back, world!");
  });
});
