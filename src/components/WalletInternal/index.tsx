import React, { useState } from 'react';
import styled from 'styled-components';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Container, IconButton } from '@material-ui/core';
import copy from '../../assets/svg/copy.svg';
import metamask from '../../assets/svg/metamask.svg';
import TokenSymbol from '../TokenSymbol';

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

    return (
        <>
            <Container style={{background: '#1e1d1d', marginTop: -2}}>

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
                            <TokenSymbol symbol={'MAHA'} size={44} />
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
