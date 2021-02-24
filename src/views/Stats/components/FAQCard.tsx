import React from 'react';
import styled from 'styled-components';
import ArrowUp from '../../../assets/img/ArrowUp.svg';
import ArrowDown from '../../../assets/img/ArrowDown.svg';

interface FaqProps {
  question: string;
  answer: string;
}

const FAQCard: React.FC<FaqProps> = ({ question, answer }) => {
  const [showAnswer, toggleAnswer] = React.useState(false);
  return (
    <FaqCard>
      <QuestionDiv onClick={() => toggleAnswer(!showAnswer)}>
        <QuestionTitle>{question}</QuestionTitle>
        {showAnswer ? (
          <img src={ArrowUp} width="24px" alt="ArrowUp" />
        ) : (
          <img src={ArrowDown} width="24px" alt="ArrowUp" />
        )}
      </QuestionDiv>
      {showAnswer && <AnswerTitle>{answer}</AnswerTitle>}
    </FaqCard>
  );
};
const AnswerTitle = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  margin-top: 32px;
  opacity: 0.88;
`;
const FaqCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-sizing: border-box;
  padding: 36px 32px;
`;
const QuestionDiv = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const QuestionTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.88;
`;
export default FAQCard;
