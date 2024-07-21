import React, { useState, useEffect } from "react";
import { getAllPayment } from "../../services/api";
import { BButton } from "../../components/atoms/Buttons";
import { Table } from "antd";
import { EyeFilled, PlusOutlined, EditFilled } from "@ant-design/icons";
import { formatDate } from "../../utils/Helper";
import FormSection from "./FormSection";

export default function ListHouse() {
  const [section, setSection] = useState("default");
  const [loading, setLoading] = useState(false);
  const [childData, setChildData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataPayment();
    return () => {};
  }, []);

  const getDataPayment = () => {
    setLoading(true);
    getAllPayment()
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

  const addData = () => {
    setSection("add");
  };

  const viewData = (record) => {
    setChildData(record);
    setSection("view");
  };

  const editData = (record) => {
    setChildData(record);
    setSection("edit");
  };

  const columns = [
    {
      title: "Nama Penghuni",
      dataIndex: ["resident_data", "fullname"],
      key: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Alamat Rumah",
      dataIndex: ["house_data", "address"],
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Nama Iuran",
      dataIndex: ["fee_type_data", "name"],
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tanggal Pembayaran",
      dataIndex: "payment_date",
      key: "payment_date",
      render: (date) => formatDate(date),
      sorter: (a, b) => a.payment_date.localeCompare(b.payment_date),
    },
    // {
    //   title: "Frekuensi Pembayaran",
    //   dataIndex: "period",
    //   key: "period",
    //   sorter: (a, b) => a.period.localeCompare(b.period),
    //   render: (text) => {
    //     switch (text) {
    //       case "once":
    //         return "Sekali";
    //       case "monthly":
    //         return "Bulanan";
    //       case "yearly":
    //         return "Tahunan";
    //       case null:
    //         return "-";
    //       default:
    //         return text;
    //     }
    //   },
    // },
    {
      title: "Status Pembayaran",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => {
        switch (text) {
          case "paid":
            return "Dibayar";
          case "unpaid":
            return "Belum Dibayar";
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
            <h2>Daftar Pembayaran</h2>
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
          getData={getDataPayment}
        />
      )}
    </>
  );
}
