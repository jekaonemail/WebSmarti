import styled from '@emotion/styled';

const SettingsWrapper = styled.div``;

const Title = styled.h4`
  margin: 0; padding: 0;
  color: #7a7a7a;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  ${props => props.margin && "margin-top: 15px"};
  margin-bottom: 20px;

  &::after{
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    background-color: #ccc;
    margin: 0;
    margin-top: 10px;
    ${props => props.margin && "display: none"};
  }
`;

const Section = styled.div``;
const SectionTitle = styled.h5`
  font-size: 1.8rem;
  font-weight: 400;
  color: #333;
  margin: 0; padding: 0;
`;
const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;
const Language = styled.div`
  padding: 10px;
  color: ${props => props.active ? "#333" : "#7a7a7a"};
  border-bottom: 1px solid #eee;
  border-radius: 3px;
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1px;
  background-color: ${props => props.active ? "#f9f9f9" : "#fff"};


  &:hover{
    ${props => !props.active && "box-shadow: 0 0 5px rgba(0,0,0,0.3)"};
    ${props => !props.active && "cursor: pointer"};
  }

  
  &::after{
    ${props => props.active ? "content: 'За замовчуванням'" : "content: 'Встановити'"};
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 300;
    color: #7a7a7a;
  }
`;

const AdminSettings = () => {
  return (
    <SettingsWrapper>
      <Title>Налаштування сайту</Title>

      <Section>
        <SectionTitle>Налаштування мови</SectionTitle>
        <LanguageWrapper>
          <Language active>Українська</Language>
          <Language>Англійська</Language>
          <Language>Кітайська</Language>
          <Language>Німецька</Language>
        </LanguageWrapper>
      </Section>
    </SettingsWrapper>
  )
}

export default AdminSettings