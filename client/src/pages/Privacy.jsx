import styled from '@emotion/styled'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react';
import {tablet, mobile} from '../responsive'

const HomeWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const HeaderWrapper = styled.div`
  height: auto;
  width: 100%;
  background: rgb(43,54,50);
  background: linear-gradient(90deg, rgba(43,54,50,1) 0%, rgba(79,128,165,1) 48%, rgba(114,136,156,1) 100%);
`;

const TermsWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;
const TermsTitle = styled.h1`
  padding: 0 20px; margin: 0;
  margin-top: 30px;
  font-size: 3.4rem;
  letter-spacing: 0.9px;
  font-weight: 600;
  color: #dce9f7;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  ${tablet({
    fontSize: "1.4rem",
    lineHeight: "1.4rem",
    fontWeight: "800"
  })}
`;
const TermsDescription = styled.h3`
  padding: 0 20px 80px 20px;
  margin: 10px 0;
  color: #ccc;
  font-weight: 600;
`;
const Orange = styled.strong`
  color: #ffca3a;
  font-weight: 700;
`;

const TermContent = styled.div`
  max-width: 1280px;
  padding: 80px 0;
  margin: 0 auto;
`;

const Text = styled.p`
  margin: 0;
  padding: 10px 20px;
  color: #333333;
`;

const Header = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  padding: 0 20px;
`;

const HeaderSmall = styled.h4`
  font-size: 1.5rem;
  color: #424242;
  font-weight: 700;
  padding: 0 20px;
`;


const Home = () => {

  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return null;
  }

  return (
    <HomeWrapper id="SiteTop">
      {/* Scroll to the top of the page */}
      <ScrollToTopOnMount />

      {/* Header */}
      <HeaderWrapper>
        <Navbar fromPage />
        
        <TermsWrapper>
          <TermsTitle>Політика конфіденційності</TermsTitle>
          <TermsDescription>
            Останнє оновлення: <Orange>18 August 2021</Orange>
          </TermsDescription>
        </TermsWrapper>
      </HeaderWrapper>

      <TermContent>
        <Text>Data protection is of a particularly high priority for the management of the websmarti.com (from now on, referred to as “websmarti” or “Website”) and projects related to websmarti - Draftium, websmarti Studio, websmarti Blog, websmarti Editor, and all types of Partner & Affiliate Programs.</Text>
        <Text>When the processing of your personal data is necessary, and if there’s no basis for such processing, we will obtain your consent.</Text>
        <Text>Processing of personal data, including your name, address, email address, or phone number will always be in line with the General Data Protection Regulation (GDPR), and in accordance with United States data protection regulations applicable to websmarti.</Text>
        <Text>Via this data protection declaration, we are informing the general public of the nature, scope, and purpose of the personal data we collect, use, and process. Furthermore, you are informed, by this data protection declaration, of the rights to which you are entitled.</Text>
        <Text>As the data controller and data processor, websmarti has implemented numerous technical and organizational measures to ensure complete protection of your personal data through the Website. Since Internet-based data transmissions may have security gaps, absolute protection is not guaranteed. That's why every data subject is free to transfer personal data to us by means of email or phone support.</Text>


        <Header>Name and address of the controller </Header>
        <HeaderSmall>Controller for the General Data Protection Regulation (GDPR) is:</HeaderSmall>
        <Text>
          JETIMPEX, INC.<br />
          affiliated project «websmarti»<br />
          525 NE 14 Avenue,<br />
          Fort Lauderdale,<br />
          FL 33301<br />
          United States<br />
        </Text>
      
        <Text>Owner contact email: legal@websmarti.com</Text>
        
      </TermContent>
      <Footer fromPage />

    </HomeWrapper>
  )
}

export default Home