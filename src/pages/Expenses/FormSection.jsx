import React, { useState, useEffect } from "react";
import { Form, notification, Row, Col, Input, DatePicker } from "antd";
import { ButtonBack, BButton } from "../../components/atoms/Buttons";
import { addExpense } from "../../services/api";
import { numberWithCommas } from "../../utils/Helper";
import dayjs from "dayjs";

const dateFormat = "DD/MM/YYYY";

export default function FormSection(props) {
  const { setSection, section, childData, getData, data } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
      expense_date: dayjs(values.expense_date).format("YYYY-MM-DD"),
      amount: values.amount.replace(/\./g, ""),
    };
    if (section === "add") {
      console.log(`Data yang akan dipost`);
      console.log(formattedValues);
      addExpense(formattedValues)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses menambahkan data rumah!",
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
              {section === "add" && "Menambahkan Data Pengeluaran"}
            </div>
          </div>
        </div>
        <div className="body-with-footer">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="body-content">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Deskripsi"
                    name="description"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Masukkan deskripsi pengeluaran" />
                  </Form.Item>
                  <Form.Item
                    label="Total Pengeluaran"
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: "Masukkan total pengeluaran",
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
                <Col span={12}>
                  <Form.Item
                    label="Tanggal Pengeluaran"
                    name="expense_date"
                    rules={[
                      {
                        required: true,
                        message: "Silahkan pilih tanggal pengeluaran",
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-full"
                      format={dateFormat}
                      placeholder="Pilih tanggal pengeluaran"
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
