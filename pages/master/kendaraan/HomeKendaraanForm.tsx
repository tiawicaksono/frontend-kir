"use client";

import { Form, Steps, Button, Card, Row, Col, Divider } from "antd";
import { useEffect, useState } from "react";

import FieldRenderer from "./FieldRenderer";
import { kendaraanSteps } from "./schema";
import ComponentCard from "@/components/common/ComponentCard";
import { useWilayah } from "@/pages/master/kendaraan/useWilayah";

export default function HomeKendaraanForm() {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const wilayah = useWilayah(form);

  // ✅ SET DEFAULT VALUE
  useEffect(() => {
    const defaults: any = {};

    kendaraanSteps.forEach((step) => {
      step.sections.forEach((section) => {
        section.fields.forEach((field) => {
          if (field.default !== undefined) {
            defaults[field.name] = field.default;
          }
        });
      });
    });

    form.setFieldsValue(defaults);
  }, []);

  const getFieldExtra = (fieldName: string) => {
    switch (fieldName) {
      case "provinsi_id":
        return {
          options: wilayah.provinsi,
          loading: wilayah.loadingProvinsi,
          onChange: wilayah.onChangeProvinsi,
          placeholder: "Pilih Provinsi",
        };

      case "kota_id":
        return {
          options: wilayah.kota,
          loading: wilayah.loadingKota,
          onChange: wilayah.onChangeKota,
          disabled: !form.getFieldValue("provinsi_id"),
          placeholder: "Pilih Kota",
        };

      case "kecamatan_id":
        return {
          options: wilayah.kecamatan,
          loading: wilayah.loadingKecamatan,
          onChange: wilayah.onChangeKecamatan,
          disabled: !form.getFieldValue("kota_id"),
          placeholder: "Pilih Kecamatan",
        };

      case "kelurahan_id":
        return {
          options: wilayah.kelurahan,
          loading: wilayah.loadingKelurahan,
          disabled: !form.getFieldValue("kecamatan_id"),
          placeholder: "Pilih Kelurahan",
        };

      default:
        return {};
    }
  };

  const step = kendaraanSteps[current];

  const next = async () => {
    const fields = step.sections.flatMap((s) => s.fields.map((f) => f.name));

    await form.validateFields(fields);
    setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);

  const submit = (values: any) => {
    console.log(values);
  };

  return (
    <ComponentCard>
      <Steps
        current={current}
        style={{ marginBottom: 32 }}
        items={kendaraanSteps.map((s) => ({
          title: s.title,
        }))}
      />

      <Form form={form} layout="vertical" onFinish={submit}>
        {step.sections.map((section, i) => (
          <div key={i}>
            <Divider>{section.title}</Divider>

            <Row gutter={16}>
              {section.fields.map((field: any) => (
                <Col span={12} key={field.name}>
                  <FieldRenderer
                    field={field}
                    extra={getFieldExtra(field.name)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        ))}

        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Kembali
            </Button>
          )}

          {current < kendaraanSteps.length - 1 && (
            <Button type="primary" onClick={next}>
              Lanjut
            </Button>
          )}

          {current === kendaraanSteps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
