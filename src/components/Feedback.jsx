import styled from '@emotion/styled';
import { useState } from 'react';
import {publicRequest} from '../request';
import {CheckCircle} from '@mui/icons-material'

import {mobile, tablet} from '../responsive';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'

const FeedbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #000;
  margin: 0;
  padding: 0;
  letter-spacing: 0.9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  ${tablet({
    fontSize: "1.3rem",
    width: "100%",
    textAlign: "left",
    display: "flex",
    flexDirection: "column"
  })}
`;

const Description = styled.p`
  margin: 0; padding: 0;
  font-size: 1rem;
  color: #333;
  letter-spacing: 0.9px;
  font-weight: 300;
  text-align: center;
  
  ${tablet({
    fontSize: "0.95rem",
    textAlign: "left"
  })}
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 15px;
`;

const FormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  padding: 0 25px;
  color: #333;
  font-size: 0.9rem;
  font-weight: 400;
  border-radius: 5px;
  border: none;
  background-color: #f5f5f5;

  &:hover{
    background-color: #f3f3f3;
  }

  &:focus{
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

  ${mobile({
    height: "36px",
    padding: "0 15px",
    fontSize: "0.8rem"
  })}
`;

const Button = styled.button`
  height: 70px;
  cursor: pointer;
  padding: 0 25px;
  border: none;
  font-size: 0.8rem;
  letter-spacing: 0.9px;
  font-weight: bold;
  width: 100%;

  ${mobile({
    height: "50px"
  })}
`;


const Message = styled.p`
    margin: 0; padding: 0;
    color: #7a7a7a;
    font-size: 0.8rem;
`;

const Information = styled.span`
    text-decoration: none;
    color: #000;
    margin-left: 10px;
    cursor: pointer;
`;

const CardPrice = styled.span`
  font-weight: bold;
  font-size: 1.6rem;
  color: orange;
  margin: 0;
  padding: 0;
`;


const ErrorMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: 500;
  align-items: center;
  gap: 5px;
  margin-top: 15px;
  width: 100%;
`;
const ErrorMessages = styled.p`
  padding: 10px;
  background-color: #8c5d77;
  color: #fcbafc;
  border-radius: 5px;
  margin: 0;
  width: 100%;
`;

const Feedback = (props) => {
  const language = useSelector(state => state.user.language);


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: ""
  });
  const [message, setMessage] = useState(false);

  const [formErrors, setFormErrors] = useState([]);
  const [postedOrder, setPostedOrder] = useState();

  useEffect(() => {
    setFormData({...formData, type: props.isPlan ? props.isPlan.name : "No plan"});
  }, []);

  let errors = [];


  const sendHandler = async (e) => {
    e.preventDefault();

    if(formData) {
      if(language && language === 'ua'){
        formData.name.length < 2 
          ? errors.push('Ім`я має будти від 1 до 30 символів, якщо у вас ім`я довше ніж 30 символів - подзвоніть будь ласка по номеру внизу сайту і ми виправимо цей ліміт.')
          : formData.name.length > 30
            && errors.push('Ім`я має будти від 1 до 30 символів, якщо у вас ім`я довше ніж 30 символів - подзвоніть будь ласка по номеру внизу сайту і ми виправимо цей ліміт.')

        
          formData.phone.length < 9 
            ? errors.push('Номер телефону має бути від 9 - до 30 символів')
            : formData.phone.length > 30
              && errors.push('Номер телефону має бути від 9 - до 30 символів')
          
          const ordersWasMade = localStorage.getItem('ordersWasMade');
          let convertedOrdersWasMade = Number(ordersWasMade);

          convertedOrdersWasMade > 3 && errors.push('Ліміт відправки замовлень вичерпано. Але ви завжди можете подзвонити.');

          if(errors.length > 0){
            
            setFormErrors(errors);

          }else{
            try{

              await publicRequest.post("orders/new", {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                type: formData.type
              });
              
              setFormErrors(false);
              setMessage(true);

              const ordersWasMade = localStorage.getItem('ordersWasMade');
              let convertedOrdersWasMade = Number(ordersWasMade);
              convertedOrdersWasMade += 1;

              localStorage.setItem('ordersWasMade', `${convertedOrdersWasMade}`);  
            }catch(e){
              setMessage(false);
              setPostedOrder("Ордер з таким номером, або e-mail вже існує");
              console.log("Can't send order: "+ e);
            }
          }
        }else{ // ENGLISH
          formData.name.length < 2 
            ? errors.push('Name have to be from 1 to 30 symbols')
            : formData.name.length > 30
              && errors.push('Name have to be from 1 to 30 symbols')

          
            formData.phone.length < 9 
              ? errors.push('Phone number have to be from 9 to 30 symbols')
              : formData.phone.length > 30
                && errors.push('Phone number have to be from 9 to 30 symbols')
            
            const ordersWasMade = localStorage.getItem('ordersWasMade');
            let convertedOrdersWasMade = Number(ordersWasMade);

            convertedOrdersWasMade > 3 && errors.push('Orders sending limit. If you have some question please make a call to us.');

            if(errors.length > 0){
              
              setFormErrors(errors);

            }else{
              try{

                await publicRequest.post("orders/new", {
                  name: formData.name,
                  phone: formData.phone,
                  email: formData.email,
                  type: formData.type
                });
                
                setFormErrors(false);
                setMessage(true);

                const ordersWasMade = localStorage.getItem('ordersWasMade');
                let convertedOrdersWasMade = Number(ordersWasMade);
                convertedOrdersWasMade += 1;

                localStorage.setItem('ordersWasMade', `${convertedOrdersWasMade}`);  
              }catch(e){
                setMessage(false);
                setPostedOrder("Order with this number or email are exists.");
                console.log("Can't send order: "+ e);
              }
            }
        }

      
    } // end formData
  }

  if(!props.isPlan){
    return (
      <FeedbackWrapper>

        {message
          ? language && language === 'ua'
            ? (
                  <Info>
                    <Title><CheckCircle sx={{color: "green", fontSize: "2.5rem"}} />Заявка відправлена</Title>
                    <Description>Ваша заявка успішно відправлена<br /> Очікуйте на дзвінок менеджера.</Description>
                  </Info>
              )
            : (
                  <Info>
                    <Title><CheckCircle sx={{color: "green", fontSize: "2.5rem"}} />Order was send.</Title>
                    <Description>Thank you for your order<br /> We will call you very soon.</Description>
                  </Info>
              )
          
          : language && language === 'ua'
              ? (
                    <>
                      {postedOrder
                        ? (
                            <>
                              <Title>Помилка..</Title>
                              <ErrorMessagesWrapper>
                                <ErrorMessages style={{textAlign: "center"}}>
                                  {postedOrder}
                                </ErrorMessages>
                              </ErrorMessagesWrapper>
                            </>
                          )
                        : formErrors.length > 0
                            ? (
                                <>
                                  <Title style={{width: "100%", textAlign: "left"}}>Помилка..</Title>
                                  <ErrorMessagesWrapper>
                                    {formErrors && formErrors.map((error, iterator) => (
                                      <ErrorMessages key={iterator}>
                                        {error}
                                      </ErrorMessages>
                                    ))}
                                  </ErrorMessagesWrapper>
                                </>
                              )
                            :
                              (
                                <Info>
                                  <Title>Потрібен сайт?</Title>
                                  <Description>Заповніть форму, і ми скоро зв'яжемося з вами, щоб допомогти вибрати відповідний тариф, обговорити деталі та приступити до розробки.</Description>
                                </Info>
                              )
                      }

                      <Form>
                        <FormInput onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Як вас звати?" />
                        <FormInput onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Ваш номер телефону" />
                        <FormInput onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Ваш e-mail (Якщо є)" />

                        <Button onClick={sendHandler} className='PurpleButton'>Відправити</Button>
                      </Form>

                      <Message>
                        Натискаючи на кнопку, ви погоджуєтеся на
                        <Information>обробку персональних даних</Information>
                      </Message>
                    </>
                  )
              :  // ENGLISH
                (
                    <>
                      {postedOrder
                        ? (
                            <>
                              <Title>Sending failure error</Title>
                              <ErrorMessagesWrapper>
                                <ErrorMessages style={{textAlign: "center"}}>
                                  {postedOrder}
                                </ErrorMessages>
                              </ErrorMessagesWrapper>
                            </>
                          )
                        : formErrors.length > 0
                            ? (
                                <>
                                  <Title style={{width: "100%", textAlign: "left"}}>Sending failure error</Title>
                                  <ErrorMessagesWrapper>
                                    {formErrors && formErrors.map((error, iterator) => (
                                      <ErrorMessages key={iterator}>
                                        {error}
                                      </ErrorMessages>
                                    ))}
                                  </ErrorMessagesWrapper>
                                </>
                              )
                            :
                              (
                                <Info>
                                  <Title>Do you want a website?</Title>
                                  <Description>Please fill the form below and we will call you as soon as we can. We will help you to understand what website do you need and discuss with you about development.</Description>
                                </Info>
                              )
                      }

                      <Form>
                        <FormInput onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="How we can call you?" />
                        <FormInput onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone number" />
                        <FormInput onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Your email (if you have it)" />

                        <Button onClick={sendHandler} className='PurpleButton'>Send</Button>
                      </Form>

                      <Message>
                        By clicking the button, you agree to the<Information>processing of personal data</Information>
                      </Message>
                    </>
                  )
        }
      </FeedbackWrapper>
    )
  } else {
    return(
      <FeedbackWrapper>
        {message
          ? (
                <Info>
                  <Title><CheckCircle sx={{color: "green", fontSize: "2.5rem"}} />Заявка відправлена</Title>
                  <Description>Ваша заявка успішно відправлена<br /> Очікуйте на дзвінок менеджера.</Description>
                </Info>
            )
          
          : (
              <>
                {postedOrder
                  ? (
                      <>
                        <Title>Помилка..</Title>
                        <ErrorMessagesWrapper>
                          <ErrorMessages style={{textAlign: "center"}}>
                            {postedOrder}
                          </ErrorMessages>
                        </ErrorMessagesWrapper>
                      </>
                    )
                  : formErrors.length > 0
                      ? (
                          <>
                            <Title style={{width: "100%", textAlign: "left"}}>Помилка..</Title>
                            <ErrorMessagesWrapper>
                              {formErrors && formErrors.map((error, iterator) => (
                                <ErrorMessages key={iterator}>
                                  {error}
                                </ErrorMessages>
                              ))}
                            </ErrorMessagesWrapper>
                          </>
                        )
                      :
                        (
                          <Info>
                            <Title>{language && language === 'ua' ? "Тариф" : "Plan"}: {props.isPlan.name} <CardPrice>{props.isPlan.price}</CardPrice></Title>
                            <Description>{props.isPlan.description}</Description>
                          </Info>
                        )
                }

                {language && language === 'ua' 
                  ? (
                      <>
                      <Form>
                        <FormInput onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Як вас звати?" />
                        <FormInput onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Ваш номер телефону" />
                        <FormInput onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Ваш e-mail (Якщо є)" />

                        <Button onClick={sendHandler} className='PurpleButton'>Відправити</Button>
                      </Form>

                      <Message>
                        Натискаючи на кнопку, ви погоджуєтеся на
                        <Information>обробку персональних даних</Information>
                      </Message>
                      </>
                    )

                  : (
                      <>
                      <Form>
                        <FormInput onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="What is your name?" />
                        <FormInput onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Contact phone number" />
                        <FormInput onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Your e-mail (If you have it)" />

                        <Button onClick={sendHandler} className='PurpleButton'>Send now</Button>
                      </Form>

                      <Message>
                        By clicking the button, you agree to the
                        <Information>processing of personal data</Information>
                      </Message>
                      </>
                    )
                }
                
              </>
            )
        }
      </FeedbackWrapper>
    )
  }
}

export default Feedback