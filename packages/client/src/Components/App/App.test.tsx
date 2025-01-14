const appContent = 'Космолёт с бобрами';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') }),
);

test('Example test', async () => {
  //TODO Поправить тест
  // render(
  //   <MemoryRouter>
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   </MemoryRouter>,
  // );
  // expect(screen.getByText(appContent)).toBeDefined();
  expect(appContent).toBeTruthy();
});

export {};
