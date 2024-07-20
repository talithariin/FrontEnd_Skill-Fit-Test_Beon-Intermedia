import React, { useEffect, useState } from "react";
import { Table, Modal, notification, Image } from "antd";
import { BButton } from "../../components/atoms/Buttons";
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import FormSection from "./FormSection";
import { getAllHouse } from "../../services/api";
// import { getAllResident, deleteResident } from "../../services/api";

const { confirm } = Modal;

export default function ListHouse() {
  const [section, setSection] = useState("default");
  const [loading, setLoading] = useState(false);
  const [childData, setChildData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataHouse();
    return () => {};
  }, []);

  const getDataHouse = () => {
    setLoading(true);
    getAllHouse()
      .then((res) => {
        setData(res.data);
        setChildData(res.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (section === "default") {
      setChildData({});
    }
  }, [section]);

  const editData = (record) => {
    setChildData(record);
    setSection("edit");
  };

  const addData = () => {
    setSection("add");
  };

  const viewData = (record) => {
    setChildData(record);
    setSection("view");
  };

  const columns = [
    {
      title: "Alamat",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Status Rumah",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => {
        switch (text) {
          case "occupied":
            return "Dihuni";
          case "unoccupied":
            return "Tidak Dihuni";
          case null:
            return "-";
          default:
            return text;
        }
      },
    },
    // {
    //   title: "Penghuni",
    //   dataIndex: "residentData",
    //   key: "resident_fullname",
    //   render: (residentData) => (residentData ? residentData.fullname : "-"),
    // },
    // {
    //   title: "Status Penghuni",
    //   dataIndex: "residentData",
    //   key: "resident_status",
    //   render: (residentData) => {
    //     if (!residentData) return "-";
    //     switch (residentData.status) {
    //       case "permanent":
    //         return "Tetap";
    //       case "contract":
    //         return "Kontrak";
    //       case null:
    //         return "-";
    //       default:
    //         return residentData.status;
    //     }
    //   },
    // },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <>
          <div className="flex items-center gap-x-1">
            <BButton
              customclass="py-2 px-2 rounded-lg border hover:border-primary"
              icon={<EyeFilled className="text-gray-600 hover:text-primary" />}
              onClick={() => viewData(record)}
            />
            <BButton
              customclass="py-2 px-2 rounded-lg border hover:border-primary"
              icon={<EditFilled className="text-gray-600 hover:text-primary" />}
              onClick={() => editData(record)}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {section === "default" && (
        <div className="content-section">
          <div className="header">
            <h2>Daftar Rumah</h2>
            <div className="flex items-center gap-4">
              <BButton
                customclass="py-2 px-4 bg-primary text-white rounded-md"
                icon={<PlusOutlined />}
                onClick={() => addData()}
              >
                Tambah Data
              </BButton>
            </div>
          </div>
          <div className="body">
            <Table
              columns={columns}
              dataSource={data}
              pagination={true}
              rowKey="id"
            />
          </div>
        </div>
      )}
      {section !== "default" && (
        <FormSection
          childData={childData}
          setSection={setSection}
          section={section}
          getData={getDataHouse}
        />
      )}
    </>
  );
}
