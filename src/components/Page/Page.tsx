import React from 'react';
import styled from 'styled-components';
import chakra from '../../assets/svg/BG.svg';

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <div className="chakra-home">
      <img src={chakra} height={1400} alt="chakra" />
    </div>
    <StyledMain>{children}</StyledMain>
  </StyledPage>
);

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
  padding-bottom: ${(props) => props.theme.spacing[5]}px;
  padding-top: 72px;
`;

export default Page;
