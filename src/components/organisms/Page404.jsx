import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Halaman yang dituju belum ada"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}
