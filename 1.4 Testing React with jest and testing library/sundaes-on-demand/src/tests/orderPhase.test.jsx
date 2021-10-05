import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  //render app
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', 
  { name: 'Vanilla'});

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2');

  const chocolateInput = screen.getByRole('spinbutton', 
  { name: 'Chocolate'});
  
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '1');

  const cherriesCheckBox = await screen.findByRole('checkbox', {
    name: /cherries/i, 
  });
  userEvent.click(cherriesCheckBox);
  // find a click order button on order entry page
  const orderSummaryButton = screen.getByRole('button', 
  { name: /order sundae/i});
  userEvent.click(orderSummaryButton);
  // check summary info correct 

  const SummaryHeading = screen.getByRole('heading', 
  {name: /order summary/i});
  expect(SummaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', 
  {name: 'Scoops: $6.00',});
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  //check summary options are correct

  expect(screen.getByText('2 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('1 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();
  
  //accept TOC and click button to confirm order
  const tcCheckBox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckBox);

  const confirmOrderButton = screen.getByRole('button', {
    name:/confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });

  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  //click ' new order ' button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);
  //check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();
  await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await screen.findByRole('checkbox', {
    name: 'Cherries',
  }); 
    
  

})