import React, { useEffect, useState } from "react";
import { Input, Col, Row, Form, Select, Upload, notification } from "antd";
import { BButton, ButtonBack } from "../../components/atoms/Buttons";
import { addFeeType, editFeeType } from "../../services/api";
import { numberWithCommas } from "../../utils/Helper";

export default function FormSection(props) {
  const { setSection, section, childData, getData, data } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (section === "edit" && childData) {
      form.setFieldsValue({
        name: childData.name,
        amount: numberWithCommas(childData.amount),
        frequency: childData.frequency,
      });
    } else {
      form.resetFields();
    }
  }, [section, childData, form]);

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
      amount: values.amount.replace(/\./g, ""),
    };
    if (section === "add") {
      console.log(`Data yang dipost`);
      console.log(formattedValues);
      addFeeType(formattedValues)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses menambahkan data jenis iuran!",
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
      console.log(`Data yang diupdate`);
      console.log(formattedValues);
      editFeeType(childData.id, formattedValues)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses mengubah data jenis iuran!",
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
              {section === "add" && "Menambahkan Data Jenis Iuran"}
              {section === "edit" && "Mengubah Data Jenis Iuran"}
            </div>
          </div>
        </div>
        <div className="body-with-footer">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="body-content">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Nama Iuran"
                    name="name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Ketikan nama jenis iuran" />
                  </Form.Item>
                  <Form.Item
                    label="Frekuensi Pembayaran Iuran"
                    name="frequency"
                  >
                    <Select placeholder="Pilih frekuensi pembayaran">
                      <Option value="once">Sekali</Option>
                      <Option value="monthly">Tiap Bulan</Option>
                      <Option value="yearly">Tiap Tahun</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Jumlah Nominal Iuran"
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: "Silakan masukkan nominal iuran",
                      },
                    ]}
                  >
                    <Input
                      addonBefore="Rp "
                      placeholder="0"
                      onChange={handleAmountChange}
                    />
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
      </div>
    </>
  );
}
