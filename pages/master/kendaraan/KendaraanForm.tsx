"use client";

import { Form, Steps, Button, Spin, Divider, message } from "antd";
import { LeftOutlined, RightOutlined, SaveOutlined } from "@ant-design/icons";
import { useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import { kendaraanSteps } from "@/utils/kendaraan/schema";

import { useWilayah } from "@/hooks/select-options/useWilayah";
import { useMerk } from "@/hooks/select-options/useMerk";
import { useJenisKendaraan } from "@/hooks/select-options/useJenisKendaraan";
import { useKelasJalan } from "@/hooks/select-options/useKelasJalan";
import { useBahanUtama } from "@/hooks/select-options/useBahanUtama";
import { useKonfigurasiSumbu } from "@/hooks/select-options/useKonfigurasiSumbu";
import { useBahanBakar } from "@/hooks/select-options/useBahanBakar";

import { useKendaraanForm } from "@/hooks/data-kendaraan/useKendaraanForm";
import { useSelectMap } from "@/hooks/data-kendaraan/useSelectMap";
import StepRenderer from "./component/StepRenderer";
import AppDivider from "@/components/common/AppDivider";

export default function KendaraanForm({ mode = "create", id, onSuccess }: any) {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  // 🔥 INIT CONTROL (source of truth)
  const [isInit, setIsInit] = useState(true);

  // 🔥 OPTION HOOKS (safe, pakai isInit)
  const wilayah = useWilayah(form, isInit);
  const merk = useMerk(form, isInit);
  const jenisKendaraan = useJenisKendaraan(form, isInit);
  const bahanUtama = useBahanUtama();

  const kelasJalan = useKelasJalan(current === 1);
  const konsumbu = useKonfigurasiSumbu(current === 1);
  const bahanBakar = useBahanBakar(current === 1);

  // 🔥 FORM LOGIC
  const { loading, submitting, submit } = useKendaraanForm({
    form,
    mode,
    id,
    wilayah,
    merk,
    jenisKendaraan,
    onInitDone: () => setIsInit(false), // 🔥 penting
  });

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

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      await submit(onSuccess);
    } catch (err) {
      message.error("Lengkapi semua field wajib sebelum simpan");
    }
  };

  // 🔥 LOADING AWAL (EDIT MODE)
  if (loading) {
    return (
      <ComponentCard>
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      </ComponentCard>
    );
  }

  return (
    <Spin spinning={submitting}>
      <Form form={form} layout="vertical">
        <ComponentCard>
          {/* STEP */}
          <Steps
            current={current}
            items={kendaraanSteps.map((s) => ({ title: s.title }))}
          />

          {/* CONTENT */}
          {kendaraanSteps.map((stepItem, stepIndex) => (
            <div
              key={stepIndex}
              style={{ display: stepIndex === current ? "block" : "none" }}
            >
              {stepItem.sections.map((section: any, i: number) => (
                <div key={i}>
                  <AppDivider title={section.title} />
                  <StepRenderer section={section} selectMap={selectMap} />
                </div>
              ))}
            </div>
          ))}

          <Divider />

          <div className="mt-5 flex justify-between">
            {/* ACTION */}
            {current > 0 && (
              <Button
                onClick={() => setCurrent((p) => p - 1)}
                icon={<LeftOutlined />}
              >
                Kembali
              </Button>
            )}

            {current < kendaraanSteps.length - 1 && (
              <Button
                icon={<RightOutlined />}
                iconPlacement="end"
                onClick={() => setCurrent((p) => p + 1)}
              >
                Lanjut
              </Button>
            )}

            <Button
              type="primary"
              loading={submitting}
              icon={<SaveOutlined />}
              onClick={handleSubmit}
            >
              Simpan
            </Button>
          </div>
        </ComponentCard>
      </Form>
    </Spin>
  );
}
