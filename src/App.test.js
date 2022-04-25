import { render, screen } from '@testing-library/react';
import AppBook from "./components/App/AppBook";

test('renders learn react link', () => {
  render(<AppBook />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
