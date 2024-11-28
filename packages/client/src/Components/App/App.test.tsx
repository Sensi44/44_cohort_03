import App from './App';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const appContent = 'Космолёт с бобрами';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') }),
);

test('Example test', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByText(appContent)).toBeDefined();
});
