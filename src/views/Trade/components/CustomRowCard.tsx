import React, { useState } from 'react';
import styled from 'styled-components';
import TokenSymbol from '../../../components/TokenSymbol';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';

interface FarmCard {
  id: number,
  pair: [string, string],
  liquidity: string;
  volume: string;
  onClickLink: string;
}

const CustomRowCard = (props: FarmCard) => {

  return (
    <CustomCardGrid>
      <Grid container style={{ padding: '32px 32px', position: 'relative' }} alignItems={'center'}>
        {/* <CardIcon src={farmingSVG} height={32} /> */}
        <Grid item lg={3} style={{ display: 'flex' }}>
          <div>
            <TokenSymbol symbol={props?.pair[0]} size={45} />
            <TokenSymbol symbol={props?.pair[1]} size={45} style={{ marginLeft: '-12px' }} />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <TableMainTextStyle>
              {`${props?.pair[0]} - ${props?.pair[1]}`}
            </TableMainTextStyle>
            <AddLiquidityButton onClick={() => { }}>
              Add Liquidity
            </AddLiquidityButton>
          </div>
        </Grid>
        <Grid item lg={3}>
          <TableMainTextStyle>
            {props?.liquidity}
          </TableMainTextStyle>
        </Grid>
        <Grid item lg={3}>
          <TableMainTextStyle>
            {props?.volume}
          </TableMainTextStyle>
        </Grid>
        <Grid item lg={1}/>
        <Grid item lg={2}>
          <Button
            text="Trade"
            size={'sm'}
            // onClick={() => props.onButtonClick('Deposit')}
            href={props?.onClickLink}
          />
        </Grid>
      </Grid>
    </CustomCardGrid>
  )
}

const CustomCardGrid = styled.div`
  background: linear-gradient(180deg, #48423E 0%, #373030 100%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-sizing: border-box;
  border-radius: 12px;
  margin: 8px 0px;
  position: relative;
`

const TableMainTextStyle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  opacity: 0.88;
  margin: 0;
`

const AddLiquidityButton = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: #FF7F57;
  margin: 0;
`

export default CustomRowCard;

