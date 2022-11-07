import React from 'react'
import styled from '@emotion/styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dropper from './Dropper';
import {useSelector} from 'react-redux'
import {tablet, mobile} from '../responsive';


import Feedback from './Feedback';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PricesWrapper = styled.div`
  background-color: #f5f5f5;
  position: relative;
`;

const PageInfo = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 50px 0 150px 0;

  ${tablet({
        padding: "20px 30px 80px 30px",
    })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
`;

const SectionAbout = styled.span`
  font-weight: bold;
  font-size: 0.7rem;
  color: #7a7a7a;
  letter-spacing: 0.9px;
  text-transform: uppercase;
`;
const SectionTitle = styled.h3`
  margin: 0; padding: 0 30px;
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 0.9px;
  text-transform: uppercase;
  text-align: center;

  ${tablet({
    fontSize: "1.4rem"
  })}
`;
const SectionDescription = styled.p`
  margin: 0; padding: 0 30px;
  font-size: 1rem;
  font-weight: 300;
  color: #333333;
  letter-spacing: 0.9px;
  text-align: center;
`;


const CardsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  padding: 20px;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 50px;

  ${tablet({
    padding: "0"
  })}
`;

const Card = styled.div`
  width: 31.5%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  ${tablet({
    width: "100%"
  })}
`;

const CardTitle = styled.h3`
  margin: 0;
  padding: 0 20px;
  font-weight: bold;
  font-size: 2rem;
  color: #424242;
  letter-spacing: 0.9px;
  margin-top: 20px;

  ${tablet({
    fontSize: "1.4rem"
  })}

`;

const CardPrice = styled.span`
  font-weight: bold;
  font-size: 1.8rem;
  color: orange;
  margin: 0;
  padding: 0 20px;
`;

const CardDescription = styled.p`
  color: #333;
  margin: 0; padding: 0 20px;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 0.9px;
`;

const CardItems = styled.ul`
  list-style: none;
  margin: 15px 0; padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CardItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: 0.95rem;
  font-weight: 300;
  color: #424242;
  padding: 0 20px;

`;

const CardButton = styled.button`
  margin: 0 20px;
  height: 40px;
  padding: 0 15px;
  width: 50%;
  margin-bottom: 20px;
  cursor: pointer;
`;

const CardItemText = styled.span`
  margin-left: 15px;
`;


const StyledPopup = styled(Popup)`
    &-overlay {
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
    }

    &-content {
        
        ${tablet({
            width: "80%",
            height: "auto"

        })}

        ${tablet({
            overflowY: "auto",
            overflowX: "hidden",
        })}
    }
`;

const Prices = () => {

  const language = useSelector(state => state.user.language);

  const data = [
    {
      id: 1,
      title: "Сайт візитка",
      description: "Приділяємо особливу увагу створенню емоції і яскравого враження про ваш бренд.",
      price: "$ 250",
      benefits: [
          "Базовий дизайн",
          "2 сторінки",
          "Адаптивна верстка"
      ]
    },

    {
      id: 2,
      title: "Landing page",
      description: "Створюємо продаваючі лендінги з дизайном, що запам'ятовується і максимальної конверсією.",
      price: "$ 400",
      benefits: [
          "Простий дизайн",
          "3 сторінки",
          "Адаптивна верстка"
      ]
    },

    {
      id: 3,
      title: "Бізнес сайт",
      description: "Допомагаємо бізнесу створити правильне позиціонування для розширення партнерської і клієнтської мережі.",
      price: "$ 600",
      benefits: [
          "Просунутий дизайн",
          "4 сторінки",
          "Адаптивна верстка"
      ]
    },

    {
      id: 4,
      title: "Корпоративний сайт",
      description: "Розробляємо корпоративні проекти різної складності і масштабу.",
      price: "$ 700",
      benefits: [
          "Ексклюзивний дизайн",
          "6 сторінки",
          "Адаптивна верстка"
      ]
    },

    {
      id: 5,
      title: "Інтернет-магазин",
      description: "Робимо роботу інтернет-магазину простою і швидкою завдяки спеціальним інструментам.",
      price: "$ 900",
      benefits: [
          "Просунутий дизайн",
          "4 сторінки + сторінки E-Commerce",
          "Адаптивна верстка"
      ]
    },

    {
      id: 6,
      title: "Власний проект",
      description: "Є ідея? Залиште заявку і ми допоможемо її реалізувати!",
      price: "Від $ 1,000",
      benefits: [
          "Ексклюзивний дизайн",
          "Обговорюється",
          "Адаптивна верстка"
      ]
    }
  ];

  const dataEn = [
    {
      id: 1,
      title: "Company website",
      description: "Making a story about your company and explain to the people who you are.",
      price: "$ 250",
      benefits: [
          "Basic design",
          "2 pages",
          "Responsive adaptivity"
      ]
    },

    {
      id: 2,
      title: "Landing page",
      description: "Type of website what will sell for you",
      price: "$ 400",
      benefits: [
          "Minimalism design",
          "3 pages",
          "Responsive adaptivity"
      ]
    },

    {
      id: 3,
      title: "Business website",
      description: "Help your business make a right vision for your costumers.",
      price: "$ 600",
      benefits: [
          "Progressive design",
          "4 pages",
          "Responsive adaptivity"
      ]
    },

    {
      id: 4,
      title: "Corporate website",
      description: "Control the all thigns in on place.",
      price: "$ 700",
      benefits: [
          "Exclusive design",
          "6 pages",
          "Responsive adaptivity"
      ]
    },

    {
      id: 5,
      title: "E-Commerce",
      description: "We will create a store where poople will buy your products and proposes.",
      price: "$ 900",
      benefits: [
          "Exclusive design",
          "4 pages + pages E-Commerce",
          "Responsive adaptivity"
      ]
    },

    {
      id: 6,
      title: "Own projects",
      description: "Have some idea? We can get it in real World!",
      price: "From $ 1,000",
      benefits: [
          "Exclusive design",
          "will speak",
          "Responsive adaptivity"
      ]
    }
  ];

  return (
    <PricesWrapper>

        <PageInfo  id="Prices">
          <Top>
            <SectionAbout>{language && language === 'ua' ? "Ціни" : "Prices"}</SectionAbout>
            <SectionTitle>{language && language === 'ua' ? "Скільки коштує розробка сайту?" : "How many cost the development?"}</SectionTitle>
            <SectionDescription>{language && language === 'ua' ? "Оберіть тип послуги, яка максимально вам підходить" : "Take a look at our plans and pick what will be better for your business."}</SectionDescription>
          </Top>

          {language && language === 'ua' 
            ? (
                <CardsWrapper>

                    {data && data.map(item => (
                      <Card key={item.id}>
                        <CardTitle>{item.title}</CardTitle>
                        <CardPrice>{item.price}</CardPrice>
                        <CardDescription>{item.description}</CardDescription>

                        <CardItems>

                          {item.benefits.map(benefitsItem => (
                            <CardItem key={benefitsItem}>
                              <CheckCircleIcon />
                              <CardItemText>{benefitsItem}</CardItemText>
                            </CardItem>
                          ))}
                          
                        </CardItems>
                        
                        <StyledPopup
                            trigger={<CardButton className="BlackButton">{language && language === 'ua' ? "Замовити сайт" : "Order now"}</CardButton>}
                            modal
                            nested
                            lockScroll
                        >
                        {close => (
                            <div className='modal'>
                                <button className="closeModal" onClick={close}>&times;</button>
                                <Feedback
                                  isPlan={{
                                    name: item.title,
                                    description: item.description,
                                    price: item.price
                                  }}
                                />
                            </div>
                        )}
                        </StyledPopup>
                        
                      </Card>
                    ))}

                  </CardsWrapper>
              )

            : (
                <CardsWrapper>

                  {dataEn && dataEn.map(item => (
                    <Card key={item.id}>
                      <CardTitle>{item.title}</CardTitle>
                      <CardPrice>{item.price}</CardPrice>
                      <CardDescription>{item.description}</CardDescription>

                      <CardItems>

                        {item.benefits.map(benefitsItem => (
                          <CardItem key={benefitsItem}>
                            <CheckCircleIcon />
                            <CardItemText>{benefitsItem}</CardItemText>
                          </CardItem>
                        ))}
                        
                      </CardItems>
                      
                      <StyledPopup
                          trigger={<CardButton className="BlackButton">{language && language === 'ua' ? "Замовити сайт" : "Order now"}</CardButton>}
                          modal
                          nested
                          lockScroll
                      >
                      {close => (
                          <div className='modal'>
                              <button className="closeModal" onClick={close}>&times;</button>
                              <Feedback
                                isPlan={{
                                  name: item.title,
                                  description: item.description,
                                  price: item.price
                                }}
                              />
                          </div>
                      )}
                      </StyledPopup>
                      
                    </Card>
                  ))}

                </CardsWrapper>
              )

          }

          
        </PageInfo>
        <Dropper bottom={'-100px'} img={'CallbackBg.svg'} />
    </PricesWrapper>
  )
}

export default Prices