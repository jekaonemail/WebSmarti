import styled from '@emotion/styled'

import {useState} from 'react';
import {useSelector} from 'react-redux';
import {protectedRequest} from '../../request';

const AccountWrapper = styled.div``;

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

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h5`
  font-weight: 400;
  font-size: 2rem;
  color: #333;
  margin: 0; padding: 10px 0;
`;


const SectionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 50%;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 3px;
  border: none;
  background: #eee;
  color: #424242;
  padding: 0 15px;
  width: auto;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  padding: 0 15px;
  cursor: pointer;
`;


const MyMessage = styled.span`
  padding: 0 10px;
  color: ${props => props.success ? "green" : "red"};
`;


const AdminAccount = () => {
  const [password, setPassword] = useState({});
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(null); // for password
  const [message2, setMessage2] = useState(null); // for nickname
  const [message3, setMessage3] = useState(null); // for email

  const token = useSelector(state => state.user.currentUser.token);
  const userInfo = useSelector(state => state.user.currentUser);



  const buttonsHandler = async (event, type) => {
    event.preventDefault();

    switch(type){
      case "password":

          // change password


          try{

              token && await protectedRequest(token).put(`/auth/update/password/${userInfo._id}`, {
              password: password.password
            });

            setMessage(<MyMessage success>Пароль змінено!</MyMessage>);

          }catch (e){
            setMessage(<MyMessage>Помилка, пароль не змінено!</MyMessage>)
          }

        break;
      case "nickname":

          // change nickname

          try{

              token && await protectedRequest(token).put(`/auth/update/username/${userInfo._id}`, {
              username: nickname
            });

            setMessage2(<MyMessage success>Нікнейм змінено!</MyMessage>);

          }catch (e){
            setMessage2(<MyMessage>Помилка, нікнейм не змінено!</MyMessage>)
          }

        break;
      default:

          // change email
          try{

              token && await protectedRequest(token).put(`/auth/update/email/${userInfo._id}`, {
              email: email
            });

            setMessage3(<MyMessage success>E-Mail змінено!</MyMessage>);

          }catch (e){
            setMessage3(<MyMessage>Помилка, e-mail не змінено!</MyMessage>)
          }

        break;
    }
  }

  return (
    <AccountWrapper>
      <Title>Налаштування профілю</Title>

      <Section>
        <SectionTitle>Зміна паролю</SectionTitle>

        <SectionForm>
          <Input type="password" onChange={(e) => setPassword({...password, password: e.target.value})} placeholder={'Введіть дійсний пароль'} />
          <Input type="password" onChange={(e) => setPassword({...password, password2: e.target.value})} placeholder={'Повторіть пароль'} />
          <Button onClick={(e) => buttonsHandler(e, 'password')}>Змінити пароль</Button> {message}
        </SectionForm>
      </Section>

      <Section>
        <SectionTitle>Зміна Нікнейма</SectionTitle>
        
        <SectionForm>
          <Input onChange={(e) => setNickname(e.target.value)} placeholder={'Введіть бажаний Нікнейм'} />
          <Button onClick={(e) => buttonsHandler(e, 'nickname')}>Змінити Нікнейм</Button> {message2}
        </SectionForm>
      </Section>

      <Section>
        <SectionTitle>Зміна E-Mail</SectionTitle>
        
        <SectionForm>
          <Input onChange={(e) => setEmail(e.target.value)} placeholder={'Введіть новий e-mail'} />
          <Button onClick={(e) => buttonsHandler(e, 'email')}>Змінити E-Mail</Button> {message3}
        </SectionForm>
      </Section>
    </AccountWrapper>
  )
}

export default AdminAccount