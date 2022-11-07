import styled from '@emotion/styled'
import { tablet , mobile } from '../responsive';
import {useSelector} from 'react-redux'

const SchemaWrapper = styled.div`
    background-color: #1f1f1f;
`;

const Section = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 100px 0;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 50px;

    ${tablet({
        padding: "30px 0",
        flexDirection: "column-reverse"
    })}
`;

const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    ${tablet({
        display: "none"
    })}
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;

    ${tablet({
        padding: "0 20px"
    })}
`;

const Short = styled.span`
    font-size: 0.7rem;
    font-weight: bold;
    color: #7a7a7a;
    text-transform: uppercase;
    letter-spacing: 0.9px;
`;

const Title = styled.h2`
    font-size: 3rem;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    font-weight: 400;
    margin: 0; padding: 0;
    color: #fff;

    ${tablet({
        fontSize: "2.5rem",
    })}
`;

const Description = styled.p`
    font-size: 0.9rem;
    font-weight: 400;
    color: #7a7a7a;
    letter-spacing: 0.9px;
    max-width: 70%;
    margin: 0;
    padding: 0;
    font-style: italic;
`;

const Cases = styled.ul`
    margin: 20px 0; padding: 0;
    list-style: none;
`;

const Case = styled.li`
    display: flex;
    flex-direction: column;
`;

const CaseTitle = styled.h5`
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    font-size: 0.9rem;
    margin: 0; padding: 0;
    margin-bottom: 10px;
`;

const CaseDescription = styled.p`
    font-size: 0.9rem;
    font-weight: 400;
    color: #ccc;
    letter-spacing: 0.9px;
    max-width: 70%;
    margin: 0;
    padding: 0;
    padding-bottom: 30px;
`;


const Schema = () => {

    const language = useSelector(state => state.user.language);

  return (
    <SchemaWrapper id="Schema">
        <Section>
            <ImageWrapper>
                <Image src="https://res2.weblium.site/res/603e60c1ab3b140021bb378e/603f9a4f9d665000211b1d85_optimized?nowebp" />
            </ImageWrapper>

            <Info>

            {language && language === 'ua'
                ? (
                    <> 
                        <Short>Розробка сайту</Short>
                        <Title>Як ми працюємо</Title>
                        <Description>Основні етапи розробки веб-сайтiв вiд студiї WebSmarti</Description>

                        <Cases>
                            <Case>
                                <CaseTitle>1. Залиште заявку на консультацiю</CaseTitle>
                                <CaseDescription>Наш менеджер зв'яжеться з вами i допоможе у наступних кроках по розробцi вашого проекту.</CaseDescription>

                                <CaseTitle>2. Заповнюємо бриф</CaseTitle>
                                <CaseDescription>Задля швидкого розумiння специфiки вашої дiяльностi та розумiння подальших дiй вiд наших профессiоналiв</CaseDescription>

                                <CaseTitle>3. Створення макету</CaseTitle>
                                <CaseDescription>Фахiвцi з галузi користувацького досвiду розробляють структуру головної сторiнки майбутнього сайту.</CaseDescription>

                                <CaseTitle>4. Прототип дизайну</CaseTitle>
                                <CaseDescription>На базi макету розробляемо дизайн вашого сайту, та вiдправляємо вам на узгодження або доопрацювання.</CaseDescription>

                                <CaseTitle>5. Програмуємо сайт</CaseTitle>
                                <CaseDescription>Коли зовнiшнiй вигляд узгоджений, переходимо до програмування функціоналу, наповнення внутрiшніх роздiлiв вашого сайту.</CaseDescription>
                            
                                <CaseTitle>6. Запуск сайту</CaseTitle>
                                <CaseDescription>Пiсля закiнчення розробки та узгодження клiента, ми переносимо сайт до глобального iнтернету, та пiдключаемо до пошукових систем.</CaseDescription>
                            

                                <CaseTitle>7. Завершення угоди</CaseTitle>
                                <CaseDescription>Вирiшальний етап розробки сайту - передача всiх матерiалiв, кодiв, та паролей вiд сервiсiв замовнику сайта.</CaseDescription>
                            
                            </Case>
                        </Cases>
                    </>
                  )
                : (
                    <>

                    <Short>Website development</Short>
                    <Title>How we are work</Title>
                    <Description>Basic pats of development websites from WebSmarti studio</Description>

                    <Cases>
                        <Case>
                            <CaseTitle>1. Make an order request</CaseTitle>
                            <CaseDescription>Our manager will call you and help with next steps.</CaseDescription>

                            <CaseTitle>2. Filling a brief</CaseTitle>
                            <CaseDescription>For quick understanding the specify of your job and what we need to do.</CaseDescription>

                            <CaseTitle>3. Making a sketch</CaseTitle>
                            <CaseDescription>Our professionals making a sketch of your future website and structure of webpages</CaseDescription>

                            <CaseTitle>4. Design prototype</CaseTitle>
                            <CaseDescription>On the base sketch we create a template of design and sending to you for acception.</CaseDescription>

                            <CaseTitle>5. Creating functionality</CaseTitle>
                            <CaseDescription>When the visuals are accepted we going to functionality of website. And filling the basic content.</CaseDescription>
                        
                            <CaseTitle>6. Launching website</CaseTitle>
                            <CaseDescription>After successfully development we going to launch the website globaly that any person with any device can get access to your website.</CaseDescription>
                        

                            <CaseTitle>7. Ending the deal</CaseTitle>
                            <CaseDescription>Final action is sending to you all the data and all passwords and configuration files.</CaseDescription>
                        
                        </Case>
                    </Cases>

                    </>
                  )
            }

                
            </Info>
        </Section>
    </SchemaWrapper>
  )
}

export default Schema