import React from 'react';
import styled from 'styled-components';
import CallMadeIcon from '@material-ui/icons/CallMade';

type props = {
  stats?: boolean;
  dataObj?: string[];
};

const UnderstandMore: React.FC<props> = (props: props) => {
  function ListItem(props: any) {
    return (
      <ListLi>
        <ListSpan>{props.value}</ListSpan>
      </ListLi>
    );
  }

  return (
    <CustomInfoCard className={'custom-mahadao-box'}>
      <CustomInfoCardHeader>Understand how Genesis works</CustomInfoCardHeader>
      <CustomInfoCardDetails>
        <ul>
          {
            props?.dataObj?.map((obj) => (
              <ListItem key={obj} value={obj} />
            ))
          }
        </ul>
        <LearnMore>
          <a href={'https://docs.arthcoin.com'} rel="noopener noreferrer" target={"_blank"}>Go to ARTH V2.0 article to learn more</a>
          <CallMadeIcon style={{ fontSize: 15, marginLeft: 4 }} />
        </LearnMore>
        <LearnMore>
          <a href={'https://mahadao.com/arthx.html'} rel="noopener noreferrer" target={"_blank"}>Learn about ARTHX</a>
          <CallMadeIcon style={{ fontSize: 15, marginLeft: 4 }} />
        </LearnMore>
      </CustomInfoCardDetails>
    </CustomInfoCard>
  );
};

export default UnderstandMore;

const CustomInfoCard = styled.div`
  @media (max-width: 600px) {
  }
`;

const ListLi = styled.li``;

const ListSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
`;

const LearnMore = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #f7653b;
  margin-top: 10px;
  cursor: pointer;
  align-items: center;
  &:hover {
    color: #f7653b;
    opacity: 0.88;
  }
  a {
    color: #f7653b;
    text-decoration: none;
  }
`;

const CustomInfoCardHeader = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: 24px;
`;

const CustomInfoCardDetails = styled.div`
  margin: 10px 0;
`;
