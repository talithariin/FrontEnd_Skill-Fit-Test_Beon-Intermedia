import React, { useState, useEffect } from "react";
import { ButtonBack, BButton } from "../../components/atoms/Buttons";
import { addHouse, editHouse } from "../../services/api";
import { Form, notification, Row, Col, Input } from "antd";
import HouseDetail from "./HouseDetail";

export default function FormSection(props) {
  const { setSection, section, childData, getData, data } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (section === "edit" && childData) {
      form.setFieldsValue({
        address: childData.address,
      });
    } else {
      form.resetFields();
    }
  }, [section, childData, form]);

  const onFinish = (values) => {
    setLoading(true);
    if (section === "add") {
      addHouse(values)
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
    if (section === "edit") {
      editHouse(childData.id, values)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses mengubah data rumah!",
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
              {section === "add" && "Menambahkan Data Rumah"}
              {section === "view" && "Informasi Data Rumah"}
              {section === "edit" && "Mengubah Data Rumah"}
            </div>
          </div>
        </div>
        {section !== "view" ? (
          <div className="body-with-footer">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <div className="body-content">
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Alamat"
                      name="address"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Ketikan alamat rumah" />
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
          <HouseDetail {...props} />
        )}
      </div>
    </>
  );
}
