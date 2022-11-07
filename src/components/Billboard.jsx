import styled from '@emotion/styled'
import { ExpandMore } from '@mui/icons-material';

import Feedback from './Feedback';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {useSelector} from 'react-redux'

import {mobile, tablet} from '../responsive'

const BillboardWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    align-items: stretch;
    justify-content: space-between;
    gap: 30px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 30px;

    ${tablet({
        gap: "10px",
        justifyContent: "center",
        padding: "40px 20px 60px 20px",
    })}

    ${mobile({
        flexDirection: "column"
    })}
`;
const BillboardLeft = styled.div`
    flex: 1;
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

`;

const Image = styled.img`
    width: 100%;
    height: 80%;
    object-fit: contain;
`;

const BillboardRight = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 30px;

    ${tablet({
        gap: "15px",
    })}

    ${mobile({
        justifyContent: "flex-start",
        alignItems: "center"
    })}
`;
const Title = styled.h1`
    margin: 0;
    padding: 0;
    margin-top: -20px;
    font-weight: 200;
    font-size: 6rem;
    text-transform: uppercase;
    line-height: 6rem;
    color: #fff;

    ${tablet({
        width: "100%",
        fontSize: "2.5rem",
        lineHeight: "2.5rem",
        marginTop: "0",
        textAlign: "left"
    })}

    ${mobile({
        marginTop: "0",
        fontSize: "2rem",
        lineHeight: "2rem",
        textAlign: "center"
    })}
`;

const Description = styled.p`
    width: 100%;
    color: #ccc;
    letter-spacing: 0.9px;
    margin: 0;
    padding: 0;

    ${tablet({
        fontSize: "0.9rem",
        textAlign: "left",
        maxWidth: "80%",
    })}

    ${mobile({
        textAlign: "center",
        margin: "0 auto"
    })}
`;

const Button = styled.button`
    height: 50px;
    border: none;
    padding: 0 25px;
    border-radius: 5px;
    text-transform: uppercase;
    letter-spacing: 0.9px;
    font-weight: bold;
    font-size: 0.7rem;
    cursor: pointer;

    ${tablet({
        height: "40px",
        padding: "0 15px",
        fontSize: "0.65rem",
    })}

    ${mobile({
        margin: "0 auto"
    })}
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

const BottomArrow = styled.div`
    background-color: transparent;
    border: 2px solid #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    bottom: 15%;
    transform: translate(-50%, -5%);
    color: #fff;
    transition: all 0.5s ease;
    cursor: pointer;
    z-index: 1;

    &:hover{
        color: #333;
        border: 2px solid #333;
    }

    ${tablet({
        display: "none",
    })}
`;

const Billboard = () => {
    const language = useSelector(state => state.user.language);

    const ScrollTarget = "Benefits";

    const clickHandler = () => {
        const item = document.getElementById(ScrollTarget);
        item.scrollIntoView({ behavior: "smooth"})
    }

  return (
    <BillboardWrapper>
        <BillboardLeft>
            <Image src={"/billboard2.png"} />
        </BillboardLeft>

        <BillboardRight>
            <Title>WEB-DESIGN STUDIO</Title>
            <Description>
                {
                    language && language === 'ua' 
                        ? "Сайти виготовленi за останнiми технологiями для вашого бiзнесу вiд профессiоналiв. Залиште заявку на бескоштовну консультацiю."
                        : "The websites what was maded by last technologies for your business from professional team. Make an order for now and we will response you instantly"
                }   
            </Description>

            <StyledPopup
                trigger={<Button className="OrangeButton">{language && language === 'ua' ? "Замовити сайт" : "Order a website"}</Button>}
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
        </BillboardRight>
        <BottomArrow onClick={clickHandler}>
            <ExpandMore />
        </BottomArrow>
    </BillboardWrapper>
  )
}

export default Billboard