import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Questions from '../components/Questions';
import { useSelector, useDispatch } from 'react-redux';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom';

const QuizTakingPage = () => {
  const [check, setChecked] = useState(undefined);

  const result = useSelector((state) => state.results.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('trace is:', trace);
    // console.log('queue is', queue);
    // console.log('state is', state);
  });

  function onNext() {
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    setChecked(undefined);
  }

  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    // console.log(check);
    setChecked(check);
  }

  // Finish after queue ends
  if (result.length && result.length >= queue.length) {
    return <Navigate to={'/quizresult'} replace={true}></Navigate>;
  }

  return (
    <Container>
      <h1>Quiz Application</h1>
      <Content>
        <Questions onChecked={onChecked} />
        <ButtonGrid>
          {trace > 0 && <Button onClick={onPrev}>Prev</Button>}
          <Button onClick={onNext}>Next</Button>
        </ButtonGrid>
      </Content>
    </Container>
  );
};

export default QuizTakingPage;

const Container = styled.div`
  font-size: 1.4em;
  color: #5913da;; /* Darkish yellow */
  text-align: center;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const ButtonGrid = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #573b8a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 5px;

  &:hover {
    background-color: #6d44b8;
  }
`;

// Apply global body styles
document.body.style.backgroundColor = '#1a1a1a'; /* Darkish background color */
document.body.style.margin = '0';
document.body.style.padding = '0';
