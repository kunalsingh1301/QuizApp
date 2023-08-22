import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const WelcomeMessage = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const DashboardButton = styled.button`
  background-color: ${props => (props.primary ? '#f7b731' : '#2c3e50')};
  color: ${props => (props.primary ? '#fff' : '#fff')};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${props => (props.primary ? '#f39c12' : '#34495e')};
  }
`;


const Dashboard = ({ isAdmin }) => {
  const [loggedInUser, setLoggedInUser] = useState(isAdmin ? 'Admin' : 'User');
  
  const navigate = useNavigate();

  function totakequiz(){
    navigate('/quiztaking')
  }

  function createquiz(){
    navigate('/quizform')
  }

  return (
    <DashboardContainer>
      <WelcomeMessage>Welcome, {loggedInUser}!</WelcomeMessage>
      <ButtonWrapper>
        {isAdmin ? (
          <div>
            <DashboardButton onClick={ createquiz} primary>Create Quiz</DashboardButton>
            <DashboardButton onClick={totakequiz}>Take Quiz</DashboardButton>
          </div>
        ) : (
          <div>
            <DashboardButton onClick={totakequiz}>Take Quiz</DashboardButton>
          </div>
        )}
      </ButtonWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
