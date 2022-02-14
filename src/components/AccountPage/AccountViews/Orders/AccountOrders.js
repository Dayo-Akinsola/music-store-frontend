import { useEffect, useState } from 'react';
import AccountOrder from './AccountOrder';
import { getRequest } from '../../../../sevices/service';

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
  console.log(accountOrders);
  return (
    <div className="account__orders">
      {
        accountOrders.map(order => (
          <AccountOrder order={order} key={order.id} />
        ))
      }
    </div>
  )
}

export default AccountOrders;