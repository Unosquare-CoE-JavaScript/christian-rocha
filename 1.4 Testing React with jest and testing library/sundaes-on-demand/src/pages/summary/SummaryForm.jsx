import { Form, Popover, OverlayTrigger, Button } from 'react-bootstrap';

import { useState } from 'react';

export default function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Content>
        No ice cream will actually be delivered
      </Popover.Content>
    </Popover>
  );
  
  const checkboxLabel = (
    <span>
      I agree to 
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{color: 'blue'}}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );


  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={tcChecked}
          onChange={(ev) => setTcChecked(ev.target.checked)}
          label={checkboxLabel} 
        />
      </Form.Group>

      <Button variant='primary' type='submit' disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
}