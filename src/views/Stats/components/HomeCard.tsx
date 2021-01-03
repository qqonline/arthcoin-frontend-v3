import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import { TokenStat } from '../../../basis-cash/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TokenSymbol from '../../../components/TokenSymbol';
import { commify } from 'ethers/lib/utils';
import config from '../../../config';
import Spacer from '../../../components/Spacer';

interface HomeCardProps {
  title: string;
  symbol: string;
  color: string;
  supplyLabel?: string;
  address: string;
  stat?: TokenStat;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  symbol,
  color,
  address,
  supplyLabel = 'Total Supply',
  stat,
}) => {
  const tokenUrl = `${config.etherscanUrl}/token/${address}`;
  return (
    <Wrapper>
      <StyledCards>
        <CardHeader>
          <TokenSymbol size={40} symbol={symbol} />
          <Spacer size="sm" />
          {title}
        </CardHeader>

        <CardContent>
          <CardSection>
            {stat ? (
              <StyledValue>
                {(stat.priceInDAI !== '-' ? '$' : '') + stat.priceInDAI}
              </StyledValue>
            ) : (
              '-'
            )}

            <Label text="Current Price" color={'#ffffff99'} />
          </CardSection>

          <CardSection className="right">
            {stat ? <StyledValue>{commify(stat.totalSupply)}</StyledValue> : '-'}
            <StyledSupplyLabel href={tokenUrl} target="_blank" color={'#ffffff99'}>
              {supplyLabel}
            </StyledSupplyLabel>
          </CardSection>
        </CardContent>
      </StyledCards>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 200px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: ${(props) => props.theme.spacing[4]}px;
  }
`;

const CardContent = styled.div`
  display: flex;
  margin: 0 15px 15px;
`;

const CardHeader = styled.h2`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const StyledCards = styled.div`
  padding: 5px 0;
  color: #fff;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  backdrop-filter: blur(70px);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledValue = styled.span`
  display: inline-block;
  font-size: 18px;
  color: #eeeeee;
`;

const CardSection = styled.div`
  flex: 1;

  &:last-child {
    margin-bottom: 0;
  }

  &.right {
    text-align: right;
  }
`;

const ValueSkeletonPadding = styled.div`
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledSupplyLabel = styled.a`
  display: block;
  color: ${(props) => props.color};
`;

export default HomeCard;
