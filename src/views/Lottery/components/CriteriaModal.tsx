import React from 'react';
import styled from 'styled-components';

import CustomModal from '../../../components/CustomModal';

interface IProps {
  data?: { id: number, value: string },
  open: boolean;
  toggleOpen: () => void
}

let data = [
  {
    id: 1,
    value: `Users who deposit 1000$ worth of collateral will win one lottery ticket.`
  },
  {
    id: 2,
    value: `The more lottery tickets you have the more are your chances of winning the NFTs`
  },
  {
    id: 4,
    value: `Winners are decided on the 29th of June, 2021`
  },
]

export const CriteriaModal = (props: IProps) => {
  function ListItem(props: any) {
    return (
      <ListLi>
        <ListSpan>{props.value}</ListSpan>
      </ListLi>
    );
  }

  return (
    <>
      <CustomModal
        title={'MAHA Prize winning Criteria'}
        closeButton
        handleClose={props.toggleOpen}
        open={props.open}
      >
        <ul>
          {
            data.map((obj) => (
              <ListItem key={obj.id} value={obj.value} />
            ))
          }
        </ul>
      </CustomModal>
    </>
  )
}


const ListLi = styled.li``;

const ListSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.88);
`;
