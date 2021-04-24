import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TokenSymbol from '../../../components/TokenSymbol';
import useBasisCash from '../../../hooks/useBasisCash';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import HtmlTooltip from '../../../components/HtmlTooltip';
import Button from '../../../components/Button/Button';
// import { Container } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import Container from '../../../components/Container';

interface IProps {
  title1?: string;
  title1ToolTipdata?: string;
  title1Subtitle?: string | BigNumber;
  title1SubtitleSubdata?: string;
  title1_pos_or_neg?: 'positive' | 'negative';
  title2?: string;
  title2ToolTipdata?: string;
  title2Subtitle?: string | BigNumber;
  // title2SubtitleSubdata?: string;
  // title2_pos_or_neg?: 'positive' | 'negative';
}
const MobileSmallCards = (props: IProps) => {
  return (
    <>
      <Grid
        style={{
          // border: '1px solid',
          height: 'fit-content',
          width: '100%',
          padding: '20px 10px 20px 20px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.02)',
          display: 'flex',
          borderTop: '1px solid rgba(255, 116, 38, 0.1)',
          borderLeft: '1px solid rgba(255, 116, 38, 0.08)',
          borderRight: '1px solid rgba(255, 116, 38, 0.08)',
          borderBottom: '1px solid rgba(255, 116, 38, 0.01)',
          justifyContent: 'space-between',
        }}
        direction={'row'}
      >
        <Grid item md={6} lg={6} alignItems="center" justify="center" direction="column">
          <StyledTitle>
            {props.title1}
            {props?.title1ToolTipdata && (
              <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
            )}
          </StyledTitle>
          <StyledSubtitle>
            {props.title1Subtitle}
            {props?.title1SubtitleSubdata && props?.title1_pos_or_neg && (
              <div
                style={{
                  color: props?.title1_pos_or_neg === 'negative' ? '#FA4C69' : '#20C974',
                  fontStyle: 'normal',
                  fontWeight: 300,
                  fontSize: '12px',
                  lineHeight: '130%',
                  marginLeft: 2,
                  marginTop: 2,
                }}
              >
                {props?.title1SubtitleSubdata}
              </div>
            )}
          </StyledSubtitle>
        </Grid>
        <Grid item md={6} lg={6} alignItems="center" justify="center" direction="column">
          <div
            style={{
              height: '100%',
              width: '100%',
              // background: 'yellow',
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
              <StyledSpan>
                {props.title2}
                {props?.title2ToolTipdata && (
                  <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                )}
              </StyledSpan>
              <StyledSpan2>{props.title2Subtitle}</StyledSpan2>
            </span>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

const StyledContainer = styled.h6`
  background: rgba(255, 255, 255, 0.02);
  // backdrop-filter: blur(21px);
  border-radius: 12px;
`;

const StyledTitle = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  color: rgba(255, 255, 255, 0.64);
  text-align: center;
`;

const StyledSubtitle = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  flex-direction: row;
  display: flex;
  align-self: center;
  // background: green;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const StyledSpan = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  justify-content: center;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.64);
`;

const StyledSpan2 = styled.h6`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  text-align: right;
`;

export default MobileSmallCards;
