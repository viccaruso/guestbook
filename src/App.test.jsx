import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

const contentArr = [
  { content: 'Hello, world!', created_at: '12345' },
  { content: 'Goodbye, world!', created_at: '12345' },
  { content: 'Hello again, world!', created_at: '12345' },
];
const server = setupServer(
  rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) =>
    res(ctx.json({ user: { email: 'test@test.com' } }))
  ),
  rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) =>
    res(ctx.json(contentArr))
  ),
  rest.post(
    `${process.env.SUPABASE_API_URL}/rest/v1/entries`,
    (req, res, ctx) => {
      contentArr.push({ content: `${req.body.content}`, created_at: '12345' });
      return res(ctx.json(contentArr));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
  it('Should log a user in, redirect them to the Guestbook page, allow them to add an entry, and show the new entry', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email address');
    userEvent.type(emailInput, 'test@test.com');

    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'test password');

    const loginButton = screen.getByRole('button', { name: 'Login' });
    userEvent.click(loginButton);

    await screen.findByRole('heading', {
      name: /Guestbook/,
    });

    await screen.findByText('Hello, world! - by test@test.com at 12345');
    await screen.findByText('Goodbye, world! - by test@test.com at 12345');
    await screen.findByText('Hello again, world! - by test@test.com at 12345');

    const entryBox = screen.getByRole('textbox', {
      name: 'textbox to add a new guestbook entry',
    });
    userEvent.type(entryBox, 'This is a new entry.');

    const addButton = screen.getByRole('button', { name: 'Add to guestbook' });
    userEvent.click(addButton);

    await screen.findByText('This is a new entry. - by test@test.com at 12345');
  });
});
