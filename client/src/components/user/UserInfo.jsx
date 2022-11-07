import styled from '@emotion/styled';

import {Cottage,ExitToApp, ManageAccounts, People, Sell, Settings} from '@mui/icons-material';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../redux/userRedux';

const UserInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-right: 10px;
    padding: 5px 10px;
    border-radius: 3px;
    position: relative;
    background-color: ${props => props.isActive ? "rgba(255,255,255,0.1)" : "transparent"};

    &:hover{
        background-color: rgba(255,255,255,0.1);
        margin-right: 10px;
        padding-right: 10px;
    }

    
`;

const ImageWrapper = styled.div`
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    border: 2px solid #333;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
    cursor: pointer;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Info = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    padding: 10px 0;
`;

const Welcome = styled.span`
    text-transform: uppercase;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.9px;
    color: #c7deed;
`;

const UserName = styled.h4`
    margin: 0;
    padding: 0;
    font-weight: 700;
    color: #FFF;
    text-shadow: 0 0 3px rgba(0,0,0,0.5);
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 0.8px;
    max-width: 150px;
    min-width: 80px;
    overflow: hidden;
`;

const Window = styled.div`
    position: absolute;
    right: 0;
    bottom: -265px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    width: 100%;
    z-index: 1;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    display: ${props => props.isActive ? "flex" : "none"};
`;

const WindowItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 10px;
    text-decoration: none;
    color: #000;

    &:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,0.1);
    }
`;
const WindowExit = styled.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 10px;
    text-decoration: none;
    color: #000;

    &:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,0.1);
    }
`;


const UserInfo = () => {
    const [adminMenu, setAdminMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickHandler = () => {
        if(adminMenu === false) {
            setAdminMenu(true);
        }else{
            setAdminMenu(false);
        }
    }

    const exitHandler = () => {
        dispatch(logout());

        navigate('/');
    }

    const userData = useSelector(state => state.user.currentUser);

return (
    <UserInfoWrapper isActive={adminMenu} onClick={clickHandler}>
        <ImageWrapper>
            <Image src={`${userData?.picture}`} />
        </ImageWrapper>
        <Info>
            <Welcome>Вітаємо,</Welcome>
            <UserName>{userData?.username}</UserName>
        </Info>

        <Window isActive={adminMenu}>
            <WindowItem to="/admin"><Cottage />На головну</WindowItem>
            <WindowItem to="/admin/profile"><ManageAccounts />Профіль</WindowItem>
            <WindowItem to="/admin/orders"><Sell />Замовлення</WindowItem>
            <WindowItem to="/admin/users"><People />Користувачі</WindowItem>
            <WindowItem to="/admin/settings"><Settings />Налаштування</WindowItem>
            <WindowExit onClick={exitHandler}><ExitToApp />Вийти</WindowExit>

        </Window>
    </UserInfoWrapper>
  )
}

export default UserInfo