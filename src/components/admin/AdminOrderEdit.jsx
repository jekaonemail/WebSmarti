import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccessTime, CheckBox, Engineering, Visibility } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import {protectedRequest} from '../../request';
import moment from 'moment'
import 'moment/locale/uk';
import {useDispatch, useSelector} from 'react-redux'
import {editOrder} from '../../redux/orderRedux'

moment.locale('uk');

const OrderWrapper = styled.div``;

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

const Order = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Info = styled.div`
  width: 200px;
  border-bottom: 1px solid #f1f1f1;
  padding: 5px 0;
  font-size: 0.9rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:nth-child(3n - 1){
    width: auto;
    border-bottom: 1px solid #f1f1f1;
    color: #000;
    padding: 5px 0;
  }
`;

const Breaker = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  background-color: transparent;
`;


const Input = styled.input`
  border: none;
  background-color: #eee;
  padding: 2px 10px;
  font-weight: 300;
  color: #333;
  font-size: 0.8rem;
  border-radius: 3px;
  margin: 0;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0;

  > svg{
    &:hover{
      cursor: pointer;
    }
  }
`;

const SaveButton = styled.button`
  
  height: 30px;
  padding: 0 10px;
  cursor: pointer;

`;


const AdminOrder = () => {

  const location = useLocation();
  const orderId = location.pathname.split('/')[3];
  const [orderData, setOrderData] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(state => state.user.currentUser.token);
  
  const [changedUserData, setChangedUserData] = useState({});


  useEffect(() => {
    window.scrollTo(0, 0);

    const getOrderData = async () => {
      try{
        setIsFetching(true);
        const res = token && await protectedRequest(token).get(`/orders/order/${orderId}`);
        setIsFetching(false);
        setOrderData(res.data); // send order data to the orderData state.

      }catch(e){
        console.log(e);
      }
    }

    getOrderData();
  }, [orderId, token]);

  const changeOrderStatus = async (status) => {
    if(status) {
      switch (status){
        // change order status to wait
        case "isWait":
          try{

            token && await protectedRequest(token).put(`/orders/update/status/${orderId}`, {
              isWait: true,
              isFinish: false,
              inWork: false
            })
            
            navigate("/admin");

          }catch(e){
            console.log(e);
          }

          break;
        
        // change order status to finish
        case "isFinish":
          try{

            token && await protectedRequest(token).put(`/orders/update/status/${orderId}`, {
              isWait: false,
              isFinish: true,
              inWork: false
            })
            
            navigate("/admin");

          }catch(e){
            console.log(e);
          }
          
          break;
        
        // change order status to inWork;
        default:

          try{

            token && await protectedRequest(token).put(`/orders/update/status/${orderId}`, {
              isWait: false,
              isFinish: false,
              inWork: true
            })

            navigate("/admin");

          }catch(e){
            console.log(e);
          }

          break;
      }
    }
  }

  const dispatch = useDispatch();
  const countOfNewOrders = useSelector(state => state.order.count);

  const changeNew = async () => {
    try{
      token && await protectedRequest(token).put(`orders/notnew/${orderId}`,{
        isNew: false
      });

      dispatch(editOrder(countOfNewOrders - 1));

      navigate('/admin/orders');
    }catch(e){
      console.log(e);
    }
  }



  const saveDataHandler = async () => {
    try{

      token && await protectedRequest(token).put(`/orders/update/${orderId}`, {
        clientName: changedUserData.name,
        clientPhone: changedUserData.phone,
        clientType: changedUserData.type,
        clientEmail: changedUserData.email
      });

      navigate(`/admin/order/${orderId}`);

    }catch(e){
      console.log(e);
    }
  }

  return (
    <OrderWrapper>
        <Title>Редагування замовлення № {orderId}</Title>

        {isFetching && <Loading />}

        <Order>
          <Info>Час створення</Info>
          <Info>
            {orderData 
              ? moment(orderData[0].createdAt).calendar() 
              : <Loading />}
          </Info>
          <Breaker />

          <Info>Ім'я клієнта</Info>
          <Info>
            <Input 
              onChange={(e) => setChangedUserData({name: e.target.value})}
              placeholder={orderData 
                ? orderData[0].clientName 
                : "Завантаження..."}
            />
          </Info>
          <Breaker />
          
          <Info>E-mail клієнта</Info>
          <Info>
            <Input 
              onChange={(e) => setChangedUserData({email: e.target.value})}
              placeholder={orderData 
                ? orderData[0].clientEmail 
                : "Завантаження..."} 
            />
          </Info>
          <Breaker />
          
          <Info>Тип послуги</Info>
          <Info>
            <Input 
              onChange={(e) => setChangedUserData({type: e.target.value})}
              placeholder={orderData 
                ? orderData[0].clientType 
                : "Завантаження..."} 
            />
          </Info>
          <Breaker />
          
          <Info>Номер телефону</Info>
          <Info>
            <Input 
              onChange={(e) => setChangedUserData({phone: e.target.value})}
              placeholder={orderData 
                ? orderData[0].clientPhone 
                : "Завантаження..."} 
            />
          </Info>
          <Breaker />
          
          <Info>Cтатус</Info>

          {orderData && orderData[0].isWait && <Info><AccessTime sx={{color: "orange", fontSize: "1rem"}} />Очікує</Info>}
          {orderData && orderData[0].inWork && <Info><Engineering sx={{color: "#004080", fontSize: "1rem"}} />В роботі</Info>}
          {orderData && orderData[0].isFinish && <Info><CheckBox sx={{color: "green", fontSize: "1rem"}} />Виконаний</Info>}
          

          <Breaker />

          <Icons>
              {orderData && !orderData[0].isWait && <AccessTime onClick={() => changeOrderStatus('isWait')} sx={{color: "orange", fontSize: "1.4rem"}} />}
              {orderData && !orderData[0].inWork && <Engineering onClick={() => changeOrderStatus('inWork')} sx={{color: "#004080", fontSize: "1.4rem"}} />}
              {orderData && !orderData[0].isFinish && <CheckBox onClick={() => changeOrderStatus('isFinish')} sx={{color: "green", fontSize: "1.4rem"}} />}
              {orderData && orderData[0].isNew && <Visibility onClick={changeNew} sx={{color: "#000", fontSize: "1.4rem"}} />}

              <SaveButton onClick={saveDataHandler}>Зберегти данні</SaveButton>
          </Icons>
        </Order>
    </OrderWrapper>
  )
}

export default AdminOrder