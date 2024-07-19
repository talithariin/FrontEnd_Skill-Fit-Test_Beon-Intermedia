import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import SideNavbar from "../components/organisms/SideNavbar";
import TopNavbar from "../components/organisms/TopNavbar";

const { Content } = Layout;

export default function DashboardLayout() {
  return (
    <>
      <Layout className="h-screen">
        <TopNavbar />
        <Layout>
          <SideNavbar />
          <Layout>
            <Content
              className="bg-custom overflow-y-auto"
              style={{
                padding: 24,
                margin: 0,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
