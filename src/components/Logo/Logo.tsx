import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import farmer from '../../assets/img/basis-cash-logo.svg';

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <img alt="arth" src={farmer} height="40" style={{ marginTop: -3 }} />
      <Link to="/">
        <StyledLink>ARTH</StyledLink>
      </Link>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.div`
  color: ${(props) => props.theme.color.grey[100]};
  text-decoration: none;
  font-size: 20px;
  margin-right: 30px;
  font-weight: 700;
  margin-left: 15px;
`;

export default Logo;
