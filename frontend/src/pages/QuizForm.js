import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';

const QuizForm = () => {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div style={quizFormStyles}>
      <h2 style={headingStyles}>Create Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        style={inputStyles}
      />
      <QuestionForm onAddQuestion={handleAddQuestion} />
      {/* Render questions */}
      {questions.map((question, index) => (
        <div key={index} style={questionContainerStyles}>
          <h3 style={questionHeadingStyles}>Question {index + 1}</h3>
          <p style={questionTextStyles}>{question.text}</p>
          {/* Render options */}
          <ul style={optionListStyles}>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex} style={optionStyles}>{option.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Styling
const quizFormStyles = {
  background: 'linear-gradient(135deg, #6b6b00, #494747)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
  color: 'white',
  textAlign: 'center',
};

const headingStyles = {
  color: '#f7d049',
  marginBottom: '20px',
};

const inputStyles = {
  width: '100%',
  padding: '10px',
  marginBottom: '20px',
  border: 'none',
  borderRadius: '4px',
};

const questionContainerStyles = {
  marginTop: '20px',
};

const questionHeadingStyles = {
  color: '#f7d049',
};

const questionTextStyles = {
  color: '#cecece',
};

const optionListStyles = {
  listStyleType: 'none',
  padding: '0',
};

const optionStyles = {
  color: '#cecece',
  marginBottom: '6px',
};

export default QuizForm;
