import React, { useState, useEffect } from "react";
import { BButton } from "../../components/atoms/Buttons";
import { getAllHouseResident } from "../../services/api";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import FormSection from "./FormSection";
import { Table } from "antd";
import { formatDate } from "../../utils/Helper";

export default function ListHouseResident() {
  const [section, setSection] = useState("default");
  const [loading, setLoading] = useState(false);
  const [childData, setChildData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataHouseResident();
    return () => {};
  }, []);

  const getDataHouseResident = () => {
    setLoading(true);
    getAllHouseResident()
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

  const columns = [
    {
      title: "Alamat Rumah",
      dataIndex: ["houseData", "address"],
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Nama Penghuni",
      dataIndex: ["residentData", "fullname"],
      key: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Tanggal Masuk",
      dataIndex: "startdate",
      key: "startdate",
      sorter: (a, b) => a.startdate.localeCompare(b.startdate),
      render: (date) => formatDate(date),
    },
    {
      title: "Tanggal Keluar",
      dataIndex: "enddate",
      key: "enddate",
      sorter: (a, b) => a.enddate.localeCompare(b.enddate),
      render: (date) => formatDate(date),
    },
    {
      title: "No. Handphone",
      dataIndex: ["residentData", "phone"],
      key: "phone",
    },
    {
      title: "Status Kepemilikan",
      dataIndex: ["residentData", "status"],
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => {
        switch (text) {
          case "contract":
            return "Kontrak";
          case "permanent":
            return "Tetap";
          case null:
            return "-";
          default:
            return text;
        }
      },
    },
    // {
    //   title: "Telepon",
    //   dataIndex: "phone",
    //   key: "phone",
    // },
    // {
    //   title: "Status Penghuni",
    //   dataIndex: "status",
    //   key: "status",
    //   sorter: (a, b) => a.status.localeCompare(b.status),
    //   render: (text) => {
    //     switch (text) {
    //       case "contract":
    //         return "Kontrak";
    //       case "permanent":
    //         return "Tetap";
    //       case null:
    //         return "-";
    //       default:
    //         return text;
    //     }
    //   },
    // },
    // {
    //   title: "Status Perkawinan",
    //   dataIndex: "marital_status",
    //   key: "marital_status",
    //   sorter: (a, b) => a.marital_status.localeCompare(b.marital_status),
    //   render: (text) => {
    //     switch (text) {
    //       case "single":
    //         return "Belum Menikah";
    //       case "married":
    //         return "Menikah";
    //       default:
    //         return text;
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
            <h2>Daftar Penghuni Rumah</h2>
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
          getData={getDataHouseResident}
        />
      )}
    </>
  );
}
