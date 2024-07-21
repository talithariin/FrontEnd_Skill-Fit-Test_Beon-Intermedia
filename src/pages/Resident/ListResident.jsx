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
import { getAllResident, deleteResident } from "../../services/api";

const { confirm } = Modal;

export default function ListResident() {
  const [section, setSection] = useState("default");
  const [loading, setLoading] = useState(false);
  const [childData, setChildData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataResident();
    return () => {};
  }, []);

  const getDataResident = () => {
    setLoading(true);
    getAllResident()
      .then((res) => {
        setData(res.data);
        setChildData.apply(res.data);
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

  const deleteData = (record) => {
    confirm({
      title: "Konfirmasi Hapus",
      content:
        "Apakah kamu yakin menghapus data ini? Aksi ini tidak dapat dibatalkan.",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise((resolve, reject) => {
          deleteResident(record.id)
            .then((res) => {
              notification.success({
                message: "Sukses!",
                description: "Sukses menghapus data penghuni",
                placement: "topRight",
              });
              getDataResident();
              resolve(res);
            })
            .catch((err) => {
              console.log(err);
              notification.error({
                message: "Gagal!",
                description: err ? err : "Gagal menghapus data penghuni",
                placement: "topRight",
              });
              reject(err);
            });
        });
      },
    });
  };

  const columns = [
    {
      title: "Foto KTP",
      dataIndex: "ktp",
      key: "ktp",
      render: (text, record) => (
        <Image
          src={`data:image/jpeg;base64,${record.ktp}`}
          alt="KTP Image"
          width={60}
          height={60}
        />
      ),
    },
    {
      title: "Nama Lengkap",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Telepon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status Penghuni",
      dataIndex: "status",
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
    {
      title: "Status Perkawinan",
      dataIndex: "marital_status",
      key: "marital_status",
      sorter: (a, b) => a.marital_status.localeCompare(b.marital_status),
      render: (text) => {
        switch (text) {
          case "single":
            return "Belum Menikah";
          case "married":
            return "Menikah";
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
            <BButton
              customclass="py-2 px-2 rounded-lg border hover:border-primary"
              icon={
                <DeleteFilled className="text-gray-600 hover:text-primary" />
              }
              onClick={() => deleteData(record)}
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
            <h2>Daftar Penghuni</h2>
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
          getData={getDataResident}
        />
      )}
    </>
  );
}
