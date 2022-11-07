

//REACT
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

import styled from '@emotion/styled'

// COMPONENTS
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ICONS
import {
  ManageAccounts, 
  People, 
  Sell, 
  Settings,
  Cottage} from '@mui/icons-material';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import {editOrder} from '../redux/orderRedux';


// AXIOS INSTANCE
import { protectedRequest } from '../request';



// STYLES
const HomeWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const HeaderWrapper = styled.div`
  height: auto;
  width: 100%;
  background: rgb(43,54,50);
  background: linear-gradient(90deg, rgba(43,54,50,1) 0%, rgba(79,128,165,1) 48%, rgba(114,136,156,1) 100%);
`;

const Content = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  max-width: 1280px;
  margin: 0 auto 50px auto;
`;

const Main = styled.div`
 flex: 8;
 padding: 20px;
`;

const AsideWrapper = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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
`

const MyLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover{
    color: #000000;
  }
`;

const NewNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: #f1f1f1;
  color: #424242;
  font-size: 0.9rem;
  padding: 3px 5px;
  
  &::before{
    content: '+';
  }
`


const Admin = () => {

  const dispatch = useDispatch();
  const newOrdersCount = useSelector(state => state.order);
  const [haveNewOrders, setHaveNewOrders] = useState(null);

  const token = useSelector(state => state.user.currentUser.token);
  
  // Fetch orders with isNew Flag;
  useEffect(() => {
    const getNewOrders = async () => {
      try{
            const res = token && await protectedRequest(token).get('/orders/getnews');
            setHaveNewOrders(res.data);
         }catch (e){ console.log(e) }
    }
    // Fetching
    getNewOrders();
  }, [token]);



  // Set count of the new orders;
  useEffect(() => {
    if(haveNewOrders) {
      dispatch(editOrder(haveNewOrders.length))
    }
  }, [haveNewOrders, dispatch]);

  return (
    <HomeWrapper>
        <HeaderWrapper>
            <Navbar fromPage isAdmin />
        </HeaderWrapper>

        <Content>
          <AsideWrapper>
              <Title>Навігація</Title>

              <MyLink to="/admin"><Cottage />На головну</MyLink>
              <MyLink to="/admin/orders"><Sell />Замовлення{newOrdersCount.count > 0 && (<NewNumber>{newOrdersCount.count}</NewNumber>)}</MyLink>
              <MyLink to="/admin/profile"><ManageAccounts />Профіль</MyLink>
              <MyLink to="/admin/users"><People />Користувачі</MyLink>
              <MyLink to="/admin/settings"><Settings />Налаштування</MyLink>
          </AsideWrapper>

          <Main>
            <Outlet />
          </Main>
        </Content>
        <Footer fromPage />
    </HomeWrapper>
  )
}

export default Admin