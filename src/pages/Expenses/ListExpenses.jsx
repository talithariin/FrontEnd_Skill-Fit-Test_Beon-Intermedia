import React, { useState, useEffect } from "react";
import { getAllExpense, addExpense } from "../../services/api";
import { BButton } from "../../components/atoms/Buttons";
import { Table } from "antd";
import { numberWithCommas } from "../../utils/Helper";
import { PlusOutlined } from "@ant-design/icons";
import FormSection from "./FormSection";
import { formatDate } from "../../utils/Helper";

export default function ListExpenses() {
  const [section, setSection] = useState("default");
  const [loading, setLoading] = useState(false);
  const [childData, setChildData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataExpense();
    return () => {};
  }, []);

  const getDataExpense = () => {
    setLoading(true);
    getAllExpense()
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
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Tanggal Pembayaran",
      dataIndex: "expense_date",
      key: "expense_date",
      render: (date) => formatDate(date),
      sorter: (a, b) => a.expense_date.localeCompare(b.expense_date),
    },
    {
      title: "Total",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount.localeCompare(b.amount),
      render: (amount) => `Rp ${numberWithCommas(amount)}`,
    },
  ];

  return (
    <>
      {section === "default" && (
        <div className="content-section">
          <div className="header">
            <h2>Daftar Pengeluaran</h2>
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
          getData={getDataExpense}
        />
      )}
    </>
  );
}
