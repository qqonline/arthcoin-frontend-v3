import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { CustomSnack } from '../../components/SnackBar';
import Button from '../../components/Button';

interface IRadioButtonList {
  label: string;
  key: string;
}

interface ICStatesInterface {
  IState: 'default' | 'error' | 'warning';
  IMsg: string;
}

const GreenRadio = withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.32)',
    '&$checked': {
      color: '#FF7F57',
    },
  },
  checked: {}
})(Radio);

const Boardrooms = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [selectedTestToken, setSelectedTestToken] = useState<string>('');
  const [accountAddress, setAccountAddress] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [ICStates, setICStates] = useState<ICStatesInterface>({IState: 'default', IMsg: ''})

  const RadioButtonList: IRadioButtonList[] = [
    {
      label: 'ARTH',
      key: 'ARTH',
    },
    {
      label: 'MAHA',
      key: 'MAHA',
    },
    {
      label: 'ETH',
      key: 'ETH',
    },
    {
      label: 'WBTC',
      key: 'WBTC',
    },
    {
      label: 'USDT',
      key: 'USDT',
    },
    {
      label: 'USDC',
      key: 'USDC',
    }
  ]

  const handleChange = (val: string) => {
    setSelectedTestToken(val);
  };

  useEffect(() => {
    console.log(accountAddress.length)
    if (selectedTestToken !== '' && accountAddress.length > 16) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectedTestToken, accountAddress])

  return (
    <>
      <GradientDiv />
      <Container size="lg">
        <div>
          <PageHeading>ARTH faucet</PageHeading>
          <PageSubHeading>
            Get tokens to test ARTH V2.0
          </PageSubHeading>
        </div>
        <Grid container>
          <Grid item lg={3}></Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomInfoCard className={'custom-mahadao-box'}>
              <PrimaryText>Select Test Token</PrimaryText>
              <Grid container lg={12}>
                {RadioButtonList.map((data) => (
                  <Grid lg={4} md={4} sm={6} xs={6} key={data.key}>
                    <RadioConatiner>
                      <GreenRadio
                        checked={selectedTestToken === data.key}
                        onChange={(event: any) => handleChange(event.target.value)}
                        value={data.key}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': data.key }}
                      />
                      <SecondaryText onClick={() => {handleChange(data.key)}}>{data.label}</SecondaryText>
                    </RadioConatiner>
                  </Grid>
                ))}
              </Grid>
              <Grid container lg={12} style={{marginTop: '4px'}}>
                <PrimaryText>Enter your account address</PrimaryText>
                <AddressInput
                  className={`input-${ICStates.IState}`}
                  placeholder={'account address'}
                  onChange={(event) => {
                    setAccountAddress(event.target.value);
                  }}
                  value={accountAddress}
                />
                {ICStates.IMsg !== '' && <p className={`input-font-${ICStates.IState}`}>{ICStates.IMsg}</p>}
              </Grid>
              <Grid container lg={12} style={{marginTop: '32px'}}>
                <Grid item lg={4} md={4} sm={6} xs={6}>
                  <Button
                    variant={'default'}
                    text="Submit"
                    size={'sm'}
                    onClick={() => {}}
                    disabled={buttonDisabled}
                  />
                </Grid>
              </Grid>
            </CustomInfoCard>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
      </Container>
    </>
  );
}

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  // border: 1px solid;
  width: 100%;
  z-index: -5;
`;

const PageHeading = styled.p`
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
  margin-top: 40px;
`;

const PageSubHeading = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.64);
  text-align: center;
  margin-bottom: 40px;
`;

const CustomInfoCard = styled.div`
  margin-top: 16px;
  @media (max-width: 600px) {
    margin-top: 24px;
  }
`;

const RadioConatiner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`

const PrimaryText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 12px;
`

const SecondaryText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 0;
  cursor: pointer;
`

const AddressInput = styled.input`
  background: #151414;
  border-radius: 6px;
  padding: 12px;
  border-style: none;
  width: 100%;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
`
export default Boardrooms;
