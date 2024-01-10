import React from "react";
import { Skeleton } from "antd";
const WaitLoad = () => {
  return (
    <>
      <div className="container">
        <Skeleton active />
      </div>
    </>
  );
};

export default WaitLoad;
