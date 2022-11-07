import styled from '@emotion/styled';
import { AccessTime, Ballot, CheckBox, Engineering } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import {useSelector, useDispatch} from 'react-redux';
import {protectedRequest} from '../../request'
import moment from 'moment'
import { Visibility, Delete} from '@mui/icons-material';
import { editOrder } from '../../redux/orderRedux';


const OrdersWrapper = styled.div`
  position: relative;
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

const Title = styled.h4`
  margin: 0; padding: 0;
  color: #7a7a7a;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  ${props => props.margin && "margin-top: 15px"};
  margin-bottom: 20px;

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

const ActivityOrders = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  display: flex;
  gap: 25px;
  align-items: center;
  margin-right: 10px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: #333;
  padding-bottom: 11px;
  border-bottom: 2px solid ${props => props.border && props.border};

  > svg {
    font-size: 20px;
  }

  &:hover{
    color: #000;
    cursor: pointer;
  }

  &:hover > svg{
    color: ${props => props.color ? props.color : "#000"};
  }
`;

const Activity = styled.div`
  position: relative;
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

const IconOrders = styled.div`
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


const FetchedOrdersWrapper = styled.div`
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


const OrdersCount = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #7a7a7a;
  transform: translate(0, -50%);
`;


const AdminOrders = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const countOfNewOrders = useSelector(state => state.order.count);
  const token = useSelector(state => state.user.currentUser.token);

  const statusLocation = location.pathname.split("/")[3];

  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrdersFromDb = async () => {
        
      const possibleLocations = [undefined, "iswait", "inwork", "isfinish"];

      for(let i of possibleLocations){
        if(i === statusLocation){
          
          switch(i){
            
            case "iswait":
              try{

                const waitOrders = token && await protectedRequest(token).get('/orders/getordersiswait');
                setOrders(waitOrders.data);

              }catch(e){
                console.log("Orders loading failure.")
              }

              break;

            case "isfinish":
              try{

                const waitOrders = token && await protectedRequest(token).get('/orders/getordersisfinish');
                setOrders(waitOrders.data);

              }catch(e){
                console.log("Orders loading failure.")
              }
              break;

            case "inwork":
              try{

                const waitOrders = token && await protectedRequest(token).get('/orders/getordersinwork');
                setOrders(waitOrders.data);

              }catch(e){
                console.log("Orders loading failure.")
              }  

              break;
            
            // all orders
            case undefined:
                default:
                    try{

                      const waitOrders = token && await protectedRequest(token).get('/orders/orders');
                      setOrders(waitOrders.data);
      
                    }catch(e){
                      console.log("Orders loading failure.")
                    }  
                    break;
          }

        }
      }
    }

    getOrdersFromDb();
  }, [location])


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


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

  
  

  return (
    <OrdersWrapper>
      <Title>Замовлення сайтів</Title>

      <Activity>
        <Icon border={statusLocation === undefined ? "#004080" : "#fff"} color="#004080" onClick={() => navigate('/admin/orders')}>
          <Ballot />
          Всі замовлення
        </Icon>

        <Icon border={statusLocation === "iswait" ? "orange" : "#fff"} color="orange" onClick={() => navigate('/admin/orders/iswait')}>
          <AccessTime />
          В очікуванні
        </Icon>

        <Icon border={statusLocation === "inwork" ? "#b6b1ed" : "#fff"} color="#b6b1ed" onClick={() => navigate('/admin/orders/inwork')}>
          <Engineering />
          В роботі
        </Icon>

        <Icon border={statusLocation === "isfinish" ? "green" : "#fff"} color="green" onClick={() => navigate('/admin/orders/isfinish')}>
          <CheckBox />
          Опрацьовані
        </Icon>


        <OrdersCount>
          Кількість: {orders && orders.length}
        </OrdersCount>
      </Activity>
      
      <FetchedOrdersWrapper>
        {orders && orders.map(order => (
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

              <ActivityOrders>

                {order.isNew && (
                  <IconOrders onClick={() => handleSetOrderNotNew(order._id)}>
                      <Visibility />
                  </IconOrders>
                )}

                <IconOrders onClick={() => handleDeleteOrder(order._id)}>
                    <Delete />
                </IconOrders>
              
              </ActivityOrders>
          </Order>
        ))}

      </FetchedOrdersWrapper>
    </OrdersWrapper>
  )
}

export default AdminOrders