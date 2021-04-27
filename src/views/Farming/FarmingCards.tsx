import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import CustomRowCard from './components/CustomRowCard';
import CustomModal from '../../components/CustomModal';
import CustomInputContainer from '../../components/CustomInputContainer';
import Button from '../../components/Button';
import { useMediaQuery } from 'react-responsive';
import { MobileFarm } from './MobileFarm';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CustomSnack } from '../../components/SnackBar';
interface ModeProps {
  id: number, name: string, count: number
}

interface FarmCard {
  id: number,
  type: string,
  pair: [string, string],
  walletUnit: string,
  walletValue: string,
  apy: string,
  poolDur: string,
  deposited: boolean,
  poolEndDate: number,
  lockedStake: string,
  earned: string
}
interface IProps {
  mode?: ModeProps;
}
const BankCardsV2 = (props: WithSnackbarProps & IProps) => {
  console.log(props.mode)
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const [openModal, setOpenModal] = useState<boolean>(true);
  let dummyJSON: FarmCard[] = [
    {
      id: 1,
      type: 'ARTH Staking',
      pair: ['MAHA', 'ARTH'],
      walletUnit: 'ARTH-MAHA LP',
      walletValue: '12.2',
      apy: '40%',
      poolDur: '65 Days',
      deposited: false,
      poolEndDate: Date.now() + 550000000,
      lockedStake: '0 ARTH-MAHA LP',
      earned: '12 MAHA'
    },
    {
      id: 2,
      type: 'ARTHX Staking',
      pair: ['MAHA', 'ARTHX'],
      walletUnit: 'ARTHX-MAHA LP',
      walletValue: '1222.2',
      apy: '4%',
      poolDur: '6 Days',
      deposited: true,
      poolEndDate: Date.now() + 550000000,
      lockedStake: '0 ARTH-MAHA LP',
      earned: '12 MAHA'
    },
    {
      id: 3,
      type: 'ARTH Staking',
      pair: ['MAHA', 'ARTH'],
      walletUnit: 'ARTH-MAHA LP',
      walletValue: '12.2',
      apy: '40%',
      poolDur: '65 Days',
      deposited: false,
      poolEndDate: Date.now() + 550000000,
      lockedStake: '0 ARTH-MAHA LP',
      earned: '12 MAHA'
    },
  ]
  const [data, setData] = useState<FarmCard[]>([])

  useEffect(() => {
    if (props?.mode.name !== 'All') {
      setData(dummyJSON.filter(obj => obj.type === props?.mode?.name))
    }
    else { setData(dummyJSON) }
  }, [props.mode.name])

  const [action, setAction] = useState<'Deposit' | 'Withdraw' | 'Claim' | ''>('');

  const DepositModal = () => {
    return (
      <div>
        <CustomInputContainer
          ILabelValue={'How much ARTH-MAHA LP would you like to supply?'}
          IBalanceValue={''}
          ILabelInfoValue={''}
          DefaultValue={'0.00'}
          LogoSymbol={'ARTH'}
          hasDropDown={false}
          SymbolText={'ARTH-MAHA'}
          setText={(val) => { }}
          inputMode={'decimal'}
          tagText={'MAX'}
          dontShowBackgroundContainer={true}
          multiIcons={true}
          symbol1={'ARTH'}
          symbol2={'MAHA'}
        />
        <OneLine>
          <div style={{ flex: 1 }}></div>
          <OneLine>
            <BeforeChip>Balance: 1000.00</BeforeChip>
            <TagChips>ARTH / ETH </TagChips>
          </OneLine>
        </OneLine>
        <Grid container spacing={2} direction={isMobile ? 'column-reverse' : 'row'} style={{ marginTop: '32px' }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text="Cancel"
              size={'lg'}
              onClick={() => {
                setOpenModal(false);
                let options = {
                  content: () =>
                    CustomSnack({
                      onClose: props.closeSnackbar,
                      type: 'red',
                      data1: `Deposition for ${123} ARTH cancelled`,
                    }),
                };
                props.enqueueSnackbar('timepass', options);
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              text={'Deposit'}
              size={'lg'}
              onClick={() => {
                setOpenModal(false);
                let options = {
                  content: () =>
                    CustomSnack({
                      onClose: props.closeSnackbar,
                      type: 'green',
                      data1: `Depositing ${123} ARTH`,
                    }),
                };
                props.enqueueSnackbar('timepass', options);
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  const WithdrawModal = () => {
    return (
      <div>
        <CustomInputContainer
          ILabelValue={'How much ARTH-MAHA LP would you like to Withdraw?'}
          IBalanceValue={''}
          ILabelInfoValue={''}
          DefaultValue={'0.00'}
          LogoSymbol={'ARTH'}
          hasDropDown={false}
          SymbolText={'ARTH'}
          setText={(val) => { }}
          inputMode={'decimal'}
          tagText={'MAX'}
          dontShowBackgroundContainer={true}
          multiIcons={true}
          symbol1={'ARTH'}
          symbol2={'MAHA'}
        />
        <OneLine>
          <div style={{ flex: 1 }}></div>
          <OneLine>
            <BeforeChip>Staked Amount: 1000.00</BeforeChip>
            <TagChips>ARTH-MAHA-LP</TagChips>
          </OneLine>
        </OneLine>
        <Grid container spacing={2} direction={isMobile ? 'column-reverse' : 'row'} style={{ marginTop: '32px' }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text="Cancel"
              size={'lg'}
              onClick={() => {
                setOpenModal(false);
                let options = {
                  content: () =>
                    CustomSnack({
                      onClose: props.closeSnackbar,
                      type: 'red',
                      data1: `Withdraw for ${123} ARTH cancelled`,
                    }),
                };
                props.enqueueSnackbar('timepass', options);
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              text={'Withdraw'}
              size={'lg'}
              onClick={() => {
                setOpenModal(false);
                let options = {
                  content: () =>
                    CustomSnack({
                      onClose: props.closeSnackbar,
                      type: 'green',
                      data1: `Withdrawing ${123} ARTH`,
                    }),
                };
                props.enqueueSnackbar('timepass', options);
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  const ClaimModal = () => {
    return (
      <div>
        <CustomInputContainer
          ILabelValue={'How much MAHA  would you like to claim?'}
          IBalanceValue={''}
          ILabelInfoValue={''}
          DefaultValue={'0.00'}
          LogoSymbol={'MAHA'}
          hasDropDown={false}
          SymbolText={'MAHA'}
          setText={(val) => { }}
          inputMode={'decimal'}
          tagText={'MAX'}
          dontShowBackgroundContainer={true}
          multiIcons={false}
        />
        <OneLine>
          <div style={{ flex: 1 }}></div>
          <OneLine>
            <BeforeChip>Earned Amount: 1000</BeforeChip>
            <TagChips>MAHA</TagChips>
          </OneLine>
        </OneLine>
        <Grid container spacing={2} direction={isMobile ? 'column-reverse' : 'row'} style={{ marginTop: '32px' }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text="Cancel"
              size={'lg'}
              onClick={() => {
                setOpenModal(false);
                let options = {
                  content: () =>
                    CustomSnack({
                      onClose: props.closeSnackbar,
                      type: 'red',
                      data1: `Claim for ${123} ARTH cancelled`,
                    }),
                };
                props.enqueueSnackbar('timepass', options);
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              text={'Clain'}
              size={'lg'}
              onClick={() => {
                setOpenModal(false);
                let options = {
                  content: () =>
                    CustomSnack({
                      onClose: props.closeSnackbar,
                      type: 'green',
                      data1: `Claiming for ${123} ARTH`,
                    }),
                };
                props.enqueueSnackbar('timepass', options);
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  const MobileCardRender = () => {
    return (
      <>
        {data.map(cardData => (
          <MobileFarm
            {...cardData}
            onButtonClick={(data) => {
              setOpenModal(true);
              setAction(data);
              // let options = {
              //   content: () => (CustomSnack({ onClose: props.closeSnackbar, type: 'red', data1: `Deposition for ${123} ARTH cancelled` }))
              // }
              // props.enqueueSnackbar('timepass', options)
            }}
          />
        ))}
      </>
    );
  };

  const DesktopCardRender = () => {
    return (
      <div>
        {data.map(cardData => (
          <CustomRowCard
            {...cardData}
            onButtonClick={(data) => {
              setOpenModal(true);
              setAction(data);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <DataContainer className={'custom-mahadao-box'}>
      {!isMobile && (
        <Grid container style={{ padding: '0px 32px ', marginBottom: '16px' }}>
          <Grid item lg={3}>
            <CustomTableHeading>Pair</CustomTableHeading>
          </Grid>
          <Grid item lg={3}>
            <CustomTableHeading>Wallet</CustomTableHeading>
          </Grid>
          <Grid item lg={1}>
            <CustomTableHeading>Apy</CustomTableHeading>
          </Grid>
          <Grid item lg={3}>
            <CustomTableHeading>Pool duration</CustomTableHeading>
          </Grid>
          <Grid item lg={2}></Grid>
        </Grid>
      )}
      {!isMobile ? DesktopCardRender() : MobileCardRender()}

      {openModal && action !== '' && (
        <CustomModal
          closeButton
          handleClose={() => {
            setAction('');
            setOpenModal(false);
          }}
          open={openModal}
          modalTitleStyle={{}}
          modalContainerStyle={{}}
          modalBodyStyle={{}}
          title={`${action} ARTH-MAHA LP`}
        >
          {action === 'Deposit' && DepositModal()}
          {action === 'Withdraw' && WithdrawModal()}
          {action === 'Claim' && ClaimModal()}
        </CustomModal>
      )}
    </DataContainer>
  );
}

const DataContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
  padding: 24px 32px;
  @media (max-width: 600px) {
    background: transparent;
    backdrop-filter: none;
    border-radius: 12px;
    padding: 0;
  }
`;

const CustomTableHeading = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.32);
  opacity: 0.64;
  text-align: left;
`;

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px 0;
`;

const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`;

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`;

export default withSnackbar(BankCardsV2);
