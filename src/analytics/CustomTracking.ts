import React from 'react';
import { Mixpanel } from './Mixpanel';

interface IProps {
  type: 'ScreenTracking' | string;
  id: string;
  params: object;
}

const CustomTracking = (props: IProps) => {
  const {type, id, params} = props;

  if (type === 'ScreenTracking') {
    Mixpanel.track(`ScreenView:${location.pathname}`);
  }
}

export default CustomTracking;
