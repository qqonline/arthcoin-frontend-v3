import React, { useState } from 'react';
import styled from 'styled-components';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid, IconButton } from '@material-ui/core';
import copy from '../../assets/svg/copy.svg';
import metamask from '../../assets/svg/metamask.svg';
import TokenSymbol from '../TokenSymbol';
import CustomModal from '../CustomModal';
import Button from '../Button';
import { useMediaQuery } from 'react-responsive';

interface IProps {
    walletData?: {
        accountNumber: string;
        mahaTokens: number;
        mahaDollars: number;
        arthTokens: number;
        arthDollars: number;
        arthxTokens: number;
        arthxDollars: number;
    }
    disconnect?: boolean;
}
export const WalletInternal = (props: IProps) => {

    const truncateMiddle = function (fullStr: string = '12345678922500025', strLen: number, separator?: string) {
        if (fullStr.length <= strLen) return fullStr;

        separator = separator || '...';

        var sepLen = separator.length,
            charsToShow = strLen - sepLen,
            frontChars = Math.ceil(charsToShow / 3),
            backChars = Math.floor(charsToShow / 3);

        return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
    };
    const isMobile = useMediaQuery({ 'maxWidth': '600px' })
    const [ConfirmationModal, setConfirmationModal] = useState<boolean>(props?.disconnect || false);
    const onClose = () => {
        setConfirmationModal(false)
    }
    return (
        <>
            <Container style={{ background: '#1e1d1d', marginTop: -2 }}>
                <CustomModal
                    closeButton
                    handleClose={onClose}
                    open={ConfirmationModal}
                    modalTitleStyle={{}}
                    modalContainerStyle={{}}
                    modalBodyStyle={{}}
                    title={`Disconnect Wallet`}
                >
                    <div>
                        <PrimaryText>Are you sure you want to disconnect {truncateMiddle(props?.walletData?.accountNumber, 15)} ?</PrimaryText>
                        <SecondaryText>0xf77D777462d0cb38A67D7535761980D1</SecondaryText>
                        <Grid container spacing={2} direction={isMobile ? 'column-reverse' : 'row'} style={{ marginTop: '32px' }}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Button
                                    variant={'transparent'}
                                    text="Cancel"
                                    size={'lg'}
                                    onClick={() => {
                                        onClose();
                                    }}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Button
                                    text={'Disconnect'}
                                    size={'lg'}
                                    onClick={() => {
                                        onClose();
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </CustomModal>

                <StyledLink>
                    <span>
                        Your Account
                    </span>
                    <AccountDetails>
                        <IconButton>
                            <img height={32} src={metamask} />
                        </IconButton>
                        <span>{truncateMiddle(props?.walletData?.accountNumber, 15)}</span>
                        <IconButton>
                            <img height={24} src={copy} />
                        </IconButton>
                    </AccountDetails>
                </StyledLink>

                <StyledRows>
                    <RowName>
                        <IconButton>
                            <TokenSymbol symbol={'MAHA'} size={44} />
                        </IconButton>
                        <span>{props?.walletData?.mahaTokens} MAHA</span>
                    </RowName>
                    <DollarValue>
                        ${props?.walletData?.mahaDollars}
                    </DollarValue>
                </StyledRows>

                <StyledRows>
                    <RowName>
                        <IconButton>
                            <TokenSymbol symbol={'ARTH'} size={44} />
                        </IconButton>
                        <span>{props?.walletData?.arthTokens} ARTH</span>
                    </RowName>
                    <DollarValue>
                        ${props?.walletData?.arthDollars}
                    </DollarValue>
                </StyledRows>

                <StyledRows>
                    <RowName>
                        <IconButton>
                            <TokenSymbol symbol={'ARTHX'} size={44} />
                        </IconButton>
                        <span>{props?.walletData?.arthxTokens} ARTHX</span>
                    </RowName>
                    <DollarValue>
                        ${props?.walletData?.arthxDollars}
                    </DollarValue>
                </StyledRows>
            </Container>
        </>
    )
}

const StyledLink = styled.div`
    height: 80px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    &:hover {
        color: rgba(255, 255, 255, 0.64);
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(70px);
    }
    &.active {
        color: rgba(255, 255, 255, 0.88);
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
    cursor: pointer;
`;

const PrimaryText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
`;

const SecondaryText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 0;
`;

const AccountDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-width: 40%;
  margin: 0px 20px;
`;

const StyledRows = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0px;
`;

const RowName = styled.div`
    display: flex;
    align-items: center;
    justify-content: baseline;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.88);
    // border: 1px solid;
    margin-left: -15px;
`;

const DollarValue = styled.div`
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: rgba(255, 255, 255, 0.64);
    display: flex;
    align-items: center;
`;
