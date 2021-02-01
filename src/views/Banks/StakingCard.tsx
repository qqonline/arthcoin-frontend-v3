import React from 'react';
import styled from 'styled-components';
import { withStyles, Theme } from '@material-ui/core/styles';
import ProgressCountdown from './ProgressCountDown';
import Button from '../../components/Button';
import InfoIcon from '../../assets/img/InfoIcon.svg';
import Tooltip from '@material-ui/core/Tooltip';
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#2A2827',
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '20px',
  },
}))(Tooltip);
interface AccountButtonProps {
  title: string;
  logo: Array<string>;
  subtitle?: string;
  poolSize: string;
  description?: string;
  toolTipDesciption?: string;
  buttonText: string;
  percentage: number;
  appyPercentage: string;
}
interface ImageConTainerProps {
  marginLeft: number;
  zIndex: number;
}

const StakingCard: React.FC<AccountButtonProps> = ({
  title,
  logo,
  subtitle,
  description,
  poolSize,
  percentage,
  toolTipDesciption,
  buttonText = 'Stake Now',
  appyPercentage,
}) => {
  return (
    <CardContainer>
      {logo && logo.length > 0 && (
        <LogoContainer>
          <ImageConTainer marginLeft={0} zIndex={logo.length + 1}>
            <img src={logo[0]} alt={title} width="46px" style={{ borderRadius: '50%' }} />
          </ImageConTainer>
          {logo.length > 1 &&
            logo.slice(1).map((eachLogo, index) => (
              <ImageConTainer marginLeft={15} zIndex={logo.length - index}>
                <img src={eachLogo} alt={title} width="46px" style={{ borderRadius: '50%' }} />
              </ImageConTainer>
            ))}
        </LogoContainer>
      )}
      <span className="white font24 bold-800 margin-bottom-15 row-centered">{title}</span>
      {subtitle && <span className="white font16 bold-600 margin-bottom-15">{subtitle}</span>}
      {description && (
        <span
          className="white font16 bold-200 margin-bottom-15"
          style={{ textAlign: 'center' }}
        >
          {description}
        </span>
      )}
      <DiscountDiv>
        <TitleText>{`${appyPercentage}%`}</TitleText>APY
        {toolTipDesciption && (
          <HtmlTooltip enterTouchDelay={0} title={<span>{toolTipDesciption}</span>}>
            <img src={InfoIcon} alt="Inof" width="16px" className="margin-left-5" />
          </HtmlTooltip>
        )}
      </DiscountDiv>
      <PoolSizeDiv>
        <div className="dialog-class margin-top-20">
          {poolSize === 'No limit' ? '' : 'Pool Size'} <PoolTitle>{poolSize}</PoolTitle>
        </div>
        <ProgressCountdown percentage={percentage} description="Next Epoch" />
      </PoolSizeDiv>
      <div style={{ width: '300px', marginBottom: '20px', marginTop: '20px' }}>
        <Button text={buttonText} />
      </div>
    </CardContainer>
  );
};
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PoolSizeDiv = styled.div`
  background: #363130;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  color: #ffffff;
`;
const PoolTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  margin-left: 5px;
  color: #ffffff;
`;
const ImageConTainer = styled.div`
  border: 2px solid #363130;
  margin-left: ${(p: ImageConTainerProps) => `-${p.marginLeft}px`};
  z-index: ${(p: ImageConTainerProps) => p.zIndex};
  width: 56px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 56px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  box-shadow: 0px 12px 24px -4px rgba(0, 0, 0, 0.12), 0px 16px 20px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;
const DiscountDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 20px;
  padding: 10px 20px;
`;
const TitleText = styled.div`
  font-size: 16px;
  margin-right: 5px;
  font-weight: bold;
`;
export default StakingCard;
