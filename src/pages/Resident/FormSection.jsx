import React, { useState, useEffect } from "react";
import { Input, Col, Row, Form, Select, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BButton, ButtonBack } from "../../components/atoms/Buttons";
import { addResident, editResident } from "../../services/api";

const { Option } = Select;

export default function FormSection(props) {
  const { setSection, section, childData, getData } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (section === "edit" && childData) {
      const ktpFileList = childData.ktp
        ? [
            {
              uid: "-1",
              name: "ktp.jpg",
              status: "done",
              url: `data:image/jpeg;base64,${childData.ktp}`,
            },
          ]
        : [];
      form.setFieldsValue({
        ...childData,
        ktp: ktpFileList,
      });
      setFileList(ktpFileList);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [section, childData, form]);

  const onFinish = (values) => {
    setLoading(true);
    const payload = {
      ...values,
      ktp:
        values.ktp && values.ktp.length
          ? values.ktp[0].originFileObj
          : undefined,
    };
    if (section === "add") {
      console.log(`Data yang dipost`);
      console.log(payload);
      addResident(payload)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses menambahkan data penghuni!",
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
      console.log(`Data yang diedit`);
      console.log(payload);
      editResident(childData.id, payload)
        .then((res) => {
          if (res) {
            notification.success({
              message: "Sukses",
              description: "Sukses mengubah data penghuni!",
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

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result.split(",")[1];
      const newFileList = [
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: `data:image/jpeg;base64,${base64Data}`,
          originFileObj: file,
        },
      ];
      setFileList(newFileList);
      form.setFieldsValue({
        ktp: newFileList,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="content-section">
        <div className="header">
          <div className="flex items-center">
            <ButtonBack onClick={() => setSection("default")} />
            <div className="header-title">
              {section === "add" && "Menambahkan Data Penghuni"}
              {section === "edit" && "Mengubah Data Penghuni"}
            </div>
          </div>
        </div>
        <div className="body-with-footer">
          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="body-content">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="ktp"
                    label="Foto KTP"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e && e.fileList;
                    }}
                    extra="Ukuran file maksimal 1MB dengan format .jpg, jpeg, png"
                  >
                    <Upload
                      customRequest={handleUpload}
                      listType="picture"
                      fileList={fileList}
                      onRemove={() => {
                        setFileList([]);
                        form.setFieldsValue({ ktp: [] });
                      }}
                    >
                      <BButton
                        icon={<UploadOutlined />}
                        customclass="border border-primary px-2 py-1"
                        onClick={(e) => e.preventDefault()}
                      >
                        Tambahkan Foto KTP
                      </BButton>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Nama Lengkap"
                    name="fullname"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Ketikkan nama lengkap" />
                  </Form.Item>
                  <Form.Item label="Status Kepemilikan Rumah" name="status">
                    <Select placeholder="Pilih status kepemilikan rumah">
                      <Option value="contract">Kontrak</Option>
                      <Option value="permanent">Tetap</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Nomor Handphone"
                    name="phone"
                    rules={[
                      {
                        required: true,
                      },
                      {
                        min: 8,
                        message: "Minimal 8 angka!",
                      },
                      {
                        max: 15,
                        message: "Maksimal 15 angka!",
                      },
                      {
                        pattern: new RegExp(/^8/gi),
                        message: "Nomor harus diawali angka 8!",
                      },
                    ]}
                    onChange={(e) =>
                      form.setFieldsValue({
                        ...form.getFieldsValue,
                        phone: e.target.value.replace(/^0/gi, ""),
                      })
                    }
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <Input
                      placeholder="Ketikan nomor handphone"
                      addonBefore="+62"
                      maxLength={13}
                    />
                  </Form.Item>
                  <Form.Item label="Status Perkawinan" name="marital_status">
                    <Select placeholder="Pilih status perkawinan">
                      <Option value="single">Belum Menikah</Option>
                      <Option value="married">Menikah</Option>
                    </Select>
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
