"use client";

import { Form, Steps, Button, Spin, Divider } from "antd";
import { LeftOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";
import { useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import { kendaraanSteps } from "./schema";

import { useWilayah } from "./hook/options/useWilayah";
import { useMerk } from "./hook/options/useMerk";
import { useJenisKendaraan } from "./hook/options/useJenisKendaraan";
import { useKelasJalan } from "./hook/options/useKelasJalan";
import { useBahanUtama } from "./hook/options/useBahanUtama";
import { useKonfigurasiSumbu } from "./hook/options/useKonfigurasiSumbu";
import { useBahanBakar } from "./hook/options/useBahanBakar";

import { useKendaraanForm } from "./hook/useKendaraanForm";
import { useSelectMap } from "./hook/useSelectMap";
import StepRenderer from "./component/StepRenderer";
import AppDivider from "@/components/common/AppDivider";

export default function KendaraanForm({ mode = "create", id, onSuccess }: any) {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const wilayah = useWilayah(form);
  const merk = useMerk(form);
  const jenisKendaraan = useJenisKendaraan(form);
  const bahanUtama = useBahanUtama();

  const kelasJalan = useKelasJalan(current === 1);
  const konsumbu = useKonfigurasiSumbu(current === 1);
  const bahanBakar = useBahanBakar(current === 1);

  const selectMap = useSelectMap({
    current,
    merk,
    wilayah,
    jenisKendaraan,
    bahanUtama,
    kelasJalan,
    konsumbu,
    bahanBakar,
  });

  const { loading, submitting, next, prev, submit } = useKendaraanForm({
    form,
    mode,
    id,
    wilayah,
    merk,
    jenisKendaraan,
  });

  const step = kendaraanSteps[current];

  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical" onFinish={() => submit(onSuccess)}>
        <ComponentCard>
          <Steps
            current={current}
            items={kendaraanSteps.map((s) => ({ title: s.title }))}
          />

          {step.sections.map((section: any, i: number) => (
            <div key={i}>
              <AppDivider title={section.title} />
              <StepRenderer section={section} selectMap={selectMap} />
            </div>
          ))}
          <Divider />
          <div className="mt-5 flex justify-between">
            {/* {current > 0 && (
              <Button onClick={() => prev(setCurrent)} icon={<LeftOutlined />}>
                Kembali
              </Button>
            )}

            {current < kendaraanSteps.length - 1 && (
              <Button
                type="primary"
                loading={submitting}
                icon={<RightOutlined />}
                iconPosition="end"
                onClick={() => next(step, current, setCurrent)}
              >
                Lanjut & Simpan
              </Button>
            )}

            {current === kendaraanSteps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
                icon={<SaveOutlined />}
              >
                Simpan
              </Button>
            )} */}
            {/* STEP 1+ */}
            {current > 0 && (
              <Button onClick={() => prev(setCurrent)} icon={<LeftOutlined />}>
                Kembali
              </Button>
            )}

            {/* NEXT */}
            {current < kendaraanSteps.length - 1 && (
              <Button
                icon={<RightOutlined />}
                iconPlacement="end"
                onClick={() => setCurrent((p) => p + 1)}
              >
                Lanjut
              </Button>
            )}

            {/* SAVE (ALL STEP) */}
            <Button
              type="primary"
              loading={submitting}
              onClick={() => submit(onSuccess)}
              icon={<SaveOutlined />}
            >
              Simpan
            </Button>
          </div>
        </ComponentCard>
      </Form>
    </Spin>
  );
}
