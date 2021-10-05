import axios from 'axios';
import { useEffect, useState } from 'react';
import  Row  from 'react-bootstrap/Row';

import ScoopOptions from './ScoopOptions';
import ToppingsOptions from './ToppingsOptions';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails} from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

export default function Options({optionType}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  //options is scoops or toppings
  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
    .then(response => setItems(response.data))
    .catch(error => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // TODO replace with toppings once made
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingsOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
    <h2>{title}</h2>
    {/* call format currency on the price to make it more in line with the app */}
    <p>{formatCurrency(pricePerItem[optionType])} each</p>
    <p>
      {title} total: {orderDetails.totals[optionType]}
    </p>
    <Row>{optionItems}</Row>
    </>
  );
}