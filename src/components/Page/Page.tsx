import React from 'react';
import styled from 'styled-components';
// import bgImg from '../../assets/img/bgImg.jpeg';
import TopBar from '../TopBar';

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <TopBar />
    <div className="chakra-home"></div>
    {/* <div className="gradient-red-1-home"></div> */}
    <StyledMain
    // style={{ backgroundImage: `url(${bgImg})` }}
    >
      {children}
    </StyledMain>
  </StyledPage>
);

const StyledPage = styled.div``;

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
  padding-bottom: ${(props) => props.theme.spacing[5]}px;
`;

export default Page;
