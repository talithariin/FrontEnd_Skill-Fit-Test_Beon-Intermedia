import React, { useState, useEffect } from "react";
import { ButtonBack, BButton } from "../../components/atoms/Buttons";
import {
  addPayment,
  editPayment,
  getAllHouse,
  getAllResident,
  getAllFeeType,
} from "../../services/api";
import { Form, notification, Row, Col, Input, Select, DatePicker } from "antd";
import PaymentDetail from "./PaymentDetail";
import { numberWithCommas } from "../../utils/Helper";
import dayjs from "dayjs";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

export default function FormSection(props) {
  const { setSection, section, childData, getData, data } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [houseData, setHouseData] = useState();
  const [residentData, setResidentData] = useState();
  const [feeTypeData, setFeeTypeData] = useState();

  useEffect(() => {
    getDataHouse();
    getDataResident();
    getDataFeeType();
  }, []);

  const getDataHouse = () => {
    setLoading(true);
    getAllHouse()
      .then((res) => {
        setHouseData(res.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getDataResident = () => {
    setLoading(true);
    getAllResident()
      .then((res) => {
        setResidentData(res.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getDataFeeType = () => {
    setLoading(true);
    getAllFeeType()
      .then((res) => {
        setFeeTypeData(res.data);
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
    if (section === "edit" && childData) {
      form.setFieldsValue({
        house_id: childData.house_id,
        resident_id: childData.resident_id,
        fee_type_id: childData.fee_type_id,
        payment_date: childData.payment_date
          ? dayjs(childData.payment_date)
          : null,
        period: childData.period,
        amount: numberWithCommas(childData.amount),
        status: childData.status,
        description: childData.description ? childData.description : null,
      });
    } else {
      form.resetFields();
    }
  }, [section, childData, form]);

  const handleAddressChange = (value) => {
    form.setFieldsValue({
      house_id: value,
    });
  };

  const handleResidentChange = (value) => {
    form.setFieldsValue({
      resident_id: value,
    });
  };

  const handleFeeTypeChange = (value) => {
    form.setFieldsValue({
      fee_type_id: value,
    });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    form.setFieldsValue({
      amount: numberWithCommas(value),
    });
  };

  const onFinish = (values) => {
    setLoading(true);
    const formattedValues = {
      ...values,
      payment_date: dayjs(values.startdate).format("YYYY-MM-DD"),
      amount: values.amount.replace(/\./g, ""),
    };
    if (section === "add") {
      addPayment(formattedValues)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses menambahkan data pembayaran!",
            });
            setSection("default");
            getData();
          }
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Gagal",
            description: err.response?.data?.errors,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (section === "edit") {
      editPayment(childData.id, formattedValues)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses mengubah data pembayaran!",
            });
            setSection("default");
            getData();
          }
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Gagal",
            description: err.response?.data?.errors,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="content-section">
        <div className="header">
          <div className="flex items-center">
            <ButtonBack onClick={() => setSection("default")} />
            <div className="header-title">
              {section === "add" && "Menambahkan Data Pembayaran"}
              {section === "view" && "Informasi Data Pembayaran"}
              {section === "edit" && "Mengubah Data Pembayaran"}
            </div>
          </div>
        </div>
        {section !== "view" ? (
          <div className="body-with-footer">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <div className="body-content">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Nama Penghuni"
                      name="resident_id"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Cari nama penghuni"
                        className="w-full mb-4"
                        onChange={handleResidentChange}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {residentData &&
                          residentData?.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.fullname}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Jenis Iuran"
                      name="fee_type_id"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Cari jenis iuran"
                        className="w-full mb-4"
                        onChange={handleFeeTypeChange}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {feeTypeData &&
                          feeTypeData?.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Tanggal Pembayaran"
                      name="payment_date"
                      rules={[
                        {
                          required: true,
                          message: "Silahkan pilih tanggal pembayaran",
                        },
                      ]}
                    >
                      <DatePicker
                        className="w-full"
                        format={dateFormat}
                        placeholder="Pilih tanggal pembayaran"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Periode Pembayaran"
                      name="period"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Pilih periode pembayaran">
                        <Option value="once">Sekali</Option>
                        <Option value="monthly">Bulanan</Option>
                        <Option value="yearly">Tahunan</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Alamat Rumah"
                      name="house_id"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Cari alamat rumah"
                        className="w-full mb-4"
                        onChange={handleAddressChange}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {houseData &&
                          houseData?.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.address}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Status Pembayaran"
                      name="status"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Pilih status pembayaran">
                        <Option value="paid">Dibayar</Option>
                        <Option value="unpaid">Belum Dibayar</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Jumlah yang Dibayarkan"
                      name="amount"
                      rules={[
                        {
                          required: true,
                          message: "Silakan masukkan nominal pembayaran",
                        },
                      ]}
                    >
                      <Input
                        addonBefore="Rp "
                        placeholder="0"
                        onChange={handleAmountChange}
                      />
                    </Form.Item>
                    <Form.Item label="Deskripsi" name="description">
                      <Input placeholder="Masukkan deskripsi pembayaran" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <div className="footer">
                <BButton
                  customclass="py-2 px-4 bg-danger text-white rounded-md"
                  onClick={() => setSection("default")}
                >
                  Batalkan
                </BButton>
                <Form.Item>
                  <BButton
                    customclass="py-3 px-4 bg-primary text-white rounded-md"
                    loading={loading}
                  >
                    Simpan
                  </BButton>
                </Form.Item>
              </div>
            </Form>
          </div>
        ) : (
          <PaymentDetail {...props} />
        )}
      </div>
    </>
  );
}
