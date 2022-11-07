import styled from '@emotion/styled'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from '../request';

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

const Form = styled.form`
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
`;

const RegisterLink = styled.span`
    display: inline-block;
    font-size: 0.9rem;
    cursor: pointer;
    color: #004080;

    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`;

const MyLink = styled(Link)`
    color: #000;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    text-decoration: none;
    font-size: 0.9rem;
    margin-top: 10px;
`;

const FormMessage = styled.p`
    margin: 10px 0;
    font-weight: bold;
    color: ${props => props.color ? props.color : "green"};
`;


const Register = () => {

    const [formData, setFormData] = useState();
    const [success, setSuccess] = useState(null);
    const [formErrors, setFormArrors] = useState([]);
    let errors = [];

    const handleClick = async (e) => {
        e.preventDefault();

        if(formData) {

            // check passwords
            formData.password !== formData.password2 && errors.push('Паролі не сходяться');
            
            // check length of inputs
            formData.nickname.length < 2 
                ? errors.push('Нікнейм має бути від 2-20 символів')
                : formData.nickname > 20 
                    && errors.push('Нікнейм має бути від 2-20 символів')
            
            formData.password.length < 6 
                ? errors.push('Пароль має бути від 6-20 символів')
                : formData.nickname > 20 
                    && errors.push('Пароль має бути від 6-20 символів')

            const emailValidator = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            const checkedEmail = emailValidator.test(String(formData.email).toLowerCase());

            !checkedEmail && errors.push('Не корректний e-mail!');

            if(errors.length > 0){
                setFormArrors(errors);
            }else{
                // send form data to backend;
                try{   

                    const res = await publicRequest.post('/auth/register', {
                        username: formData.nickname,
                        email: formData.email,
                        password: formData.password
                    });

                    res && setSuccess("isOk");

                }catch(e){
                    setSuccess("error")
                    console.log(e);
                }
            }
        }
    }

  return (
    <LoginWrapper>
        <LoginContent>
            <Title>Реєстрація</Title>
            
            {formErrors && formErrors.map((item, iterator) => (
                <div key={iterator} style={{color: "darkred", padding: "5px 0"}}>
                    {item}
                </div>
            ))}

            {success === "isOk"
                ?   (<FormMessage className="successLabel">Ви успішно зареєструвались!</FormMessage>)
                :   success === "error" 
                    ?  (<Form>
                            <FormMessage color="red" className="errorLabel">Такий Нікнейм або E-mail вже зареєстрований...</FormMessage>
                            <Label>Нікнейм:</Label>
                            <Input onChange={(e) => setFormData(...formData, { nickname: e.target.value})} placeholder={'Придумайте нікнейм'} />
            
                            <Label>E-mail:</Label>
                            <Input onChange={(e) => setFormData(...formData,{ email: e.target.value})} type="email" placeholder={'Ваш дійсний e-mail'} />
            
                            <Label>Пароль:</Label>
                            <Input onChange={(e) => setFormData(...formData,{ password: e.target.value})} type="password" placeholder={'Придумайте пароль'} />
            
                            <Label>Повторіть пароль:</Label>
                            <Input onChange={(e) => setFormData(...formData,{ password2: e.target.value})} type="password" placeholder={'Повторіть пароль'} />
            
                            <Button onClick={handleClick} className='PurpleButton'>Реєстрація</Button>
                        </Form>)
                    : (
                        <Form>
                            <Label>Нікнейм:</Label>
                            <Input onChange={(e) => setFormData({...formData, nickname: e.target.value})} placeholder={'Придумайте нікнейм'} />
            
                            <Label>E-mail:</Label>
                            <Input onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder={'Ваш дійсний e-mail'} />
            
                            <Label>Пароль:</Label>
                            <Input onChange={(e) => setFormData({...formData, password: e.target.value})} type="password" placeholder={'Придумайте пароль'} />
            
                            <Label>Повторіть пароль:</Label>
                            <Input onChange={(e) => setFormData({...formData, password2: e.target.value})} type="password" placeholder={'Повторіть пароль'} />
            
                            <Button onClick={handleClick} className='PurpleButton'>Реєстрація</Button>
                        </Form>
                    )
            }

            <MyLink to={'/login'}>
                Вже зареєстровані?
                <RegisterLink>Увійти на сайт</RegisterLink>
            </MyLink>
        </LoginContent>
    </LoginWrapper>
  )
}

export default Register