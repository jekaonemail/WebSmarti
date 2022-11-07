
import styled from '@emotion/styled'
import Feedback from './Feedback';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import {tablet, mobile} from '../responsive';

import { Close, Menu } from '@mui/icons-material';

import {useState, useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux'

import {Link} from 'react-router-dom'

import UserInfo from './user/UserInfo';

import {changeLanguage} from '../redux/userRedux';


const NavbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1280px;
    margin: 0 auto;
    height: 100px;

    ${tablet({
        height: "70px",
        position: "relative"
    })}
`;

const Logotype = styled.h4`
    font-size: 2rem;
    color: #fff;
    font-weight: 800;
    margin: 0;
    padding: 0 20px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.5s ease;
    margin-top: -5px;

    &:hover{
        color: #000;
    }
`;

const NavbarLinks = styled.div`
    position: relative;
    display: flex;
    align-items: center ;
    justify-content: center;
    gap: 30px;

    ${tablet({
        display: "none",
        flexDirection: "column",
        position: "absolute",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        top: "15px",
        right: "20px",
        backgroundColor: "#FFF",
        gap: "10px",
        padding: "30px 35px",
        zIndex: "1",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.6)",
    })}

    
`;

const NavbarLink = styled.span`
    color: #fff;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;

    &:hover{
        color: #000;
    }

    ${tablet({
        color: "#333",
        fontSize: "1rem",
        marginRight: "50px"
    })}
`;

const LanguageWrapper = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
    gap: 10px;

    ${tablet({
        flex: 1,
    })}

    ${mobile({
        display: "none"
    })}
`;

const Language = styled.li`
    color: ${props => props.active ? "orange" : "#ccc"};
    font-size: 0.8rem;
    font-weight: bold;
    padding-right: 10px;
    border-right: 1px solid #84aece;
    cursor: pointer;

    &:hover{
        color: ${props => props.active === true ? "orange" : "#ddd"};
        cursor: ${props => props.active === true ? "default" : "pointer"}
    }

    &:last-child{
        border: none;
    }
`;

const OrderButton = styled.button`

    height: 40px;
    border : 2px solid #fff;
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    text-transform: uppercase;
    padding: 0 25px;
    font-size: 0.7rem;
    transition: all 0.2s ease;
    letter-spacing: .9px;
    margin-right: 30px;

    &:hover{
        background-color: #fff;
        color: #000;
    }

    ${tablet({
        marginRight: "20px",
    })}

    ${mobile({
        display: "none"
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

const Activity = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin: 0; padding: 0;
    margin-right: 20px;
    cursor: pointer;
    display: none;

    ${tablet({
        display: "flex",
    })}
`;

const MyLink = styled(Link)`
    border: none;
    text-decoration: none;
`;



const Navbar = (props) => {

    const nav = document.getElementById('Navigation');
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const language = useSelector(state => state.user.language);
    const dispatch = useDispatch();

    const [languageState, setLanguageState] = useState('ua');

    useEffect(() => {

        switch(languageState){
            case "en":
                // change to english
                dispatch(changeLanguage('en'))

                break;

            case "ua":
                // change to Ukrainian
                dispatch(changeLanguage('ua'))

                break;
        }

    }, [languageState])

    const Categories = [
        {
            id: 1,
            categoryNameUa: "Наші послуги",
            categoryNameEn: "Jobs",
            scrollTarget: "Jobs"
        },

        {
            id: 2,
            categoryNameUa: "Портфоліо",
            categoryNameEn: "Portfolio",
            scrollTarget: "Portfolio"
        },

        {
            id: 3,
            categoryNameUa: "Ціни",
            categoryNameEn: "Prices",
            scrollTarget: "Prices"
        },

        {
            id: 4,
            categoryNameUa: "Контакти",
            categoryNameEn: "Contacts",
            scrollTarget: "Footer"
                      }];
    const renderCategories = (categoriesData) => {

        const handleCategoryClick = () => {

            // if the window are lowest then tablet size - hide menu
            // if window width size more then tablet width then show menu.
            if(window.innerWidth <= 992){
                hideNavigate();
            }

            // find scroll element and scroll into it.
            const location = document.getElementById(categoriesData.scrollTarget)
            location && location.scrollIntoView({behavior: "smooth"});
        }

        return(
            <div key={categoriesData.id}>
                <NavbarLink onClick={handleCategoryClick}>{language && language === "ua" ? categoriesData.categoryNameUa : categoriesData.categoryNameEn}</NavbarLink>
            </div>
        )
    }

    const renderLinkCategories = (categoriesData) => {

        return(
            <div key={categoriesData.id}>
                <MyLink to="/" state={{target: categoriesData.scrollTarget}}>
                    <NavbarLink>{language && language === "ua" ? categoriesData.categoryNameUa : categoriesData.categoryNameEn}</NavbarLink>
                </MyLink>
            </div>
        )
    }

    const handleResize = () => {
        setWindowSize(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize, false)
    },[])

    if(windowSize >= 993) {
        if(nav){
            if(nav.style.display === "none") {
                nav.style.display = "flex";
            }
        }
    } else {
        if(nav) {
            if(nav.style.display === "flex"){
                nav.style.display = "none";
            }
        }
    }

    const showNavigate = () => {
        const navigationObject = document.getElementById('Navigation');

        navigationObject.style.display = "flex"
    }

    const hideNavigate = () => {
        const navigationObject = document.getElementById('Navigation');
        
        navigationObject.style.display = "none"
    }




  return (
    <>  
        <NavbarWrapper id="Navbar">
            <MyLink to={'/'}>
                <Logotype>WebSmarti</Logotype>
            </MyLink>

            <NavbarLinks id="Navigation">
                <Activity>
                    <Close onClick={() => {
                        if(window.innerWidth <= 992) {
                            hideNavigate();
                        }
                        }} sx={{
                            fontSize: "2rem",
                            color: "orange",
                            position: "absolute",
                            right: "10px", top: "15px",
                            cursor: "pointer"
                        }} 
                    />
                </Activity>
                
                {!props.fromPage 
                    ? Categories && Categories.map((item) => renderCategories(item))
                    : Categories && Categories.map((item) => renderLinkCategories(item))
                }
            </NavbarLinks>

            <LanguageWrapper>
                <Language onClick={() => setLanguageState('en')} active={language && language === 'en' ? true : false}>EN</Language>
                <Language onClick={() => setLanguageState('ua')} active={language && language === 'ua' ? true : false}>UA</Language>
            </LanguageWrapper>

            {
                props.isAdmin 
                    ? (<UserInfo />)
                    : (
                        <StyledPopup
                            trigger={<OrderButton>{language && language === "ua" ? "Замовити сайт" : "Order now"}</OrderButton>}
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
                      )
            }

            <Activity>
                <Menu onClick={showNavigate} sx={{fontSize: "3rem"}}/>
            </Activity>
            
        </NavbarWrapper>
    </>
  )
}

export default Navbar