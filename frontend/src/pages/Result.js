import React, { useEffect } from 'react'
import { styled ,createGlobalStyle} from 'styled-components';
import { Link } from 'react-router-dom';
import ResulTable from '../components/ResulTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import { usePublishResult } from '../hooks/setResult';

const Result = () => {

    const dispatch = useDispatch()

    const { questions: { queue, answers }, results: { result, userId } } = useSelector(state => state)

    useEffect(() => {
        console.log(result)
    })

    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result)
    const earnpoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnpoints)

    usePublishResult({
      result,
      username:userId,
      attempts,
      points:earnpoints,
      achived:flag? "Passed":"Failed"
    })
    function onRestart() {
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }

    return (
        <>
            <GlobalStyles />
            <Container>
                <Title>Quiz Application</Title>

                <Resulta>
                    <Flexit>
                        <span>Username</span>
                        <Bolded>{userId}</Bolded>
                    </Flexit>
                    <Flexit>
                        <span>Total Quiz Points : </span>
                        <Bolded>{totalPoints}</Bolded>
                    </Flexit>
                    <Flexit>
                        <span>Total Questions : </span>
                        <Bolded>{queue.length}</Bolded>
                    </Flexit>
                    <Flexit>
                        <span>Total Attempts : </span>
                        <Bolded>{attempts}</Bolded>
                    </Flexit>
                    <Flexit>
                        <span>Total Earn Points : </span>
                        <Bolded>{earnpoints}</Bolded>
                    </Flexit>
                    <Flexit>
                        <span>Quiz Result</span>
                        <Bolded style={{ color: `${flag ? "green" : "red"}` }}>{flag ? "Passed" : "Failed"}</Bolded>
                    </Flexit>
                </Resulta>

                <Start>
                    <Link className='btn' to='/home' onClick={onRestart}>Restart</Link>
                </Start>

                <Container>
                    <ResulTable />
                </Container>
            </Container>
        </>
    )
}

export default Result

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #1a1a1a;
    color: #fff;
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
`;

const Flexit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Bolded = styled.span`
  font-weight: bold;
`;

const Title = styled.h1`
  color: #ffd700;
`;

const Start = styled.div`
  margin-top: 20px;

  .btn {
    background-color: #ffd700;
    color: #000;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease-in-out;
    
    &:hover {
      background-color: #f2c41a;
    }
  }
`;

const Resulta = styled.div`
  background-color: #2a2a2a;
  padding: 10px;
  border-radius: 5px;
`;
