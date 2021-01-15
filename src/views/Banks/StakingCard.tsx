import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
interface AccountButtonProps {
  title: string;
  logo: string;
  subtitle: string;
  description: string;
  buttonText: string;
  appyPercentage: string;
}

const StakingCard: React.FC<AccountButtonProps> = ({
  title,
  logo,
  subtitle,
  description,
  buttonText = 'Stake Now',
  appyPercentage,
}) => {
  return (
    <CardContainer>
      <img src={logo} alt={title} width="65px" className="margin-top-bottom-20" />
      <span className="white font26 bold-800">{title}</span>
      <span className="white font16 bold-600 margin-bottom-15">{subtitle}</span>
      <span className="white font16 bold-200 margin-bottom-15" style={{ textAlign: 'center' }}>
        {description}
      </span>
      <DiscountDiv>{`${appyPercentage}% Filled`}</DiscountDiv>
      <div style={{ maxWidth: '200px', marginBottom: '20px', marginTop: '20px' }}>
        <Button text={buttonText} />
      </div>
    </CardContainer>
  );
};
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  box-shadow: 0px 12px 24px -4px rgba(0, 0, 0, 0.12), 0px 16px 20px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;
const DiscountDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 20px 0px;
  padding: 10px 20px;
`;
export default StakingCard;
