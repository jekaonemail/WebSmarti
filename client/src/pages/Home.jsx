import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Billboard from '../components/Billboard'
import Benefits from '../components/Benefits'
import Jobs from '../components/Jobs'
import Portfolio from '../components/Portfolio'
import Prices from '../components/Prices'
import Callback from '../components/Callback'
import Schema from '../components/Schema'
import Questions from '../components/Questions'
import Action from '../components/Action'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import {tablet} from '../responsive'

const HomeWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const HeaderWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(43,54,50);
  background: linear-gradient(90deg, rgba(43,54,50,1) 0%, rgba(79,128,165,1) 48%, rgba(114,136,156,1) 100%);

  ${tablet({
    height: "auto"
  })}
`;

const Home = () => {

  // Check the orders was made in localstorage exists
  const ordersWasMade = localStorage.getItem('ordersWasMade');
  if(!ordersWasMade){
    localStorage.setItem('ordersWasMade', '0');
  }


  const location = useLocation();

  function ScrollToTopOnMount() {
    useEffect(() => {
      
      if(!location.state){
        window.scrollTo(0, 0);
      }else{
        document.getElementById(location.state.target).scrollIntoView({behavior: "smooth"})
      }

    
    }, []);
  
    return null;
  }

  return (
    <HomeWrapper>
      {/* Scroll to top */}
      <ScrollToTopOnMount />

      <HeaderWrapper>
        <Navbar />
        <Billboard />  
      </HeaderWrapper>

       <Benefits />
      <Jobs />
      <Portfolio />
      <Prices />
      <Callback />
      <Schema />
      <Questions />
      <Action />
      <Footer /> 

    </HomeWrapper>
  )
}

export default Home