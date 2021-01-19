import React, { useState } from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '../Container';
import Logo from '../Logo';

import AccountButton from './components/AccountButton';
import Nav from './components/Nav';
import TxButton from './components/TxButton';
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 8,
      color: 'white',
      border: '1px solid white',
      fontSize: 14,
      padding: '0px 5px',
      marginRight: '20px',
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      position: 'relative',
      backgroundColor: 'transparent',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
      },
    },
  }),
)(InputBase);
const TopBar: React.FC = () => {
  const [networkType, setNetworkType] = React.useState('mainnet');
  const [showWarning, toggleWarning] = useState(false);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNetworkType(event.target.value as string);
  };

  return (
    <>
      <StyledTopBar>
        <Container size="lg">
          <StyledTopBarInner>
            <div style={{ flex: 1 }}>
              <Logo />
            </div>
            <Nav />
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <TxButton />
              {/* <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={netWrokType}
                onChange={handleChange}
                input={<BootstrapInput />}
                IconComponent={() => <ExpandMoreIcon className="white" />}
              >
                <MenuItem value="mainnet">Mainnet</MenuItem>
                <MenuItem value="testnet">Testnet</MenuItem>
              </Select> */}
              <AccountButton />
            </div>
          </StyledTopBarInner>
        </Container>
      </StyledTopBar>
      {showWarning && (
        <ShowWarning>
          <InfoOutlinedIcon className="margin-right-5" />
          Please make sure that you are connected to matic mumbai TESTnet.
          <CloseIcon
            style={{ position: 'absolute', right: '50px' }}
            className="pointer"
            onClick={() => toggleWarning(false)}
          />
        </ShowWarning>
      )}
    </>
  );
};

const StyledTopBar = styled.div``;
const ShowWarning = styled.div`
  background: #ba1e38;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.88);
  text-align: center;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;
const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
  flex-wrap: wrap;
`;

export default TopBar;
