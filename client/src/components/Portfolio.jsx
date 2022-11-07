import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation } from 'swiper';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

import {mobile, tablet} from '../responsive'

import {useSelector} from 'react-redux'

import Dropper from './Dropper'

import "swiper/css";
import "swiper/css/navigation";

import Feedback from './Feedback';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Section = styled.div`
    position: relative;
    background-color: #1F2023;
`;

const PortfolioWrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 100px 0 300px 0;

    ${tablet({
        padding: "20px 30px 120px 30px",
    })}
`;

const SectionInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    ${tablet({
        flexDirection: "column",
        alignItems: "flex-start"
    })}
`;

const Left = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;


const SectionAbout = styled.span`
    color: #7a7a7a;
    font-weight: bold;
    font-size: 0.7rem;
    letter-spacing: 0.9px;
`;

const SectionTitle = styled.h2`
    font-size: 3rem;
    font-weight: bold;
    color: #fff;
    margin: 0; padding: 0;
    letter-spacing: 0.9px;

    ${mobile({
        fontSize: "2rem"
    })}
`;

const SectionDescription = styled.p`
    margin: 0; padding: 0;
    color: #ddd;
    letter-spacing: 0.9px;
    max-width: 60%;
    ${mobile({
        maxWidth: "100%"
    })}
`;

const Right = styled.div`
    flex: 1;

    ${mobile({
        marginTop: "20px",
    })}

`;

const Message = styled.p`
    font-size: 0.9rem;
    font-weight: 200;
    letter-spacing: 0.9px;
    color: #ccc;
    margin: 0; padding: 0;
    margin-bottom: 15px;

    ${tablet({
        marginTop: "20px"
    })}

    ${mobile({
        display: "none"
    })}
`;

const Button = styled.button`
    height: 40px;
    padding: 0 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Slider = styled.div`
    display: flex;
    position: relative;
    margin-top: 80px;
    width: 97%;
    padding: 20px;

    ${tablet({
        marginTop: "20px"
    })}

    ${mobile({
        width: "94%"
    })}
`;

const SlideItem = styled.div`
    flex: 1;
    overflow: hidden;
    height: 100%;
    max-height: 640px;
    border-radius: 15px;
    margin-right: 20px;

    &:hover{
        cursor: pointer;
    }

    ${tablet({
        maxHeight: "450px",
    })}
`;


const Image = styled.img`
    width: 100%;
    height: 100%;
    max-height: 550px;
    object-fit: contein;
    border-radius: 15px;
    overflow: hidden;

    ${mobile({
        objectFit: "cover"
    })}
`;


const SlideTitle = styled.div`
    color: #0d0d0f;
    font-weight: 800;
    font-size: 1.3rem;
    text-align: center;
    margin-top: 10px;
    text-shadow: 0 0 10px rgba(255,255,255,0.3);
`;

const StyledPopup = styled(Popup)`

    
    &-overlay {
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
    }
    
    &-content {

        ${tablet({
            overflowY: "auto",
            overflowX: "hidden",
            width: "80%",
            height: "auto"
        })}
    }
`;

const MySwiper = styled(Swiper)`

    .swiper-button-next{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.8);
        margin-top: -5%;
        box-shadow: 0 0 10px rgba(0,0,0,0.6);
        margin-right: 20px;

        &::after{
            content: '\u2192';
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 800;
            color: #c40703;
            margin-top: -5px;
        }
    }

    .swiper-button-prev{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.8);
        margin-top: -5%;
        box-shadow: 0 0 10px rgba(0,0,0,0.6);
        
        &::after{
            content: '\u2190';
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 800;
            color: red;
            margin-top: -5px;
        }
    }
`;


const Portfolio = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const language = useSelector(state => state.user.language);

    const handleResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect( () => {
        window.addEventListener("resize", handleResize, false);
    }, []);

    const slides = [
        {
            id: 1,
            image: "//res2.weblium.site/res/5c2f6b8e71895c00281869b9/610d54c812a82000222b419b_optimized_910_c910x1427-0x0?nowebp",
            title: "Creative Factory"
        },

        {
            id: 2,
            image: "//res2.weblium.site/res/5c2f6b8e71895c00281869b9/610d54c67d407b0021b58cbe_optimized_971_c971x1336-0x0?nowebp",
            title: "Zeal"
        },

        {
            id: 3,
            image: "//res2.weblium.site/res/5c2f6b8e71895c00281869b9/610d54c5d6c93d00219aae4d_optimized_975_c975x1331-0x0?nowebp",
            title: "NFT Art"
        },

        {
            id: 4,
            image: "//res2.weblium.site/res/5c2f6b8e71895c00281869b9/610d54c67d407b0021b58cbe_optimized_971_c971x1336-0x0?nowebp",
            title: "Zeal"
        },

        {
            id: 5,
            image: "//res2.weblium.site/res/5c2f6b8e71895c00281869b9/610d54c5d6c93d00219aae4d_optimized_975_c975x1331-0x0?nowebp",
            title: "NFT Art"
        },

        {
            id: 6,
            image: "//res2.weblium.site/res/5c2f6b8e71895c00281869b9/610d54c812a82000222b419b_optimized_910_c910x1427-0x0?nowebp",
            title: "Creative Factory"
        },
    ];


  return (
    <Section id="Portfolio">
        <PortfolioWrapper>
            <SectionInfo>
                <Left>
                    <SectionAbout>{language && language === 'ua' ? "Приклади готових сайтів" : "The examples of websites"}</SectionAbout>
                    <SectionTitle>{language && language === 'ua' ? "Портфоліо" : "Portfolio"}</SectionTitle>
                    <SectionDescription>
                        {language && language === 'ua' 
                            ? "Над створенням кожного сайту працює команда професіоналів, які мають великий досвід в сфері дизайну та веб-розробки." 
                            : "Every website we maded - is work by our team what have a lot of practice in web design and programming."
                        }
                    </SectionDescription>
                </Left>
                <Right>
                    <Message>
                        {language && language === 'ua' 
                            ? "Сподобався один із прикладів нижче? Зв'яжіться з нами, і ми запропонуємо рішення, яке ідеально підійде саме для вашого бізнесу!"
                            : "If you like some of this websites - we can make your own looking like that with your niche and design based on your assignments."
                        }
                        
                    </Message>
                    
                    <StyledPopup
                        trigger={<Button className="PurpleButton">{language && language === 'ua' ? "Замовити зараз" : "Order now"}</Button>}
                        modal
                        nested
                        lockScroll
                    >
                    {close => (
                        <div className='modal'>
                            <button className="closeModal" onClick={close}>&times;</button>
                            <Feedback />
                        </div>
                    )}
                    </StyledPopup>
                    
                </Right>
            </SectionInfo>

            <Slider> 
                
                <MySwiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    slidesPerView={width > 900 ? 3 : width > 525 ? 2 : 1}
                >

                    {slides && slides.map(slide => (
                        <SwiperSlide key={slide.id}>
                            <SlideItem>
                                <Link target="_blank" to={slide.image}>
                                    <Image src={slide.image} />
                                </Link>
                                <SlideTitle>{slide.title}</SlideTitle>
                            </SlideItem>
                        </SwiperSlide>
                    ))}
                    

                </MySwiper>
            </Slider>
        </PortfolioWrapper>
        <Dropper img={'SectionBg4.svg'} />
    </Section>
  )
}

export default Portfolio