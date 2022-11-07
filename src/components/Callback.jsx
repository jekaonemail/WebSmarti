import styled from '@emotion/styled';
import Dropper from './Dropper'

import {tablet, mobile} from '../responsive'
import { useState } from 'react';
import { publicRequest } from '../request';
import {useSelector} from 'react-redux'

import { CheckCircle } from '@mui/icons-material'


const CallbackWrapper = styled.div`
    background: rgb(86,138,119);
    background: linear-gradient(90deg, rgba(86,138,119,1) 0%, rgba(207,102,255,1) 100%);    
    position: relative;
`;


const Section = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 100px 20px 200px 20px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 50px;

    ${tablet({
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "80px 20px"
    })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;

    ${tablet({
        maxWidth: "60%",
        alignItems: "center",
        justifyContent: "center"
    })}
`;

const About = styled.span`
    font-weight: bold;
    color: turquoise;
    font-size: 0.7rem;
    letter-spacing: 0.9px;
    text-transform: uppercase;
`;

const Title = styled.h2`
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    margin: 0; padding: 0;
    color: #fff;

    ${tablet({
        fontSize: "2rem",
        textAlign: "center"
    })}

    ${mobile({
        fontSize: "1.4rem"
    })}
`;

const Description = styled.ul`
    list-style: none;
    margin: 0; padding: 0;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.9px;
    color: #7a7a7a;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Item = styled.li`
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.9px;
    color: #ddd;

    ${tablet({
        textAlign: "center",
        maxWidth: "80%",
        margin: "0 auto",
        fontSize: "0.95rem",
        display: "none",
    })}
`;

const Right = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: rgba(0,0,0,0.1);
    padding: 30px;
    border-radius: 10px;

    ${tablet({
        width: "80%",
        padding: "10px 30px"
    })}
`;

const Label = styled.h4`
    font-size: 2rem;
    letter-spacing: 0.9px;
    color: #fff;
    font-weight: 300;
    margin: 0; padding: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Name = styled.input`
    height: 50px;
    padding: 0 25px;
    border: none;
    border-radius: 5px;
`;

const Phone = styled.input`
    height: 50px;
    border: none;
    padding: 0 25px;
    border-radius: 5px;
`;

const Button = styled.button`
    height: 50px;
    border: none;
    padding: 0 25px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
`;

const Message = styled.p`
    margin: 0; padding: 0;
    color: #f5f5f5;
    font-size: 0.8rem;
    ${mobile({
        textAlign: "center"
    })}
`;

const Info = styled.a`
    text-decoration: none;
    color: #000;
    margin-left: 10px;
    cursor: pointer;
`;


const BigMessage = styled.p`
    margin: 0; padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f2ffed;
    height: 200px;
    width :100%;
    border-radius: 10px;
    box-shadow: 0 0 50px rgba(0,0,0,0.2) inset;
`;



const Callback = () => {

    const [isSending, setIsSending] = useState(null);
    const [formErrors, setFormErrors] = useState();
    const language = useSelector(state => state.user.language)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "no-use",
        type: "no-plan"
    });

    let errors = [];

    const [message, setMessage] = useState(false);

    const sendHandler = async (e) => {
        e.preventDefault();

        try {

            formData.name.length < 2 
                ? language && language === 'ua' 
                    ? errors.push('Ім`я має будти від 1 до 30 символів, якщо у вас ім`я довше ніж 30 символів - подзвоніть будь ласка по номеру внизу сайту і ми виправимо цей ліміт.')
                    : errors.push('The name needs to be from 1 to 30 symbols')
                : formData.name.length > 30
                   && language && language === 'ua' 
                        ? errors.push('Ім`я має будти від 1 до 30 символів, якщо у вас ім`я довше ніж 30 символів - подзвоніть будь ласка по номеру внизу сайту і ми виправимо цей ліміт.')
                        : errors.push('The name needs to be from 1 to 30 symbols');
                    

                
            formData.phone.length < 9 
                ? language && language === 'ua'
                    ? errors.push('Номер телефону має бути від 9 - до 30 символів')
                    : errors.push('Number has to be from 9 to 30 symbols')
                
                : formData.phone.length > 30
                    && language && language === 'ua'
                        ? errors.push('Номер телефону має бути від 9 - до 30 символів')
                        : errors.push('Number has to be from 9 to 30 symbols')
                
            
                const ordersWasMade = localStorage.getItem('ordersWasMade');
                let convertedOrdersWasMade = Number(ordersWasMade);
          
                convertedOrdersWasMade > 3 && language && language === 'ua'
                        ? errors.push('Ліміт відправки замовлень вичерпано. Але ви завжди можете подзвонити.')
                        : errors.push('Sending limit. If you need to ask something please make a call.')

            if(errors.length > 0) {
                setFormErrors(errors);
            }else{
                
                await publicRequest.post("orders/new", {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    type: formData.type
                });
        
                setMessage(true);
                setIsSending(true);

                const ordersWasMade = localStorage.getItem('ordersWasMade');
                let convertedOrdersWasMade = Number(ordersWasMade);
                convertedOrdersWasMade += 1;

                localStorage.setItem('ordersWasMade', `${convertedOrdersWasMade}`); 
              }
        } catch (e) {
            setMessage(false);
            console.log(e);
        }
    }

  return (
    <CallbackWrapper>
        <Section>
            <Left>
                <About>{
                            language && language === 'ua'
                                ? isSending 
                                    ? "Гарний вибір" 
                                    : "Зв`язок"
                                
                                : isSending 
                                    ? "Right decision" 
                                    : "Callback"
                            
                        }
                </About>
                <Title>{
                            language && language === 'ua'
                                ? isSending 
                                    ? "Дякуємо за довіру!" 
                                    : "Консультацiя по розробцi сайту"

                                : isSending 
                                    ? "Thanks for your trust!" 
                                    : "Free consultation about website development."
                        }
                </Title>
                <Description>

                    {
                        isSending
                            ? (
                                <Item>{language && language === 'ua' 
                                            ? "Наш менеджер скоро зв`яжеться з вами та обговорить всі деталі по вашему замовленню."
                                            : "Our manager will contact your as soon as he can and explain all the next parts of work"
                                      }</Item>
                              )

                            : (
                                <>
                                    {language && language === 'ua'
                                        ? (
                                            <>
                                                <Item>Заповнiть форму щоб ми могли з вами зв'язатись, i ми обговоремо з вами всi деталi щодо контенту, типу сайту та його дiяльностi.</Item>
                                                <Item>Ми вислухаємо вашi побажання по дизайну та стилю, та зробимо максимально еффективний та крутий веб-сайт для вашого бiзнесу.</Item>
                                            </>
                                          )
                                        :(
                                            <>
                                                <Item>Enter the form that we can contact you and we will speak about all things of content and type of website</Item>
                                                <Item>We will listen what you want about design and content and will create maximum effective and cool website for your business.</Item>
                                            </>
                                         )
                                    }

                                    
                                </>
                              )
                    }
                    
                </Description>
            </Left>

            <Right>
                {message
                    ? (
                        <>
                            <Label><CheckCircle sx={{color: "#ecd3ff", fontSize: "2.5rem"}} />Заявка відправлена!</Label>

                            
                                {language && language === 'ua'
                                    ? (<BigMessage>Ваша заявка успішно відправлена<br /> Очікуйте на дзвінок менеджера.</BigMessage>)
                                    : (<BigMessage>Thank you for trust<br /> Your order are preparing. We will call soon as we can.</BigMessage>)
                                }
                            
                        </>
                      )
                    : (
                        <>
                        
                            <Label>
                                {formErrors && 
                                    formErrors.length > 0 
                                        ? language && language === 'ua' ? "Помилка" : "Error"
                                        : language && language === 'ua' ? "Як з вами зв`язатись?" : "How we can contact you?"}
                            </Label>

                            {formErrors && formErrors.length > 0
                                && formErrors.map((item, iterator) => (
                                        <p style={{
                                            color: "#fff",
                                            margin: "0",
                                            padding: "5px 0",
                                            fontSize: "0.9rem",
                                            fontWeight: "500",
                                        }}>{item}</p>
                                ))
                            }

                            {language && language === 'ua'
                                ? (
                                    <>
                                        <Name onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder='Ваше ім`я' />
                                        <Phone onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder='Номер мобільного' />
                                        <Button onClick={sendHandler} className="OrangeButton">Відправити</Button>
                        
                                        <Message>
                                            Натискаючи на кнопку, ви погоджуєтеся на
                                            <Info>обробку персональних даних</Info>
                                        </Message>
                                    </>
                                  )
                                : (
                                    <>
                                        <Name onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder='Enter your name' />
                                        <Phone onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder='Contact phone number' />
                                        <Button onClick={sendHandler} className="OrangeButton">Send</Button>
                        
                                        <Message>
                                            By pressing this send button you are accept of
                                            <Info>processing your personal data.</Info>
                                        </Message>
                                    </>
                                  )
                            }

                            
                        </>
                      )
                }
                
            </Right>
        </Section>
        <Dropper 
            rotate 
            bottom={'-30px'} 
            img={'CallbackBg2.svg'} 
        />
    </CallbackWrapper>
  )
}

export default Callback