import React, { useState, useEffect } from "react";
import { ButtonBack, BButton } from "../../components/atoms/Buttons";
import {
  addHouseResident,
  editHouseResident,
  getAllHouse,
  getAllResident,
} from "../../services/api";
import { Form, Row, Col, Select, DatePicker, notification } from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";

export default function FormSection(props) {
  const { setSection, section, childData, getData, data } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [houseData, setHouseData] = useState();
  const [residentData, setResidentData] = useState();

  useEffect(() => {
    getDataHouse();
    getDataResident();
  }, []);

  useEffect(() => {
    if (section === "edit" && childData) {
      form.setFieldsValue({
        house_id: childData.house_id,
        resident_id: childData.resident_id,
        startdate: dayjs(childData.startdate),
        enddate: childData.enddate ? dayjs(childData.enddate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [section, childData, form]);

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

  const onFinish = (values) => {
    setLoading(true);
    const formattedValues = {
      ...values,
      startdate: dayjs(values.startdate).format("YYYY-MM-DD"),
      enddate: values.enddate
        ? dayjs(values.enddate).format("YYYY-MM-DD")
        : null,
    };
    if (section === "add") {
      addHouseResident(formattedValues)
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
      editHouseResident(childData.id, formattedValues)
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

  return (
    <>
      <div className="content-section">
        <div className="header">
          <div className="flex items-center">
            <ButtonBack onClick={() => setSection("default")} />
            <div className="header-title">
              {section === "add" && "Menambahkan Data Penghuni Rumah"}
              {section === "edit" && "Mengubah Data Penghuni Rumah"}
            </div>
          </div>
        </div>
        <div className="body-with-footer">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="body-content">
              <Row gutter={16}>
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
                    label="Tanggal Masuk"
                    name="startdate"
                    rules={[
                      {
                        required: true,
                        message: "Silahkan pilih tanggal masuk",
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-full"
                      format={dateFormat}
                      placeholder="Pilih tanggal masuk"
                    />
                  </Form.Item>
                </Col>
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
                  <Form.Item label="Tanggal Keluar" name="enddate">
                    <DatePicker
                      className="w-full"
                      format={dateFormat}
                      placeholder="Pilih tanggal keluar"
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
