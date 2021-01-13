import React from 'react';
import styled from 'styled-components';
import Label from '../../../components/Label';
import { TokenStat } from '../../../basis-cash/types';
import TokenSymbol from '../../../components/TokenSymbol';
import { commify } from 'ethers/lib/utils';
import config from '../../../config';
import Spacer from '../../../components/Spacer';

interface HomeCardProps {
  title: string;
  symbol: string;
  supplyLabel?: string;
  address: string;
  uniswapInputAddress: string;
  stat?: TokenStat;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  symbol,
  uniswapInputAddress,
  address,
  supplyLabel = 'Total Supply',
  stat,
}) => {
  const tokenUrl = `${config.etherscanUrl}/token/${address}`;
  return (
    <Wrapper>
      <StyledCards>
        <CardHeader>
          <TokenSymbol size={60} symbol={symbol} />
          <span className="margin-left-20">{title}</span>
        </CardHeader>

        <CardContent>
          <CardSection>
            <div style={{ color: '#ffffff99' }}>{`${title} Earned`}</div>
            {stat ? (
              <StyledValue>
                {(stat.priceInDAI !== '-' ? '$' : '') + stat.priceInDAI}
              </StyledValue>
            ) : (
              '-'
            )}
          </CardSection>

          <CardSection className="right">
            <StyledSupplyLabel href={tokenUrl} target="_blank" color={'#ffffff99'}>
              {supplyLabel}
            </StyledSupplyLabel>
            {stat ? <StyledValue>{commify(stat.totalSupply)}</StyledValue> : '-'}
          </CardSection>
        </CardContent>

        <UniswapLink
          target="_blank"
          href={`https://app.uniswap.org/#/swap?inputCurrency=${uniswapInputAddress}&outputCurrency=${address}`}
        >
          <LinkText>Buy {symbol} from Uniswap </LinkText>
        </UniswapLink>
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

const UniswapLink = styled.a`
  color: #fff;
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
  text-decoration: none;
  margin-bottom: 15px;
`;

const LinkText = styled.span`
  text-align: center;
  margin: 0 15px 5px;
  border-bottom: 1px solid #999;
  color: rgba(255, 255, 255, 0.64);
  font-size: 16px;
`;

const CardContent = styled.div`
  display: flex;
  margin: 0 15px 15px;
`;

const CardHeader = styled.h2`
  color: #fff;
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: center;
  padding-bottom: 15px;
  padding-left: 20px;
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

const StyledSupplyLabel = styled.a`
  display: block;
  color: ${(props) => props.color};
`;

export default HomeCard;
