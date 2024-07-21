import React, { useState, useEffect } from "react";
import {
  formatDate,
  numberWithCommas,
  renderPaymentPeriod,
  renderPaymentStatus,
  renderResidentStatus,
} from "../../utils/Helper";

export default function HouseDetail(props) {
  const { childData } = props;

  return (
    <>
      <div className="content-section">
        <div className="body pb-16">
          <h2 className="text-lg font-semibold text-primary py-2">
            Informasi Pembayaran
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-secondary">Nama Penghuni</label>
              <div>{childData.resident_data.fullname}</div>
            </div>
            <div>
              <label className="text-secondary">Alamat Rumah</label>
              <div>{childData.house_data.address}</div>
            </div>
            <div>
              <label className="text-secondary">Jenis Iuran</label>
              <div>{numberWithCommas(childData.fee_type_data.name)}</div>
            </div>
            <div>
              <label className="text-secondary">Status Pembayaran</label>
              <div>{renderPaymentStatus(childData.status)}</div>
            </div>
            {childData && childData.amount && (
              <div>
                <label className="text-secondary">Nominal Pembayaran</label>
                <div>Rp {numberWithCommas(childData.amount)}</div>
              </div>
            )}
            {childData && childData.payment_date && (
              <div>
                <label className="text-secondary">Tanggal Pembayaran</label>
                <div>{formatDate(childData.payment_date)}</div>
              </div>
            )}
            {childData && childData.period && (
              <div>
                <label className="text-secondary">Periode Pembayaran</label>
                <div>{renderPaymentPeriod(childData.period)}</div>
              </div>
            )}
            {childData && childData.description && (
              <div>
                <label className="text-secondary">Deskripsi Pembayaran</label>
                <div>{numberWithCommas(childData.description)}</div>
              </div>
            )}
          </div>
          {childData && childData.resident_data && (
            <>
              <div className="my-8">
                <h2 className="text-lg font-semibold text-primary py-2">
                  Informasi Penghuni
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-secondary">Nama Penghuni</div>
                    <div>{childData.resident_data.fullname}</div>
                  </div>
                  <div>
                    <div className="text-secondary">No. Handphone</div>
                    <div>+62{childData.resident_data.phone}</div>
                  </div>
                  <div>
                    <div className="text-secondary">
                      Status Kepemilikan Rumah
                    </div>
                    <div>
                      {renderResidentStatus(childData.resident_data.status)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* {childData.residentData && (
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
            )} */}
        </div>
      </div>
    </>
  );
}
