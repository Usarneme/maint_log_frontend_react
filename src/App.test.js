import React from 'react';
import { render } from '@testing-library/react';
// import App from './App';
import Nav from './components/Nav';

describe('Nav component testing', () => {
  test('/src/components/Nav.js -> should render', () => {
  // const app = render(<App />;
    const { getByRole } = render(<Nav />);
    const anchorNode = getByRole('a');
    expect(anchorNode).toBeInTheDocument();
  // console.log(Object.keys(app));
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  });
});
