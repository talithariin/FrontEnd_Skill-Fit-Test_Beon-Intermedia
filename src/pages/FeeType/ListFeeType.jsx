import React, { useState, useEffect } from "react";
import { Table, notification } from "antd";
import { getAllFeeType } from "../../services/api";
import "./FormSection";
import { BButton } from "../../components/atoms/Buttons";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import { numberWithCommas } from "../../utils/Helper";
import FormSection from "./FormSection";

export default function ListFeeType() {
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
    getAllFeeType()
      .then((res) => {
        console.log(res.data);
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
      title: "Nama Iuran",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Nominal Iuran",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount.localeCompare(b.amount),
      render: (amount) => `Rp ${numberWithCommas(amount)}`,
    },
    {
      title: "Frekuensi Iuran",
      dataIndex: "frequency",
      key: "frequency",
      render: (text) => {
        switch (text) {
          case "once":
            return "Sekali";
          case "monthly":
            return "Tiap Bulan";
          case "yearly":
            return "Tiap Tahun";
          case null:
            return "-";
          default:
            return text;
        }
      },
    },
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
            <h2>Daftar Jenis Iuran</h2>
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
