import React from 'react';
import styled from 'styled-components';

import CustomModal from '../../../components/CustomModal';

interface IProps {
  data?: {id: number, value: string},
  open: boolean;
  toggleOpen: () => void
}

let data = [
  {
    id: 1,
    value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo in velit augue pharetra mollis libero molestie senectus.`
  },
  {
    id: 2,
    value: `Consectetur at non, ullamcorper id dolor egestas duis imperdiet nec. Odio vivamus amet, suspendisse purus. Habitasse duis viverra a eget imperdiet feugiat odio tortor tellus.`
  },
  {
    id: 3,
    value: `Consectetur at non, ullamcorper id dolor egestas duis imperdiet nec. Odio vivamus amet, suspendisse purus. Habitasse duis viverra a eget imperdiet feugiat odio tortor tellus.`
  },
  {
    id: 4,
    value: `Consectetur at non, ullamcorper id dolor egestas duis imperdiet nec. Odio vivamus amet, suspendisse purus. Habitasse duis viverra a eget imperdiet feugiat odio tortor tellus.`
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
