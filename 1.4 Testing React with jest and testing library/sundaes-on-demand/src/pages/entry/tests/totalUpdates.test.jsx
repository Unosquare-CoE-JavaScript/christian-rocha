import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubTotal = screen.getByText('Scoops total: $', {exact: false});

  expect(scoopsSubTotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', 
  { name: 'Vanilla', }
  );

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(scoopsSubTotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', 
  { name: 'Chocolate', }
  );
  
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubTotal).toHaveTextContent('6.00');

});
// ensure that the toppings sub total updates
test('update topping subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', {exact: false});
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const cherryToppings = await screen.findByRole('checkbox', 
  { name: /Cherries/i } );

  
  userEvent.click(cherryToppings);

  expect(toppingsSubtotal).toHaveTextContent('1.50');

  const hotFudgeToppings = await screen.findByRole('checkbox', 
  { name: /Hot Fudge/i});

  
  userEvent.click(hotFudgeToppings);

  expect(toppingsSubtotal).toHaveTextContent('3.00');

  userEvent.click(cherryToppings);

  expect(toppingsSubtotal).toHaveTextContent('1.50');

  

});

describe('grand total', () => {
  

  test('grand total starts at zero, and grand total updates with scoop option added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', 
    { name: /grand total: \$/i});

    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '3');
    expect(grandTotal).toHaveTextContent('6.00');

    const cherryToppings = await screen.findByRole('checkbox', 
    { name: /Cherries/i } );
    userEvent.click(cherryToppings);
    expect(grandTotal).toHaveTextContent('7.50');

  });

  test('grand total updates with toppings option added first', async () => {
    render(<OrderEntry />)
    const grandTotal =  screen.getByRole('heading', 
    { name: /grand total: \$/i});

    const cherryToppings = await screen.findByRole('checkbox', 
    { name: /Cherries/i } );

    userEvent.click(cherryToppings);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');

  });


  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal =  screen.getByRole('heading', 
    { name: /grand total: \$/i});

    const cherryToppings = await screen.findByRole('checkbox', 
    { name: /Cherries/i } );

    userEvent.click(cherryToppings);
    expect(grandTotal).toHaveTextContent('1.50');

    const hotFudgeToppings = await screen.findByRole('checkbox', 
    { name: /Hot Fudge/i});

    userEvent.click(hotFudgeToppings);
    expect(grandTotal).toHaveTextContent('3.00');

    userEvent.click(cherryToppings);
    expect(grandTotal).toHaveTextContent('1.50');

  });

})