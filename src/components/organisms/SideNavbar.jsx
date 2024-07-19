import React, { useState } from "react";
import { Layout, Menu } from "antd";
import _ from "lodash";

const { SubMenu } = Menu;
const { Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <i className="bi bi-speedometer"></i>,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <i className="bi bi-people-fill" />,
    label: "Kelola Penghuni",
  },
  {
    key: "3",
    icon: <i className="bi bi-houses-fill"></i>,
    label: "Kelola Perumahan",
    children: [
      {
        key: "31",
        label: "Rumah",
      },
      {
        key: "32",
        label: "Penghuni Rumah",
      },
    ],
  },
  {
    key: "4",
    icon: <i className="bi bi-cash-stack"></i>,
    label: "Kelola Iuran",
  },
  {
    key: "5",
    icon: <i className="bi bi-credit-card"></i>,
    label: "Kelola Pembayaran",
  },
  {
    key: "6",
    icon: <i className="bi bi-wallet"></i>,
    label: "Kelola Pemasukan",
  },
  {
    key: "7",
    icon: <i className="bi bi-cash"></i>,
    label: "Kelola Pengeluaran",
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

export default function SideNavbar() {
  const [stateOpenKeys, setStateOpenKeys] = useState(["1"]);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Sider width={280} className="overflow-y-auto">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 280,
          height: "100%",
        }}
        items={items}
      />
    </Sider>
  );
}
