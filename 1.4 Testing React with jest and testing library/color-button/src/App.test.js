import { render, screen, fireEvent } from '@testing-library/react';
import App, {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App />);
  // find an element with a role of button and text of 'Change to blue'
  let colorButton = screen.getByRole('button', {name: 'Change to MidnightBlue'})

  expect(colorButton).toHaveStyle({backgroundColor: 'MediumVioletRed'});

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'});
  expect(colorButton).toHaveTextContent('Change to MediumVioletRed');

});

test('button is disabled when checked', () => {
  render(<App />);

  //check that the button starts out enabled
  const colorButton = screen.getByRole('button', {name: 'Change to MidnightBlue'});
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkBox = screen.getByRole('checkbox');
  expect(checkBox).not.toBeChecked();
})

test('button disabled when checkbox is checked', () => {
  render(<App />);

  const colorButton = screen.getByRole('button');
  expect(colorButton).toBeEnabled();

  const checkBox = screen.getByRole('checkbox');
  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox);
  expect(checkBox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
})


test('button is gray after disabled when checkbox is checked', () => {
  render(<App />);

  const colorButton = screen.getByRole('button');
  expect(colorButton).toBeEnabled();

  const checkBox = screen.getByRole('checkbox');
  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'});
})

describe('spaces before camel-case capital letters', () => {
  beforeEach(() => {
    render(<App />)
  });

  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  })

  test('works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  })

  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  })
})