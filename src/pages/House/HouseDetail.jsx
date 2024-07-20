import React, { useState, useEffect } from "react";
import { getHouseResidentByHouseId } from "../../services/api";
import { Table } from "antd";
import {
  formatDate,
  renderMaritalStatus,
  renderResidentStatus,
  renderHouseStatus,
} from "../../utils/Helper";

export default function HouseDetail(props) {
  const { childData } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (childData?.residentData) {
      getDetailHouse();
    }
    return () => {};
  }, [childData]);

  const getDetailHouse = () => {
    setLoading(true);
    getHouseResidentByHouseId(childData.id)
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

  const variantColumn = [
    {
      title: "Nama Penghuni",
      dataIndex: "resident",
      key: "fullname",
      render: (resident) => resident?.fullname || "-",
    },
    {
      title: "Nomor Handphone",
      dataIndex: "resident",
      key: "phone",
      render: (resident) => resident?.phone || "-",
    },
    {
      title: "Status Pernikahan",
      dataIndex: "resident",
      key: "marital_status",
      render: (resident) => renderMaritalStatus(resident?.marital_status),
    },
    {
      title: "Status Penghuni",
      dataIndex: "resident",
      key: "status",
      render: (resident) => renderResidentStatus(resident?.status),
    },
    {
      title: "Tanggal Masuk",
      dataIndex: "startdate",
      key: "startdate",
      render: (startdate) => formatDate(startdate),
    },
    {
      title: "Tanggal Keluar",
      dataIndex: "enddate",
      key: "enddate",
      render: (enddate) => formatDate(enddate),
    },
  ];

  return (
    <>
      <div className="content-section">
        <div className="body pb-16">
          <h2 className="text-lg font-semibold text-primary py-2">
            Informasi Rumah
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-secondary">Alamat Rumah</label>
              <div>{childData.address}</div>
            </div>
            <div>
              <label className="text-secondary">Status Rumah</label>
              <div>{renderHouseStatus(childData.status)}</div>{" "}
            </div>
            {childData.residentData && (
              <>
                <div>
                  <div className="text-secondary">Nama Penghuni</div>
                  <div>{childData.residentData?.fullname}</div>
                </div>
                <div>
                  <div className="text-secondary">No. Handphone</div>
                  <div>+62{childData.residentData?.phone}</div>
                </div>
              </>
            )}
          </div>
          {childData.residentData && (
            <>
              <div className="">
                <div className="fit-scroll py-2">
                  <div className="text-lg font-semibold text-primary py-2 mt-4">
                    Informasi Penghuni
                  </div>
                  {data && data.length > 0 && (
                    <Table
                      dataSource={data.filter((x) => x.action !== "Delete")}
                      columns={variantColumn}
                      pagination={false}
                      rowKey="id"
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
