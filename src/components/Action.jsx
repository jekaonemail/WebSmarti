import styled from '@emotion/styled';
import Feedback from './Feedback';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {useSelector} from 'react-redux';
import {mobile, tablet} from '../responsive';


const ActionWrapper = styled.div`
    position: relative;
    background-color: #202024;
    padding: 50px 0;
`;


const Content = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
`;

const Short = styled.span`
    font-weight: 600;
    font-size: 0.7rem;
    color: #7a7a7a;
    letter-spacing: 0.9px;
    text-transform: uppercase;
`;

const Title = styled.h3`
    font-weight: 600;
    font-size: 2.5rem;
    color: #FFF;
    letter-spacing: 0.9px;
    margin: 0; padding: 0;
    text-align: center;

    ${tablet({
        fontSize: "2rem",
        padding: "10px 20px"
    })}
`;

const Description = styled.p`
    font-weight: 300;
    font-size: 1rem;
    color: #f5f5f5;
    letter-spacing: 0.9px;
    width: 40%;
    text-align: center;
    margin: 0; padding: 0;

    ${tablet({
        width: "80%"
    })}




`;

const Button = styled.button`
    height: 50px;
    padding: 0 25px;
    width: 150px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;

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


const Action = () => {
  const language = useSelector(state => state.user.language);


  return (
    <ActionWrapper>

        <Content id="Contacts">
            {language && language === 'ua'
                ? (
                    <>
                        <Short>Залиште заявку</Short>
                        <Title>Давайте створемо Ваш сайт!</Title>
                        <Description>Залиште вашi контакти, та ми з вами зв'яжемося та проконсультуемо у подальшiй спiвпрацi.</Description>

                        <StyledPopup
                            trigger={<Button className="OrangeButton">Консультація</Button>}
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
                    </>
                  )
                : (
                    <>
                        <Short>Make an order</Short>
                        <Title>Lets create your own website!</Title>
                        <Description>Fill the form below and we will call you as soon as we can.</Description>

                        <StyledPopup
                            trigger={<Button className="OrangeButton">Consultation</Button>}
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
                    </>
                  )
            }
        </Content>
    </ActionWrapper>
  )
}

export default Action