import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <i className="bi bi-speedometer"></i>,
    label: "Dashboard",
  },
  {
    key: "/resident",
    icon: <i className="bi bi-people-fill" />,
    label: "Kelola Penghuni",
  },
  {
    key: "kelola-perumahan",
    icon: <i className="bi bi-houses-fill"></i>,
    label: "Kelola Perumahan",
    children: [
      {
        key: "/house",
        label: "Rumah",
      },
      {
        key: "/house-resident",
        label: "Penghuni Rumah",
      },
    ],
  },
  {
    key: "/fee-type",
    icon: <i className="bi bi-cash-stack"></i>,
    label: "Kelola Iuran",
  },
  {
    key: "/payment",
    icon: <i className="bi bi-credit-card"></i>,
    label: "Kelola Pembayaran",
  },
  {
    key: "/income",
    icon: <i className="bi bi-wallet"></i>,
    label: "Kelola Pemasukan",
  },
  {
    key: "/expenses",
    icon: <i className="bi bi-cash"></i>,
    label: "Kelola Pengeluaran",
  },
];

const getLevelKeys = (items) => {
  const key = {};
  const func = (items, level = 1) => {
    items.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items);
  return key;
};
const levelKeys = getLevelKeys(items);

export default function SideNavbar() {
  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathKey = location.pathname;
    const parentKey = items.find((item) =>
      item.children?.some((child) => child.key === pathKey)
    )?.key;

    if (parentKey) {
      setStateOpenKeys([parentKey]);
    }
  }, [location.pathname]);

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

  const handleClick = (e) => {
    const { key } = e;
    navigate(key);
  };

  return (
    <Sider width={280} className="overflow-y-auto">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onClick={handleClick}
        style={{
          width: 280,
          height: "100%",
        }}
        items={items}
      />
    </Sider>
  );
}
