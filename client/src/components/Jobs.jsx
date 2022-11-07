import styled from '@emotion/styled'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useState} from 'react';

import {mobile, tablet} from '../responsive'
import {useSelector} from 'react-redux'

const JobsWrapper = styled.div`
    background-color: #1f2023;
    padding: 50px 0;

    ${tablet({
        padding: "20px 0 80px 0",
    })}
`;

const Content = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
`;

const ShortDescription = styled.span`
    color: #ccc;
`;

const SectionTitle = styled.h2`
    color: #fff;
    margin: 0;
    padding: 0;
    font-size: 3rem;
    letter-spacing: 0.9px;
    font-weight: 600;

    ${tablet({
        fontSize: "2rem"
    })}

    ${mobile({
        fontSize: "1.6rem"
    })}
`;

const SectionDescription = styled.p`
    color: #ddd;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.9px;
    margin: 0; padding: 0;
    max-width: 50%;
    text-align: center;

    ${mobile({
        maxWidth: "100%",
        padding: " 0 20px"
    })}
`;

const Navigation = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;

    ${mobile({
        height: "36px",
    })}
`;

const NavigationItem = styled.div`
    
    height: 34px;
    padding: 0 15px;
    font-weight: 300;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    color: ${props => props.active ? "#fff" : "#7a7a7a"};
    ${props => props.active && "border-bottom: 2px solid #fff600"};
    transition: all 0.2s ease;
    text-align: center;

    &:hover{
        color: ${props => props.active ? "#fff" : "#eee"};
        cursor: ${props => props.active ? "default" : "pointer"};
    }

    width: ${props => props.width && props.width};


    ${mobile({
        transform: "translateX(50px)",
        fontSize: "0.9rem",
        letterSpacing: "0.9px",
        padding: "0 5px",
        height: "28px"
    })}
`;


const CardsWrapper = styled.div`
    background-color: #424242;
    width: 80%;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
`;

const Card = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 30px;

    ${tablet({
        alignItems: "center",
        gap: "10px",
        flexDirection: "column"
    })}
`;

const ImageWrapper = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const CardInfoWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;

    ${tablet({
        gap: "5px",
    })}

    ${mobile({
        flex: 2,
    })}
`;

const CardTitle = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1.3rem;
    font-weight: bold;
    color: #fff;
    letter-spacing: 0.9px;

    ${tablet({
        fontSize: "1.2rem"
    })}
`;

const CardDescription = styled.p`
    color: #eee;
    letter-spacing: 0.9px;
    font-weight: 300;
    font-size: 1rem;
    margin: 0; padding: 0;
    
    ${tablet({
        fontSize: "0.9rem",
        lineHeight: "0.9rem",
        marginBottom: "15px"
    })}
`;

const Pluses = styled.ul`
    list-style: none;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    margin: 0; padding: 0;
    gap: 15px;

    ${mobile({
        display: "none"
    })}
`;

const Ok = styled.span`
    color: #fff600;
`;

const Plus = styled.li`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 15px;
    color: #fff;
    letter-spacing: 0.9px;

    ${tablet({
        fontSize: "0.9rem",
        letterHeight: "0.9rem"
    })}
`;



const Jobs = () => {

    const [activeCard, setActiveCard] = useState(1);
    const language = useSelector(state => state.user.language);

    const cards = [
        {
            cardId: 1,
            cardLink: "Лендінги",
            cardLinkWidth: "60px",
            cardImage: "//res2.weblium.site/res/603e60c1ab3b140021bb378e/603f9a8078cbac0021fc3fef_optimized?nowebp",
            cardTitle: "Цiльовi веб-сайти",
            cardDescription: "Тип сайту цiль якого залучити клiєнта до бажаної дiї. Покупка товару, послуги, тощо.",
            cardOpportunities: [
                "Акцент на вигодi та перевагах вашої пропозицiї",
                "Кращiй варiант для запуску реклами та залучення клiєнтiв",
                "Пiдходить для аналiзу попиту та тестування поведiнки споживачiв"
            ]
        },

        {
            cardId: 2,
            cardLink: "Багатосторінкові",
            cardLinkWidth: "120px",
            cardImage: "https://res2.weblium.site/res/603e60c1ab3b140021bb378e/603f99819d665000211b1c4c_optimized?nowebp",
            cardTitle: "Багатосторінкові сайти",
            cardDescription: "Вся потрiбна iнформацiя про вашу дiяльнicть - на одному порталi! Розкажiть людям про вашi переваги",
            cardOpportunities: [
                "Великий сайт - це змога розкрити душу вашої компанiї, залучити нових клiєнтiв",
                "Покращiти впiзнанiсть вашої компанiї, та залучитись бiльшою лояльнiстю вiд Ваших користувачiв",
                "Бiльше iнформацiї про вас на сайтi - бiльше потенцiйних клiєнтiв з інтернету"
            ]
        },

        {
            cardId: 3,
            cardLink: "Магазини",
            cardLinkWidth: "80px",
            cardImage: "https://res2.weblium.site/res/603e60c1ab3b140021bb378e/603f997f34a28300216a4124_optimized?nowebp",
            cardTitle: "Продавайте в Iнтернетi!",
            cardDescription: "Контролюйте всi замовлення, та приймайте оплату онлайн через зручний функцiонал iнтернет-магазину",
            cardOpportunities: [
                "Додавайте необмежену кiлькiсть товарiв чи послуг",
                "Нашi фахiвцi обов'язково допоможуть з первинною настройкою та навчать працювати з системою.",
                "Розкажiть про свiй продукт необмеженiй кiлькостi людей"
            ]
        },
    ];

    const cardsEn = [
        {
            cardId: 1,
            cardLink: "Landing page",
            cardLinkWidth: "120px",
            cardImage: "//res2.weblium.site/res/603e60c1ab3b140021bb378e/603f9a8078cbac0021fc3fef_optimized?nowebp",
            cardTitle: "Type of website for get your assignments",
            cardDescription: "Target is attract a client to action what you want. Buy some product, make a call etc.",
            cardOpportunities: [
                "Accent for profit for clients by your propose",
                "Best way for starting ads company and attract a clients",
                "For analisis demand and user experiance"
            ]
        },

        {
            cardId: 2,
            cardLink: "Many pages",
            cardLinkWidth: "120px",
            cardImage: "https://res2.weblium.site/res/603e60c1ab3b140021bb378e/603f99819d665000211b1c4c_optimized?nowebp",
            cardTitle: "Multiple page sites",
            cardDescription: "All your information that people needs to know in one place. Tell the clients who you are and why they need to cooperate with you.",
            cardOpportunities: [
                "Big webisite - is possibility for open your soul to the clients and save them for future.",
                "Make more productivity and remembering of your website.",
                "More info about you - more potencial clients from the internet"
            ]
        },

        {
            cardId: 3,
            cardLink: "E-Commerce",
            cardLinkWidth: "120px",
            cardImage: "https://res2.weblium.site/res/603e60c1ab3b140021bb378e/603f997f34a28300216a4124_optimized?nowebp",
            cardTitle: "Sell in the internet!",
            cardDescription: "Control the all orders and get peyment online via nicely web-services",
            cardOpportunities: [
                "You can add the products or your services with no limit",
                "Our team will help you with setting up and explain how to work with system.",
                "Tell about your product with no-limit count of custumers."
            ]
        },
    ]

    const linkClickHandler = (cardId) => {
        setActiveCard(cardId);
        const AllLinks = document.getElementsByClassName('navigationLink');

        switch(cardId){
            case 1:
                for(let i = 0; i < AllLinks.length; i++) {
                    AllLinks[i].style.transform = "translateX(80px)";
                }

                break;

            case 2:
                for(let i = 0; i < AllLinks.length; i++) {
                    AllLinks[i].style.transform = "translateX(-0.1px)";
                }
                break;
            default:
                for(let i = 0; i < AllLinks.length; i++) {
                    AllLinks[i].style.transform = "translateX(-100px)";
                }
        }

        
    }

    const renderLinks = (cardData) => {

        if(cardData.cardId === activeCard) {
            return(
                <div key={cardData.cardId}>
                    <NavigationItem
                        className="navigationLink"
                        width={cardData.cardLinkWidth}
                        active
                    >
                        {cardData.cardLink}
                    </NavigationItem>
                </div>
            )
        } else {
            return(
                <div key={cardData.cardId}>
                    <NavigationItem
                        className="navigationLink" 
                         width={cardData.cardLinkWidth}
                        onClick={() => linkClickHandler(cardData.cardId)}
                    >{cardData.cardLink}</NavigationItem>
                </div>
            )
        }
    }

    const renderCard = (cardData) => {
        
        if(cardData.cardId === activeCard){
            return(
                <Card key={cardData.cardId}>
                    <ImageWrapper>
                        <Image src={cardData.cardImage} />
                    </ImageWrapper>

                    <CardInfoWrapper>
                        <CardTitle>{cardData.cardTitle}</CardTitle>

                        <CardDescription>
                            {cardData.cardDescription}
                        </CardDescription>

                        <Pluses>

                            {cardData.cardOpportunities && cardData.cardOpportunities.map(opportunity => (
                                <Plus key={opportunity}>
                                    <Ok><CheckCircleIcon /></Ok>
                                    {opportunity}
                                </Plus>
                            ))}

                        </Pluses>
                    </CardInfoWrapper>
                </Card>
            )
        }
    }

  return (
    <JobsWrapper id="Jobs">
        <Content>
            <ShortDescription>
                {
                    language && language === 'ua'
                        ? "Види робіт"
                        : "Types of work"
                }
            </ShortDescription>
            
            <SectionTitle>
                {
                    language && language === 'ua'
                        ? "Послуги в розробцi"
                        : "Support with development"
                }
            </SectionTitle>
            <SectionDescription>
                {
                    language && language === 'ua'
                        ? "Ми розробляемо сайти пiд ключ, вiд простих односторiнкових сайтiв до iнтернет-магазинiв. Для нас головне у розробцi веб-сайтiв - це якiсть роботи, та увага до дрiбниць."
                        : "We develop websites from A to Z from easyest one page website langing to e-commerce stores with a lot of functionality."
                
                }
            </SectionDescription>
        
            <Navigation>
                {language && language === 'ua' 
                    ? cards && cards.map(item => renderLinks(item))
                    : cardsEn && cardsEn.map(item => renderLinks(item))
                }
            </Navigation>

            <CardsWrapper>
                {language && language === 'ua' 
                    ? cards && cards.map(item => renderCard(item))
                    : cardsEn && cardsEn.map(item => renderCard(item))
                }
            </CardsWrapper>
        </Content>
    </JobsWrapper>
  )
}

export default Jobs