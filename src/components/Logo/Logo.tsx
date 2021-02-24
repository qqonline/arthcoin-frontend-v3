import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import farmer from '../../assets/img/arthLogo.svg';

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <StyledLogo>
        <img alt="arth" src={farmer} height="40" style={{ marginTop: -3 }} />
      </StyledLogo>
    </Link>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
  margin-right: 15px;
`;

export default Logo;
