
import styled from '@emotion/styled'
import {mobile, tablet} from '../responsive'

const DropperWrapper = styled.div`
    position: absolute;
    bottom: ${props => props.down ? props.down : "0"};
    height: ${props => props.height ? props.height : "260px"};
    width: 100%;
    background: ${props => props.image ? `url('${props.image}') 100%` : "#424242"};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    ${props => props.toRotate && "transform: rotate(-180deg)"};

    ${mobile({
      maxHeight: "60px"
    })}

    ${tablet({
      maxHeight: "120px"
    })}
`;

const Dropper = (props) => {
  return (
    <DropperWrapper height={props.height && props.height} toRotate={ props.rotate && "true"} image={props.img} down={props.bottom}>
    </DropperWrapper>
  )
}

export default Dropper