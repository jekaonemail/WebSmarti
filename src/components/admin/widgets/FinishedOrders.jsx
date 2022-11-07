import styled from '@emotion/styled';
import {Link} from 'react-router-dom'
import {TrendingUp,TrendingDown, Visibility} from '@mui/icons-material'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { protectedRequest } from '../../../request';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const CardTitle = styled.h5`
  margin: 0; padding: 10px;
  line-height: 1.4rem;
  font-size: 1.5rem;
  font-weight: 300;
`;

const CardCount = styled.span`
  display: block;
  padding: 10px;
  padding-top: 0;
  font-size: 2.5rem;
  font-weight: bold;
`;

const ShortStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  padding-top: 0;
  gap: 5px;
`;

const Percent = styled.span`
  color: ${props => props.down ? "darkred" : "green"};
  margin-top: -3px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
`;

const Month = styled.p`
  color: #7a7a7a;
  font-size: 0.75rem;
  margin: 0; padding: 0 5px;
  margin-top: -5px;
`;

const ShowOrders = styled.div`
  position: absolute;
  right: 15px; top: 10px;
  display: flex;
  border-radius: 50%;
  background-color: #E2EAF4;
  align-items: center;
  width: 30px;
  height: 30px;
  overflow: hidden;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover{
    scale: 1.3;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: #333;
  position: relative;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  width: 24%;
  border-radius: 5px;
  background: rgb(255,246,246);
  background: linear-gradient(90deg, rgba(255,246,246,1) 0%, rgba(236,255,198,1) 100%);
  transition: all 0.1s ease;

  &:hover{
    scale: 1.1;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
  }
`;


const CurrentOrdersStats = () => {
    
    const [orders, setOrders] = useState();
    const token = useSelector(state => state.user.currentUser.token);
    const KPE = orders && Math.floor(((orders.currentOrders * 100) / orders.lastMonthOrders - 100))
    const [currentMonthName, setCurrentMonthName] = useState();

    // fetching the orders count in current month
    // and for the last month
    useEffect(() => {
        const getOrdersFromDb = async () => {
            try{

                const fetchedCurrentOrders = token && await protectedRequest(token).get('/orders/getcurrentfinished');
                const fetchedLastMonthOrders = token && await protectedRequest(token).get('/orders/getlastmonthfinished');

                setOrders({
                    currentOrders: fetchedCurrentOrders.data.length,
                    lastMonthOrders: fetchedLastMonthOrders.data.length
                })

            }catch(e){
                console.log("Can't get orders from DB: "+ e);
            }
        }

        getOrdersFromDb();
    }, [token])

    // get current month
    const month  = (new Date().getMonth() + 1);

    // set current month name;
    useEffect(() => {
        switch(month){
            case 1: 
                setCurrentMonthName("Січня");
                break;
            
            case 2:
                setCurrentMonthName("Лютого");
                break;
            
            case 3:
                setCurrentMonthName("Березня");
                break;
            
            case 4:
                setCurrentMonthName("Квітня");
                break;
            
            case 5:
                setCurrentMonthName("Травня");
                break;
            
            case 6:
                setCurrentMonthName("Червня");
                break;
            
            case 7:
                setCurrentMonthName("Липня");
                break;
            
            case 8:
                setCurrentMonthName("Серпня");
                break;
            
            case 9: 
                setCurrentMonthName("Вересня");
                break;
            
            case 10:
                setCurrentMonthName("Жовтня");
                break;
            
            case 11:
                setCurrentMonthName("Листопада");
                break;
            
            case 12: 
                setCurrentMonthName("Грудня");
                break;
            
            default:
                setCurrentMonthName("No Month");
                break;
        }
    }, [month])


  return (
    <CardLink to="/admin/orders/isfinish">
        <Card>
            <CardTitle>Завершені</CardTitle>
            <CardCount>{orders && orders.currentOrders} шт.</CardCount>
            <ShortStats>
                {orders && orders.currentOrders === 0
                    ? <Month style={{height: "24px", display: "flex", alignItems: "center"}}>Замовлень немає</Month>
                    : orders && orders.currentOrders > orders.lastMonthOrders
                        ? (
                            <>
                                <TrendingUp sx={{color: "green"}} />
                                <Percent>{KPE} %</Percent>
                                <Month>Відносно {currentMonthName}</Month>
                            </>
                          )
                        
                        : (
                            <>
                                <TrendingDown sx={{color: "darkred"}} />
                                <Percent down>{KPE} %</Percent>
                                <Month>Відносно {currentMonthName}</Month>
                            </>
                          )
                }
            </ShortStats>

            <ShowOrders>
                <Visibility sx={{color: "#000", fontSize: "1.3rem"}} />
            </ShowOrders>
        </Card>
    </CardLink>
  )
}

export default CurrentOrdersStats