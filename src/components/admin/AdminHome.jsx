import styled from '@emotion/styled';
import { Visibility, Delete} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'
import Loading from '../Loading';
import { useEffect, useState } from 'react';
import { protectedRequest } from '../../request'
import { useSelector, useDispatch } from 'react-redux';
import { editOrder } from '../../redux/orderRedux';
import moment from 'moment';


// WIDGETS
import CurrentOrdersStats from './widgets/CurrentOrdersStats';
import FinishedOrders from './widgets/FinishedOrders';
import WaitingOrders from './widgets/WaitingOrders';
import InWorkOrders from './widgets/InWorkOrders';

const AdminHomeWrapper = styled.div``;

const Title = styled.h4`
  margin: 0; padding: 0;
  color: #7a7a7a;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  ${props => props.margin && "margin-top: 15px"};

  &::after{
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background-color: #ccc;
    margin: 0;
    margin-top: 10px;
    ${props => props.margin && "display: none"};
  }
`;


const CardsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 15px;
  width: 100%;
`;


const LastOrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;


const Order = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  font-size: 0.8rem;
  color: #333;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  border-radius: 3px;
  line-height: 0.8rem;
  border: 1px solid ${props => props.status && props.status};
  background-color: ${props => props.status && props.status};
  
  &:hover{
    cursor: pointer;
    border: 1px solid #7a7a7a;
  }
`;

const Activity = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  justify-content: flex-end;
  margin-right: 10px;
`;

const Name = styled.div`
  width: 100%;
  max-width: 75px;
  overflow: hidden;
  padding: 4px 0;
`;

const Email = styled.div`
  width: 100%;
  max-width: 100px;
  overflow: hidden;
  padding: 4px 0;
`;

const Phone = styled.div`
  padding: 4px 0;
  overflow: hidden;
  width: 100%;
  max-width: 130px;
  `;

const Date = styled.div`
  width: 100%;
  max-width: 130px;
  overflow: hidden;
  padding: 4px 0;
`;

const Icon = styled.div`
  color: #000;
  transition: all 0.1s ease;
  
  >svg{
    font-size: 20px;
    transition: all 0.1s ease;

    &:hover{
      scale: 1.3;
      ${props => props.delete && "color: red"};
    }
  }
`;

const OrderInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  padding: 10px;
  height: 24px;
  overflow: hidden;
`;

const AdminHome = () => {
  
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // token for requests
  const token = useSelector(state => state.user.currentUser.token);
  
  // get count of new orders from redux
  const countOfNewOrders = useSelector(state => state.order.count);

  // array with orders
  const [lastOrders, setLastOrders] = useState(null);
 
  // get orders from DB and put them to 
  // lastOrders array
  useEffect(() => {
    const getLastOrders = async () => {
      try{

        const response = token && await protectedRequest(token).get('/orders/orders?last=true');
        setLastOrders(response.data);

      }catch(e){ console.log("Can't upload last orders: " + e ); }
    }

    getLastOrders();
  }, [token]);


  // deleting order
  const handleDeleteOrder = async (orderId) => {
    try {
      // delete order
      token && await protectedRequest(token).delete(`/orders/remove/${orderId}`);
      navigate('/admin/orders');

    } catch (e) {
      console.log("Can't delete order: " +e);
    }
  }

  // change state of new order to old order state.
  const handleSetOrderNotNew = async (orderId) => {
    // change status
    try{

      // change status in DataBase
      token && await protectedRequest(token).put(`/orders/notnew/${orderId}`, { isNew: false });
      
      // update redux state
      dispatch(editOrder(countOfNewOrders - 1));

      navigate('/admin/orders');

    }catch(e){
      console.log("Can't update order status: "+ e);
    }
  }

  return (
    <AdminHomeWrapper>

        <Title>Аналітика</Title>

        {/* WIDGETS  */}
        <CardsWrapper>
          <CurrentOrdersStats />
          <FinishedOrders />
          <WaitingOrders />
          <InWorkOrders />
        </CardsWrapper>

        <Title margin>Останні замовлення</Title>

        <LastOrdersWrapper>
          {lastOrders && lastOrders.map(order => (
            <Order 
              key={order._id}
              status={
                  order.isWait 
                    ? "#f4dd7f" 
                    : order.isFinish 
                      ? "#99e585"
                      : "#b6b1ed"}
            >
              
              <OrderInfoWrapper onClick={() => navigate(`/admin/order/${order._id}`)}>
                <Date>{moment(order.createdAt).fromNow()}</Date>
                <Name>{order.clientName}</Name>
                <Email>{order.clientEmail}</Email>
                <Phone>{order.clientPhone}</Phone>
                <Phone>{order.clientType}</Phone>
              </OrderInfoWrapper>

              <Activity>

                {order.isNew && (
                  <Icon onClick={() => handleSetOrderNotNew(order._id)}>
                      <Visibility />
                  </Icon>
                )}

                <Icon onClick={() => handleDeleteOrder(order._id)}>
                    <Delete />
                </Icon>
              
              </Activity>
            </Order>
          ))}
          
        </LastOrdersWrapper>

    </AdminHomeWrapper>
  )
}

export default AdminHome