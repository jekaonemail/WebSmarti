import styled from '@emotion/styled'
import {Facebook, Instagram, Telegram, GitHub, PhonelinkRing, Email, ArrowUpward} from '@mui/icons-material';
import {Link} from 'react-router-dom'
import {mobile, tablet} from '../responsive'
import {useSelector} from 'react-redux';

const FooterWrapper = styled.div`
    background-color: #202024;
    padding: 0;
    padding-top: 50px;
`;


const Content = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 50px;
    border-top: 1px solid #424242;
    padding: 50px 30px;

    ${tablet({
        flexDirection: "column",
        gap: "20px"
    })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    ${tablet({
        flexDirection: "row",
        flexWrap: "wrap",
        position: "relative"
    })}

    ${mobile({
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    })}
`;

const Logotype = styled.h1`
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 800;
    color: #FFF;
    margin: 0; padding: 0;

    ${tablet({
        fontSize: "2.5rem",
    })}
`;

const ShortDescription = styled.p`
    font-size: 1rem;
    font-weight: 400;
    color: #7a7a7a;
    letter-spacing: 0.9px;
`;

const Social = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;

    ${tablet({
        position: "absolute",
        right: "10px",
        top: "10px"
    })}

    ${mobile({
        position: "static"
    })}
`;

const SocialItem = styled(Link)`
    width: 40px;
    height: 40px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    transition: all 0.15s ease;
    cursor: pointer;

    &:hover{
        scale: 1.2;
        color: #fff;
    }
`;

const MyLink = styled(Link)`
    border: none;
    text-decoration: none;
    margin-bottom: 10px;
`;

const Activity = styled.div`
    flex: 3;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 60px;

    ${tablet({
        gap: "30px",
        flex: "1",
        justifyContent: "space-between"
    })}

    ${mobile({
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flexWrap: "wrap"
    })}
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemTitle = styled.h4`
    font-size: 1rem;
    text-transform: uppercase;
    color: #7a7a7a;
    margin: 0; padding: 0;
    font-weight: 600;
    letter-spacing: 0.9px;
    margin-bottom: 15px;

    ${tablet({
        fontSize: "0.7rem"
    })}
`;

const Href = styled.span`
    color: #ddd;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.9px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover{
        color: #fff;
    }
`;

const Contact = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #ccc;
    margin-bottom: 12px;
`;

const Text = styled.span`
    margin-left: 15px;
    font-size: 0.9rem;
    letter-spacing: 0.9px;
    font-weight: 400;
    text-align: left;

    ${mobile({
        fontSize: "0.8rem"
    })}
`;

const EmailLink = styled(Link)`
    margin-left: 15px;
    font-size: 0.9rem;
    letter-spacing: 0.9px;
    font-weight: 400;
    text-align: left;
    text-decoration: none;
    color: #ccc;
    transition: all 0.3s ease;

    &:hover{
        background-color:#424242;
    }

    ${mobile({
        fontSize: "0.8rem"
    })}
`;

const BottomIcon = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 50%;
`;


const Copyright = styled.div`
    position: relative;
    max-width: 1280px;
    padding: 30px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${mobile({
        flexDirection: "column",
        paddingBottom: "150px"
    })}
`;

const CopyLeft = styled.h4`
    color: #7a7a7a;
    font-size: 0.8rem;
    font-weight: 300;
    letter-spacing: 0.9px;
    margin: 0; padding: 0;
`;

const CopyRight = styled.h4`
    color: #7a7a7a;
    font-size: 0.8rem;
    font-weight: 300;
    letter-spacing: 0.9px;
    margin: 0; padding: 0;
`;

const BottomArrow = styled.div`
    background-color: transparent;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #7a7a7a;
    transition: all 0.5s ease;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.9px;
  
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    
    border-bottom: 5px solid #7a7a7a;

    &:hover{
        color: #FFF;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;

        border-bottom: 5px solid #fff;
    }
`;

const Footer = (props) => {

    const clickHandler = (target) => {
        const item = document.getElementById(target);
        item.scrollIntoView({ behavior: "smooth"})
    }

    const language = useSelector(state => state.user.language)


  return (
    <FooterWrapper id="Footer">
        <Content>
            <Left>

                {
                    language && language === 'ua' 
                        ? (
                            <>
                                <Logotype>Websmarti</Logotype>
                                <ShortDescription>WebSmarti Studio розробляє сайти будь-якої складності під ключ за останніми технологіями.</ShortDescription>

                            </>
                          )
                        : (
                            <>
                                <Logotype>Websmarti</Logotype>
                                <ShortDescription>WebSmarti Studio develop websites with no limit of weight with the last technologies and beutiful design tips.</ShortDescription>

                            </>
                          )
                }
                
                <Social>
                    <SocialItem onClick={(e) => {
                            window.location.href = "https://www.facebook.com"
                        }}>
                        <Facebook />
                    </SocialItem>

                    <SocialItem onClick={(e) => {
                            window.location.href = "https://www.instagram.com/web_smarti"
                        }}>
                        <Instagram />
                    </SocialItem>

                    <SocialItem onClick={(e) => {
                            window.location.href = "https://t.me/websmarti"
                        }}>
                        <Telegram />
                    </SocialItem>

                    <SocialItem onClick={(e) => {
                            window.location.href = "https://www.github.com"
                        }}>
                        <GitHub />
                    </SocialItem>
                </Social>
            </Left>

            {language && language === 'ua'
                ? (
                     <Activity>
                        <Item>
                            <ItemTitle>Швидка навігація</ItemTitle>
                            
                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Schema"}}>
                                        <Href>Етапи розробки</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Schema')}>Етапи розробки</Href>)
                            }

                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Portfolio"}}>
                                        <Href>Портфоліо</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Portfolio')}>Портфоліо</Href>)
                            }

                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Prices"}}>
                                        <Href>Ціни</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Prices')}>Ціни</Href>)
                            }

                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Questions"}}>
                                        <Href>Питання & Відповіді</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Questions')}>Питання & Відповіді</Href>)
                            }
                        </Item>

                        <Item>
                            <ItemTitle>Корисна інформація</ItemTitle>
                            
                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Benefits"}}>
                                        <Href>Чому ми</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Benefits')}>Чому ми</Href>)
                            }
                            
                            
                            <MyLink to={'/terms'}>
                                <Href>Умови використання</Href>
                            </MyLink>

                            <MyLink to={'/privacy'}>
                                <Href>Політика конфіденційності</Href>
                            </MyLink>

                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Footer"}}>
                                        <Href>Контакти</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Footer')}>Контакти</Href>)
                            }
                            
                        </Item>

                        <Item>
                            <ItemTitle>Зв`язок</ItemTitle>
                            
                            <Contact>
                                <BottomIcon ><PhonelinkRing /></BottomIcon>
                                <Text>Kiyvstar: +38(068) 345-50-39</Text>
                            </Contact>

                            <Contact>
                                <BottomIcon ><PhonelinkRing /></BottomIcon>
                                <Text>Vodafone: +38(050) 849-29-30</Text>
                            </Contact>

                            <Contact>
                                <BottomIcon ><Email /></BottomIcon>
                                <EmailLink 
                                    href="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = "mailto:websmartidesign@gmail.com";
                                    }}>E-mail: websmartidesign@gmail.com</EmailLink>
                            </Contact>
                        </Item>
                    </Activity>
                  )
                : (
                    <Activity>
                        <Item>
                            <ItemTitle>Fast navigate</ItemTitle>
                            
                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Schema"}}>
                                        <Href>Development parts</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Schema')}>Development parts</Href>)
                            }

                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Portfolio"}}>
                                        <Href>Portfolio</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Portfolio')}>Portfolio</Href>)
                            }

                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Prices"}}>
                                        <Href>Prices</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Prices')}>Prices</Href>)
                            }

                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Questions"}}>
                                        <Href>Questions & Answers</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Questions')}>Questions & Answers</Href>)
                            }
                        </Item>

                        <Item>
                            <ItemTitle>Information</ItemTitle>
                            
                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Benefits"}}>
                                        <Href>Why we?</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Benefits')}>Why we?</Href>)
                            }
                            
                            
                            <MyLink to={'/terms'}>
                                <Href>Terms of use</Href>
                            </MyLink>

                            <MyLink to={'/privacy'}>
                                <Href>Privacy policy</Href>
                            </MyLink>

                            {props.fromPage
                                ? (
                                    <MyLink to="/" state={{target: "Footer"}}>
                                        <Href>Contacts</Href>
                                    </MyLink>
                                  )
                                : (<Href onClick={() => clickHandler('Footer')}>Contacts</Href>)
                            }
                            
                        </Item>

                        <Item>
                            <ItemTitle>{language && language === 'ua' ? "Зв`язок" : "Communicate"}</ItemTitle>
                            
                            <Contact>
                                <BottomIcon ><PhonelinkRing /></BottomIcon>
                                <Text>Kiyvstar: +38(068) 345-50-39</Text>
                            </Contact>

                            <Contact>
                                <BottomIcon ><PhonelinkRing /></BottomIcon>
                                <Text>Vodafone: +38(050) 849-29-30</Text>
                            </Contact>

                            <Contact>
                                <BottomIcon ><Email /></BottomIcon>
                                <EmailLink 
                                    href="#" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = "mailto:websmartidesign@gmail.com";
                                    }}>E-mail: websmartidesign@gmail.com</EmailLink>
                            </Contact>
                        </Item>
                    </Activity>
                  )
            }

            
        </Content>

        <Copyright>
            <BottomArrow onClick={() => clickHandler('Navbar')}>
                <ArrowUpward />
                {language && language === 'ua' ? "Вгору" : "Up" }
            </BottomArrow>
            
            <CopyLeft>&copy; WebSmarti 2022</CopyLeft>
            <CopyRight>Copyright &copy; 2022 | {language && language === 'ua' ? "Всі права захищені." : "All rights reserved"}</CopyRight>
        </Copyright>
    </FooterWrapper>
  )
}

export default Footer