import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import { colors } from '../types';

interface IProps {
  balances: {
    name: string;
    amount: number;
    percentage: number;
  }[];
}

export default class Example extends PureComponent<IProps> {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  render() {
    const data = this.props.balances.map((b, i) => ({
      name: b.name,
      value: b.percentage,
      color: colors[i],
    }));

    return (
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
            ))
          }
        </Pie>
      </PieChart>
    );
  }
}
