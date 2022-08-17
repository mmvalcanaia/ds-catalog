
import { render, screen } from '@testing-library/react';
import ButtonIcon from '..';
import '@testing-library/jest-dom';


test('ButtonIcon should render with given text', () => {
  const text = 'Fazer login';
  render(<ButtonIcon text={text} />);
  expect(screen.getByText(text)).toBeInTheDocument();
});
