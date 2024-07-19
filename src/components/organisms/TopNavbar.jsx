import React from "react";
import { Layout } from "antd";
import logo from "../../assets/images/logo.png";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Divider } from "antd";

const { Header } = Layout;

export default function TopNavbar() {
  return (
    <>
      <Header className="bg-white flex justify-between items-center">
        <div className="cursor-pointer">
          <img src={logo} alt="" className="h-8" />
        </div>
        <div className="flex items-center">
          <Divider type="vertical" style={{ height: "2em" }} />
          <div className="flex items-center">
            <UserOutlined />
            <div className="ml-3">
              <div className="leading-none">Hi, Talitha Dwi Arini</div>
              <div className="leading-none mt-1 text-xs">Ibu RT</div>
            </div>
          </div>
          <Divider
            type="vertical"
            style={{ height: "2em" }}
            className="mx-4 border-gray-300"
          />
        </div>
      </Header>
    </>
  );
}
