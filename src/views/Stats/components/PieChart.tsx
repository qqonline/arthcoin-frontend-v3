import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'USDT', value: 50 },
  { name: 'ETH', value: 20 },
  { name: 'USDC', value: 10 },
  { name: 'WBTC', value: 10 },
  { name: 'MAHA', value: 10 },
];
// const COLORS = ['#C4F7DD', '#20C974', '#178A50', '#88E0B4'];
const COLORS = ['#D74D26', '#F7653B', '#FF7F57', '#FFA981', '#FEE2D5'];
export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  render() {
    return (
      // <ResponsiveContainer width={'95%'} height={'100%'}>
        <PieChart width={200} height={200}>
          <Pie data={data.reverse()} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

        </PieChart>
      // </ResponsiveContainer>
    );
  }
}
