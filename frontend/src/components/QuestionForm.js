import React, { useState } from 'react';
import styled from 'styled-components';
import OptionForm from './OptionForm';

const QuestionForm = ({ onAddQuestion }) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);

  const handleAddOption = (newOption) => {
    setOptions([...options, newOption]);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      text: questionText,
      options: options,
    };
    onAddQuestion(newQuestion);
    setQuestionText('');
    setOptions([]);
  };

  return (
    <FormContainer>
      <Input
        type="text"
        placeholder="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <OptionForm onAddOption={handleAddOption} />
      <AddButton onClick={handleAddQuestion}>Add Question</AddButton>
    </FormContainer>
  );
};

// Styled components
const FormContainer = styled.div`
  background-color: #f7d049;
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
`;

const AddButton = styled.button`
  background-color: #573b8a;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

export default QuestionForm;
