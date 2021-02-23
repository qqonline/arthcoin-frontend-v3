import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import TokenSymbol from '../../../components/TokenSymbol';

interface TemplateProps {
  title: string;
  action?: any
  symbol: string;
  amount: string;
  buttonLabel: string;
  buttonDisabled: boolean;
  buttonOnClick: () => void;
}

const Template: React.FC<TemplateProps> = (props) => (
  <Content>
    <Label>{props.title}</Label>

    <Actions>
      <IcnonContainer>
        <Icon>
          <TokenSymbol size={40} symbol={props.symbol} />
        </Icon>
        <Amount>{props.amount}</Amount>
      </IcnonContainer>
      {
        props.action || (
          <ButtonContainer>
            <Button
              onClick={props.buttonOnClick}
              disabled={props.buttonDisabled}
              text={props.buttonLabel}
            />
          </ButtonContainer>
        )}
    </Actions>
  </Content>
);

const IcnonContainer = styled.div`
  display: flex;
  width: 100%;
`;
const Content = styled.div`
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  line-height: 1;
  text-align: left;
  padding: 30px;
  flex-direction: column;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */
  color: rgba(255, 255, 255, 0.64);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 15px 0 0;
  @media (max-width: 768px) {
    flex-direction: column;
  } ;
`;

const Icon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  padding: 5px;

  width: 50px;
  height: 50px;
  border-radius: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Amount = styled.div`
  // align-items: center;
  padding: 15px;
  display: flex;
  flex: 1;
  flex-direction: column;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.88);
  justify-content: center;
`;

const ButtonContainer = styled.div`
  color: red;
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
  } ;
`;

export default Template;
