import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { setuserId } from '../redux/result_reducer';

function Home() {
  const inputref = useRef(null);
  const dispatch = useDispatch();

  function startQuiz() {
    if (inputref.current?.value) {
      dispatch(setuserId(inputref.current?.value));
    }
  }

  return (
    <Container>
      <Title>Quiz Application</Title>

      <FormUser>
        <Input ref={inputref} type="text" placeholder="Username" />
      </FormUser>

      <Start>
        <StyledLink to="/quiztaking" onClick={startQuiz}>
          Start Quiz
        </StyledLink>
      </Start>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  font-size: 1.4em;
  color: #e8b400; /* Darkish yellow */
`;

const Title = styled.h1`
  font-size: 1.4em;
  color: #e8b400; /* Darkish yellow */
  display: flex;
  justify-content: center;
`;

const FormUser = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 4em;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  outline: none;
  font-size: 1em;
`;

const Start = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2em;
`;

const StyledLink = styled(Link)`
  color: #e8b400; /* Darkish yellow */
  text-decoration: none;
  font-size: 1.2em;

  &:hover {
    text-decoration: underline;
  }
`;

// Apply global body styles
document.body.style.backgroundColor = '#1a1a1a'; /* Darkish background color */
document.body.style.margin = '0';
document.body.style.padding = '0';
