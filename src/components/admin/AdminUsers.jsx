import styled from '@emotion/styled';
import {DoNotDisturbOn} from '@mui/icons-material'

import {useState, useEffect} from 'react';
import {protectedRequest} from '../../request';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const UsersWrapper = styled.div``;

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


const UserList = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
`;

const User = styled.div`
  position: relative;
  width: 22%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  gap: 10px;
  background-color: ${props => props.admin ? "#f1ffea" : "#fffaf2"};

  &:hover{
    cursor: pointer;
    scale: 1.05;
    box-shadow: 0 0 15px rgba(0,0,0,0.8);
  }
`;

const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.p`
  margin: 0; padding: 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`;

const IsAdmin = styled.span`
  padding: 2px 6px;
  border: 1px solid #ccc;
  background-color: ${props => props.admin ? "#d7efcb" : "#f4dfba"};
  color: #333;
  font-size: 0.7rem;
  border-radius: 3px;
`;

const DeleteWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: absolute; right: 5px; top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  >svg{
    transition: all 0.1s ease;
    border-radius: 50%;

    &:hover{
      color: red;
      scale: 1.05;
      box-shadow: 0 0 5px rgba(0,0,0,0.3);
    }
  }
`;


const AdminUsers = () => {
  const [users, setUsers] = useState(null);
  const token = useSelector(state => state.user.currentUser.token);
  const navigate = useNavigate();

  useEffect( () => {
    const getUsers = async () => {
          try{
            const res = token && await protectedRequest(token).get('/auth/users');
    
            setUsers(res.data);
    
          } catch (e) {
            console.log(e);
          }
    }

    getUsers();
  }, [token]);

  
  const deleteUserHandler = (userId) => {
    try{
      token && protectedRequest(token).delete(`/auth/remove/${userId}`);

      navigate('/admin');
    }catch(e){
      console.log(e);
    }
  }

  return (
    <UsersWrapper>
      <Title>Користувачі</Title>

      <UserList>
        {users && users.map(userData => (
          <User admin={userData.isAdmin ? true : false} key={userData._id}>
            <ImageWrapper>
              <Image src={`${userData.picture}`} />
            </ImageWrapper>
            <Name>{userData.username}</Name>
            {userData.isAdmin 
              ? <IsAdmin admin>Адміністратор</IsAdmin>
              : <IsAdmin>Модератор</IsAdmin>
            }

            {!userData.isAdmin && (
              <DeleteWrapper>
                <DoNotDisturbOn onClick={() => deleteUserHandler(userData._id)} sx={{color: "darkred"}} />
              </DeleteWrapper>
            )}
            
          </User>
        ))}
        
      </UserList>
    </UsersWrapper>
  )
}

export default AdminUsers