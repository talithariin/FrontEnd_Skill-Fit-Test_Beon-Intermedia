import React from "react";
import { Spin } from "antd";

export default function PageLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spin />
    </div>
  );
}
