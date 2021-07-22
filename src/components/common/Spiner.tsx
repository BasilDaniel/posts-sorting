import React, { FC } from 'react';
import { Spin } from 'antd';

interface IProps {
  loading: boolean;
}
const Spiner: FC<IProps> = ({ loading }) => {
  return (
    <div className="spiner">
      <Spin size="large" spinning={loading} className="spiner_center" />
    </div>
  );
};

export default Spiner;
