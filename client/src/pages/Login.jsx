import styled from '@emotion/styled'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../redux/apiCalls';

const LoginWrapper = styled.div`
    position: fixed;
    background: #383d49;
    margin: 0; padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;


const LoginContent = styled.div`
    background-color: #fff;
    padding: 30px;
    width: 100%;
    max-width: 300px;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
`;

const Title = styled.h3`
    margin: 0;
    padding: 0;
    font-weight: 300;
    font-size: 2rem;
    letter-spacing: 0.9px;
    margin-bottom: 20px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Label = styled.p`
    margin: 0;
    padding: 0;
    color: #333;
    font-size: 0.9rem;
    letter-spacing: 0.9px;
    font-weight: 400;
`;

const Input = styled.input`
    height: 36px;
    padding: 0 15px;
    border-radius: 2px;
    border: none;
    background-color: #eee;
    margin-bottom: 10px;
`;

const Button = styled.button`
    height: 36px;
    padding: 0 15px;
    cursor: pointer;

    &:disabled{
        cursor: default;
    }
`;

const Register = styled.span`
    display: inline-block;
    font-size: 0.9rem;
    margin-top: 10px;
    cursor: pointer;
    color: #004080;

    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`;

const Error = styled.div`
    color: red;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {isFetching, error} = useSelector(state => state.user);

    const handleClick = (e) => {
        e.preventDefault();

        login(dispatch, {username, password});
    }

  return (
    <LoginWrapper>
        <LoginContent>
            <Title>Вхід на сайт</Title>
            <Form>
                <Label>Username:</Label>
                <Input onChange={(e) => setUsername(e.target.value)} placeholder={'username'} />

                <Label>Password:</Label>
                <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder={'password'} />

                <Button disabled={isFetching} onClick={handleClick} className={isFetching ? "BlackButton" : "PurpleButton"}>Увійти</Button>
                
                {error && <Error>Something goes wrong..</Error>}
            </Form>

            <Link to={'/register'}>
                <Register>Зареєструватися на сайті</Register>
            </Link>
        </LoginContent>
    </LoginWrapper>
  )
}

export default Login