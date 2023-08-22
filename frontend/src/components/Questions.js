import React, { useEffect, useState } from 'react';
import { styled, createGlobalStyle } from 'styled-components';
// import data from '../data';

import { useFetchQestion } from '../hooks/FetchQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { updateResultAction } from '../redux/result_reducer';
import { updateResult } from '../hooks/setResult';

function Questions({ onChecked }) {
  const [{ isLoading, apiData, serverError }, setGetData] = useFetchQestion();

  // useSelector(state => console.log(state))

  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.results.result);
  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(undefined);

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  useEffect(() => {
    setChecked(undefined); // Reset checked state when question changes
  }, [trace]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <LoadingText>Loading...</LoadingText>;
  if (serverError)
    return <ErrorText>{serverError || 'Unknown Error'}</ErrorText>;

  return (
    <>
      <GlobalStyles />
      <QuestionsContainer>
        <h2>{questions?.question}</h2>

        <OptionsList>
          {questions?.options.map((q, i) => (
            <OptionItem key={i}>
              <Input
                value={true}
                name="options"
                id={`q${i}-option`}
                checked={checked === i}
                onChange={() => onSelect(i)}
              />
              <RadioLabel htmlFor={`q${i}-option`}>{q}</RadioLabel>
              <Checkmark className={`${result[trace] === i ? 'checked' : ''}`} />
            </OptionItem>
          ))}
        </OptionsList>
      </QuestionsContainer>
    </>
  );
}

export default Questions;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OptionItem = styled.li`
  margin-bottom: 10px;
`;

const Input = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const RadioLabel = styled.label`
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  color: white;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    background-color: transparent;
    transition: background-color 0.3s ease-in-out;
  }

  ${Input}:checked + &::before {
    background-color: #573b8a;
    border-color: #573b8a;
  }
`;

const Checkmark = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 2px solid #573b8a;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;

  &.checked {
    background-color: #573b8a;
    border-color: #573b8a;
  }
`;

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #2c3e50; /* Darkish background color */
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`;

const PageContainer = styled.div`
  background-color: #2c3e50; /* Darkish background color */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionsContainer = styled.div`
  background-color: #f39c12; /* Darkish yellow color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 800px;
`;

const LoadingText = styled.h3`
  color: white;
`;

const ErrorText = styled.h3`
  color: red;
`;