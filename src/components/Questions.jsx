import styled from '@emotion/styled'
import Dropper from './Dropper'
import {tablet, mobile} from '../responsive';
import {useSelector} from 'react-redux';



const QuestionsWrapper = styled.div`
    position: relative;
    padding: 50px 0 150px 0;
    background: rgb(238,255,249);
    background: linear-gradient(90deg, rgba(238,255,249,1) 0%, rgba(251,255,215,1) 100%);
`;


const Section = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 50px;
    padding: 0 20px 100px 20px;

    ${tablet({
        padding: "0 20px 20px 20px",
        flexDirection: "column"
    })}
    
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Short = styled.span`
    font-size: 0.8rem;
    font-weight: 500;
    color: #333;
    letter-spacing: 0.9px;
`;

const Title = styled.h3`
    font-size: 3rem;
    font-weight: 400;
    color: #000;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    margin: 0;
    padding: 0;

    

    ${mobile({
        fontSize: "2rem"
    })}
`;

const Description = styled.p`
    margin: 0; padding: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: #424242;
    letter-spacing: 0.9px;
`;

const QA = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;


const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Accordion = styled.button``;
const Panel = styled.div``;


const Questions = () => {

    const language = useSelector(state => state.user.language);

    const questions = [
        {
            id: 1,
            question: "Чи є у вас гарантiя?",
            answer: "Так! Ми гарантуємо працездатність вашого сайту тривалістю 6 місяців від дати запуску, алє лише в тому випадку, коли вихідний код веб-сайту був недоторканий. У випадку, якщо клієнт самостійно вносив корективи у програмний код, налагодженя працездатності сайту буде обговорюватись за окрему плату."
        },

        {
            id: 2,
            question: "Як прискорити розробку веб-сайту?",
            answer: "У випадку якщо клієнт потребує створення сайту якомога швидше, клієнт має підготувати матеріали для заповненя веб-сайту. Фото, відео, тексти, баннери, тощо."
        },

        {
            id: 3,
            question: "Що робити якщо макет менi не сподобався?",
            answer: "У ваших інтересах дати обратний зв`язок ментору вашого проекту, який вислухає ваші побажання, та реалізує іншу стратегію розробки."
        },

        {
            id: 4,
            question: "Чи можна замовити додатковий функціонал?",
            answer: "Якщо ваш сайт вже узгоджено, алє виявилась потреба в розширенні функціоналу та додаткових змін, ми уважно вислухаємо ваші побажання та обговоремо подальшу співпрацю."
        },

        {
            id: 5,
            question: "Чи можно вiдмовитись вiд послуг й повернути завдаток?",
            answer: "Так, ви маєте право відмовитись від послуг якщо вас щось не влаштувало, алє тільки до моменту узгодження дизайну."
        }
    ];

    const questionsEn = [
        {
            id: 1,
            question: "Are you garantee your work?",
            answer: "Absolutely yes! We are garantee that your website will work more then 6 month from launch date but only if you not modify source code. If you actually modify code and have some troubles with website so that we can fix them but it's not for free."
        },

        {
            id: 2,
            question: "Can you make website faster?",
            answer: "Yes we can! But you need to prepare the content already. Images, text, headers, titles, names, logotype, etc."
        },

        {
            id: 3,
            question: "I don't like a design. What to do?",
            answer: "We can make another design but before of moment that you are accepted design part."
        },

        {
            id: 4,
            question: "Can I order more functionality?",
            answer: "After the project is finish you can order more functionality but our time not a free and we'd like to make another deal with you for the smart price."
        },

        {
            id: 5,
            question: "Can I cancel my order and take my money back?",
            answer: "Yes you can. But only before you accepted a deal with design part and our specialists starting make work."
        }
    ];

    
    const clickHandler = (id) => {
        const question = document.getElementById(`accordion-${id}`);
        const answer = document.getElementById(`panel-${id}`);

        const questions = document.getElementsByClassName("accordion");
        const panels = document.getElementsByClassName("panel");


        if(question.classList.contains('active')) {
            for(let i of panels) {
                i.style.maxHeight = "0";
            }
    
            for(let o of questions) {
                if(o.classList.contains('active')){
                    o.classList.remove('active');
                }
            }

            answer.style.maxHeight = "0";
            question.classList.remove('active');
        } else {
            for(let i of panels) {
                i.style.maxHeight = "0";
            }
    
            for(let o of questions) {
                if(o.classList.contains('active')){
                    o.classList.remove('active');
                }
            }

            answer.style.maxHeight = "100%";
            question.classList.add('active');
        }
    }
    

  return (
    <QuestionsWrapper id="Questions">
        <Section>
            <Left>
                <Short>{language && language === 'ua' ? "Інформація" : "Information"}</Short>
                <Title>{language && language === 'ua' ? "Питання & Відповіді" : "Questions & Answers"}</Title>
                    
                {language && language === 'ua'
                
                    ? (<Description>Якщо у вас є додатковi питання - залиште заявку на сайтi. Ми будемо радi вас проконсультувати по всiм питанням якi вас турбують.</Description>)
                    : (<Description>If you have more questions please make an order request and we will answer.</Description>)
                }

                

                <QA>

                    {language && language === 'ua' 
                        ? (

                            questions && questions.map(item => (
                                <div key={item.id}>
                                    <Accordion 
                                        id={`accordion-${item.id}`}
                                        className={`accordion`}
                                        onClick={ () => {
                                            clickHandler(item.id)
                                        }}
                                    >
                                        {item.question}
                                    </Accordion>
                                    <Panel id={`panel-${item.id}`} className="panel">
                                        <p>
                                            {item.answer}
                                        </p>
                                    </Panel>
                                </div>
                            ))

                          )
                        : (

                            questionsEn && questionsEn.map(item => (
                                <div key={item.id}>
                                    <Accordion 
                                        id={`accordion-${item.id}`}
                                        className={`accordion`}
                                        onClick={ () => {
                                            clickHandler(item.id)
                                        }}
                                    >
                                        {item.question}
                                    </Accordion>
                                    <Panel id={`panel-${item.id}`} className="panel">
                                        <p>
                                            {item.answer}
                                        </p>
                                    </Panel>
                                </div>
                            ))

                          )
                    }
                </QA>
            </Left>

            <ImageWrapper>
                <Image src="https://res2.weblium.site/res/603e60c1ab3b140021bb378e/603f997134a28300216a410f_optimized?nowebp" />
            </ImageWrapper>
        </Section>
        <Dropper img={'Active.svg'} />
    </QuestionsWrapper>
  )
}

export default Questions