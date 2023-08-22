import React, { useState } from 'react';
import styled from 'styled-components';

const OptionForm = ({ onAddOption }) => {
  const [optionText, setOptionText] = useState('');

  const handleAddOption = () => {
    const newOption = {
      text: optionText,
    };
    onAddOption(newOption);
    setOptionText('');
  };

  return (
    <FormContainer>
      <Input
        type="text"
        placeholder="Option Text"
        value={optionText}
        onChange={(e) => setOptionText(e.target.value)}
      />
      <AddButton onClick={handleAddOption}>Add Option</AddButton>
    </FormContainer>
  );
};

// Styled components
const FormContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
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

export default OptionForm;
