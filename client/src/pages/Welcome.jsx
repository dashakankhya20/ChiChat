import React, {useContext} from 'react';
import styled from 'styled-components';
import robotHi from "../utils/images/robot-image.png";
import { MyContext } from '../MyContext';

const Welcome = () => {
  const {user} = useContext(MyContext);
  return (
    <Container>
        <img src={robotHi} alt="Robot on Welcome Page!" />
        <h1>Welcome, <span>{user.firstName} !</span></h1>
        <p>Please select a chat to start messaging...</p>
    </Container>
  )
}

const Container = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
gap:1rem;
color:white;
img {
  height:20rem;
}
span {
  color: #4e00ff;
}
`;
export default Welcome