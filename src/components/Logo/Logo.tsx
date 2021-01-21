import React from 'react';
import styled from 'styled-components';

import farmer from '../../assets/img/basis-cash-logo.svg';

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <img alt="arth" src={farmer} height="40" style={{ marginTop: -3 }} />
      <StyledLink href="/">ARTH</StyledLink>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[100]};
  text-decoration: none;
  font-size: 20px;
  margin-right: 30px;
  font-weight: 700;
  margin-left: 15px;
`;

export default Logo;
