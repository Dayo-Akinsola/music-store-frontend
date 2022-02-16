import { useEffect, useState } from 'react';
import AccountOrder from './AccountOrder';
import { getRequest } from '../../../../sevices/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const AccountOrders = ({ user }) => {
  const [ accountOrders, setAccountOrders ] = useState([]);

  useEffect(() => {
    const getUserOrders = async () => {
      const response = await getRequest('http://localhost:3001/orders', user.token);
      const orders = await response.json();
      setAccountOrders(orders);
      return orders;
    }

    getUserOrders();

  }, [user.token]);
  return (
    <div className="account__orders">
      <div className="account__orders--heading-container">
        <FontAwesomeIcon className='account__orders--heading-icon' icon={faShoppingBag} />
        <h3 className="account__orders--heading">My Orders</h3> 
      </div>
      {
        accountOrders.map(order => (
          <AccountOrder order={order} key={order.id} />
        ))
      }
    </div>
  )
}

export default AccountOrders;