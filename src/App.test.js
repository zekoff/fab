import { render, screen } from '@testing-library/react';
import App from './App';

test('renders family achivement board text', () => {
  render(<App />);
  const linkElement = screen.getByText(/family achievement board/i);
  expect(linkElement).toBeInTheDocument();
});
