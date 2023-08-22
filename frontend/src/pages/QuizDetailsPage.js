import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const QuestionForm = styled.form`
  margin-bottom: 20px;
`;

const QuestionInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const OptionInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const CorrectAnswerCheckbox = styled.input`
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const AddQuestionButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const QuizAdmin = () => {
  const [questions, setQuestions] = useState([
    {
      question: '',
      type: 'multiple-choice',
      options: [{ value: '', isCorrect: false }],
    },
  ]);

  const addQuestion = () => {
    setQuestions(prevQuestions => [
      ...prevQuestions,
      {
        question: '',
        type: 'multiple-choice',
        options: [{ value: '', isCorrect: false }],
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ value: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleCheckboxChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].isCorrect =
      !updatedQuestions[questionIndex].options[optionIndex].isCorrect;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <Container>
      {questions.map((q, questionIndex) => (
        <QuestionForm key={questionIndex}>
          <QuestionInput
            type="text"
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
          />
          <select
            value={q.type}
            onChange={(e) => updateQuestion(questionIndex, 'type', e.target.value)}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="open-ended">Open Ended</option>
          </select>
          {q.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <OptionLabel>
                <CorrectAnswerCheckbox
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={() => handleCheckboxChange(questionIndex, optionIndex)}
                />
                <OptionInput
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option.value}
                  onChange={(e) =>
                    updateQuestion(questionIndex, 'options', [
                      ...q.options.slice(0, optionIndex),
                      { ...option, value: e.target.value },
                      ...q.options.slice(optionIndex + 1),
                    ])
                  }
                />
              </OptionLabel>
              <DeleteButton onClick={() => deleteOption(questionIndex, optionIndex)}>
                Delete Option
              </DeleteButton>
            </div>
          ))}
          <AddQuestionButton onClick={() => addOption(questionIndex)}>
            Add Option
          </AddQuestionButton>
          <DeleteButton onClick={() => deleteQuestion(questionIndex)}>
            Delete Question
          </DeleteButton>
        </QuestionForm>
      ))}
      <AddQuestionButton onClick={addQuestion}>Add Question</AddQuestionButton>
    </Container>
  );
};

export default QuizAdmin;
