import React, { useState, useEffect } from "react";
import { getAllIncome } from "../../services/api";
import { numberWithCommas } from "../../utils/Helper";
import { Table } from "antd";

export default function ListHouse() {
  const [section, setSection] = useState("default");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataIncome();
    return () => {};
  }, []);

  const getDataIncome = () => {
    setLoading(true);
    getAllIncome()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "Nama Penghuni",
      dataIndex: "resident_fullname",
      key: "resident_fullname",
      sorter: (a, b) => a.resident_fullname.localeCompare(b.resident_fullname),
    },
    {
      title: "Jenis Iuran",
      dataIndex: ["feeTypeData", "name"],
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total.localeCompare(b.total),
      render: (amount) => `Rp ${numberWithCommas(amount)}`,
    },
  ];

  return (
    <>
      <div className="content-section">
        <div className="header">
          <h2>Daftar Pemasukan</h2>
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
    </>
  );
}
