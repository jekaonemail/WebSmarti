import styled from '@emotion/styled';
import React from 'react'
import { CrisisAlert, Equalizer, RocketLaunch } from '@mui/icons-material';
import Dropper from './Dropper';
import {mobile, tablet} from '../responsive'
import {useSelector} from 'react-redux'

const ContentWrapper = styled.div`
  position: relative;
`;

const BenefitsWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 50px 0 300px 0;
  gap: 10px;

  ${tablet({
    padding: "50px 0 130px 0"
  })}
`;

const ShortExplain = styled.span`
  color: #7a7a7a;
  font-size: 0.8rem;
  font-weight: 400;
  text-transform: uppercase;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-weight: 600;
  font-size: 3rem;
  color: #333;
  margin: 0; padding: 0 20px;

  ${tablet({
    fontSize: "2rem",
    lineHeight: "3rem",
    lineHeight: "2rem"
  })}
`;

const SectionDescription = styled.p`
  color: #333;
  font-size: 0.95rem;
  letter-spacing: 0.9px;
  margin: 0; padding: 0 20px;
  max-width: 60%;

  ${tablet({
    maxWidth: "100%"
  })}
`;

const CardsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 30px;
  padding: 0 20px;

  ${mobile({
    flexDirection: "column",
    gap: "10px"
  })}

  ${tablet({
    gap: "10px"
  })}
`;

const Card = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgb(252,252,252);
  background: linear-gradient(90deg, rgba(252,252,252,1) 0%, rgba(238,239,240,1) 100%);
  z-index: -1;
  margin-top: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);


  ${tablet({
    maxWidth: "100%"
  })}

`;

const CardIcon = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: #000;
  color: #fff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 0 15px;

  &::after{
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    background-color: orange;
    position: absolute;
    right: -5px;
    border-radius: 3px;
    top: -5px;
    z-index: -1;
  }
`;

const CardTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  margin: 0;
  padding: 0 15px;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  letter-spacing: 0.9px;
  margin: 0; padding: 0 15px;
`;



const Benefits = () => {
  const language = useSelector(state => state.user.language)

  return (
  <ContentWrapper>
    <BenefitsWrapper id="Benefits">
      <ShortExplain>{language && language === 'ua' ? "Спiвпраця з нами це" : "Work with us"}</ShortExplain>
      
      <SectionTitle>{language && language === 'ua' ? "Ваша пiдтримка у сферi IT" : "We're your support in IT scope"}</SectionTitle>
      <SectionDescription>{language && language === 'ua' 
        ? "WebSmarti - це ексклюзивнi рiшення ваших завдань вiд профессiоналiв котрi дiйсно вмiють вирiшувати потреби клiєнтiв" 
        : "WebSmarti - is exclusive desigions for your assignments from professionals that really understand what they're doing and are can to implement them."}
      </SectionDescription>

      <CardsWrapper>
        <Card>
          <CardIcon>
            <CrisisAlert />
          </CardIcon>

          <CardTitle>{language && language === 'ua' ? "Веб-сайт для бiзнесу" : "Website for business"}</CardTitle>

          <CardDescription>
            
            {
              language && language === 'ua' 
                ? "Грунтуючись на глибокому аналiзу нiшi- ми розробляємо сайти якi дiйсно залишаються в пам'ятi ваших клiєнтiв."
                : "Based on deep analysis of your niche - we are creating websites that people are remember for long time."
            }
          </CardDescription>
        </Card>
        
        <Card>
          <CardIcon>
            <Equalizer />
          </CardIcon>

          <CardTitle>
          {
            language && language === 'ua' 
              ? "Неперевершений стиль"
              : "Unforgetable style"
          }
          </CardTitle>

          <CardDescription>
            {
              language && language === 'ua' 
                ? "Замовляючи веб-сайт - ми гарантуємо iндивiдуальний пiдхiд та дизайн який справе незабутнє враження на ваших вiдвiдувачiв."
                : "Work with us - is individual approach and design that call your users to do what you want"
            
            }
          </CardDescription>
        </Card>

        <Card>
          <CardIcon>
            <RocketLaunch />
          </CardIcon>

          <CardTitle>
            {
              language && language === 'ua'
                ? "Без обмежень"
                : "No limits"
            }
          </CardTitle>

          <CardDescription>
          {
            language && language === 'ua'
              ? "Ми розробляемо сайти будь-якоi складностi. Замовляючи сайт-вiзитку, лендiнг, iнтернет-магазин - будьте впевненi, ви у надiйних руках!"
              : "No metter how difficult your project! You can order anything you want whether a Langing-Page, company-official website, or e-commerce store."
          }
          </CardDescription>
        </Card>
      </CardsWrapper>
    </BenefitsWrapper>
    
    <Dropper img={'SectionBg3.svg'} />
  </ContentWrapper>
  )
}

export default Benefits