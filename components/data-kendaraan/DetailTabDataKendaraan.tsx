"use client";

import { Card, Descriptions, Tag, Spin } from "antd";
import { safe } from "@/utils/formatDetailKendaraan";
import { formatDate } from "@/utils/formatDate";

export default function DetailTabDataKendaraan({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  if (!data) return null;

  return (
    <Spin spinning={loading}>
      <div className="space-y-4">
        {/* INFORMASI */}
        <Card title="Informasi Kendaraan">
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Merk">
              {safe(data.merk_vehicle_brand_name)}
            </Descriptions.Item>

            <Descriptions.Item label="Tipe">
              {safe(data.varian_merk_vehicle_varian_type_name)}
            </Descriptions.Item>

            <Descriptions.Item label="Jenis">
              {[
                data.jenis_kendaraan_vehicle_type_name,
                data.sub_jenis_kendaraan_vehicle_sub_name,
              ]
                .filter(Boolean)
                .join(" - ") || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Tahun / STNK">
              {`${safe(data.tahun_kendaraan)} / ${formatDate(data.tanggal_stnk)}`}
            </Descriptions.Item>

            <Descriptions.Item label="Warna">
              {[data.warna_cabin, data.warna_bak].filter(Boolean).join(" / ") ||
                "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Mesin">
              {`${safe(data.spesifikasi_kendaraan_isi_silinder)} cc / ${safe(
                data.spesifikasi_kendaraan_daya_motor,
              )} kW`}
            </Descriptions.Item>

            <Descriptions.Item label="Bahan Bakar">
              {safe(data.bahan_bakar)}
            </Descriptions.Item>

            <Descriptions.Item label="Kelas Jalan">
              {safe(data.kelas_jalan)}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* PEMILIK */}
        <Card title="Data Pemilik">
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Nama">
              {safe(data.nama_pemilik)}
            </Descriptions.Item>
            <Descriptions.Item label="Identitas">
              {safe(data.identitas)} - {safe(data.no_identitas)}
            </Descriptions.Item>
            <Descriptions.Item label="Alamat" span={2}>
              {[
                data.alamat,
                data.kelurahan_nama_kelurahan,
                data.kecamatan_nama_kecamatan,
                data.kota_nama_kota,
                data.provinsi,
              ]
                .filter(Boolean)
                .join(", ")
                .toUpperCase() || "-"}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* LEGAL */}
        <Card title="Legalitas">
          <Descriptions column={3} bordered>
            <Descriptions.Item label="No SUT">
              {safe(data.no_sut)}
            </Descriptions.Item>
            <Descriptions.Item label="Penerbit SUT">
              {safe(data.penerbit_sut)}
            </Descriptions.Item>
            <Descriptions.Item label="Tanggal SUT">
              {formatDate(data.tanggal_sut)}
            </Descriptions.Item>

            <Descriptions.Item label="No SRUT">
              {safe(data.no_srut)}
            </Descriptions.Item>
            <Descriptions.Item label="Penerbit SRUT">
              {safe(data.penerbit_srut)}
            </Descriptions.Item>
            <Descriptions.Item label="Tanggal SRUT">
              {formatDate(data.tanggal_srut)}
            </Descriptions.Item>

            <Descriptions.Item label="No SRB">
              {safe(data.no_srb)}
            </Descriptions.Item>
            <Descriptions.Item label="Penerbit SRB">
              {safe(data.penerbit_srb)}
            </Descriptions.Item>
            <Descriptions.Item label="Tanggal SRB">
              {formatDate(data.tanggal_srb)}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* SPESIFIKASI */}
        <Card title="Spesifikasi Kendaraan">
          {/* DIMENSI */}
          <Descriptions
            column={3}
            bordered
            size="small"
            style={{ marginTop: 12 }}
          >
            <Descriptions.Item label="Panjang">
              {safe(data.spesifikasi_kendaraan_panjang_utama)} mm
            </Descriptions.Item>
            <Descriptions.Item label="Lebar">
              {safe(data.spesifikasi_kendaraan_lebar_utama)} mm
            </Descriptions.Item>
            <Descriptions.Item label="Tinggi">
              {safe(data.spesifikasi_kendaraan_tinggi_utama)} mm
            </Descriptions.Item>

            <Descriptions.Item label="Panjang Bak">
              {safe(data.spesifikasi_kendaraan_panjang_bak)} mm
            </Descriptions.Item>
            <Descriptions.Item label="Lebar Bak">
              {safe(data.spesifikasi_kendaraan_lebar_bak)} mm
            </Descriptions.Item>
            <Descriptions.Item label="Tinggi Bak">
              {safe(data.spesifikasi_kendaraan_tinggi_bak)} mm
            </Descriptions.Item>
          </Descriptions>

          {/* BERAT & KAPASITAS */}
          <Descriptions
            column={2}
            bordered
            size="small"
            style={{ marginTop: 12 }}
          >
            <Descriptions.Item label="JBB">
              {safe(data.spesifikasi_kendaraan_jbb)}
            </Descriptions.Item>
            <Descriptions.Item label="MST">
              {safe(data.spesifikasi_kendaraan_mst)}
            </Descriptions.Item>

            <Descriptions.Item label="Daya Angkut Barang">
              {safe(data.spesifikasi_kendaraan_daya_angkut_barang)} kg
            </Descriptions.Item>
            <Descriptions.Item label="Daya Angkut Orang">
              {safe(data.spesifikasi_kendaraan_daya_angkut_orang)}
            </Descriptions.Item>
          </Descriptions>

          {/* SUMBU */}
          <Descriptions
            column={1}
            bordered
            size="small"
            style={{ marginTop: 12 }}
          >
            <Descriptions.Item label="Konfigurasi Sumbu">
              {safe(data.konfigurasi_sumbu)}
            </Descriptions.Item>

            <Descriptions.Item label="Jarak Antar Sumbu">
              {[
                data.spesifikasi_kendaraan_jarak_sumbu_1_2 &&
                  `1-2: ${data.spesifikasi_kendaraan_jarak_sumbu_1_2} mm`,
                data.spesifikasi_kendaraan_jarak_sumbu_2_3 &&
                  `2-3: ${data.spesifikasi_kendaraan_jarak_sumbu_2_3} mm`,
                data.spesifikasi_kendaraan_jarak_sumbu_3_4 &&
                  `3-4: ${data.spesifikasi_kendaraan_jarak_sumbu_3_4} mm`,
                data.spesifikasi_kendaraan_jarak_sumbu_4_5 &&
                  `4-5: ${data.spesifikasi_kendaraan_jarak_sumbu_4_5} mm`,
              ]
                .filter(Boolean)
                .join(" | ") || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Berat Sumbu">
              {[
                data.spesifikasi_kendaraan_berat_sumbu_1 &&
                  `S1: ${data.spesifikasi_kendaraan_berat_sumbu_1} kg`,
                data.spesifikasi_kendaraan_berat_sumbu_2 &&
                  `S2: ${data.spesifikasi_kendaraan_berat_sumbu_2} kg`,
                data.spesifikasi_kendaraan_berat_sumbu_3 &&
                  `S3: ${data.spesifikasi_kendaraan_berat_sumbu_3} kg`,
                data.spesifikasi_kendaraan_berat_sumbu_4 &&
                  `S4: ${data.spesifikasi_kendaraan_berat_sumbu_4} kg`,
                data.spesifikasi_kendaraan_berat_sumbu_5 &&
                  `S5: ${data.spesifikasi_kendaraan_berat_sumbu_5} kg`,
              ]
                .filter(Boolean)
                .join(" | ") || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Daya Dukung Sumbu">
              {[
                data.spesifikasi_kendaraan_daya_dukung_sumbu_1 &&
                  `S1: ${data.spesifikasi_kendaraan_daya_dukung_sumbu_1} kg`,
                data.spesifikasi_kendaraan_daya_dukung_sumbu_2 &&
                  `S2: ${data.spesifikasi_kendaraan_daya_dukung_sumbu_2} kg`,
                data.spesifikasi_kendaraan_daya_dukung_sumbu_3 &&
                  `S3: ${data.spesifikasi_kendaraan_daya_dukung_sumbu_3} kg`,
                data.spesifikasi_kendaraan_daya_dukung_sumbu_4 &&
                  `S4: ${data.spesifikasi_kendaraan_daya_dukung_sumbu_4} kg`,
                data.spesifikasi_kendaraan_daya_dukung_sumbu_5 &&
                  `S5: ${data.spesifikasi_kendaraan_daya_dukung_sumbu_5} kg`,
              ]
                .filter(Boolean)
                .join(" | ") || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Ban / Pemakaian Sumbu">
              {[
                data.spesifikasi_kendaraan_pemakaian_sumbu_1 &&
                  `S1: ${data.spesifikasi_kendaraan_pemakaian_sumbu_1}`,
                data.spesifikasi_kendaraan_pemakaian_sumbu_2 &&
                  `S2: ${data.spesifikasi_kendaraan_pemakaian_sumbu_2}`,
                data.spesifikasi_kendaraan_pemakaian_sumbu_3 &&
                  `S3: ${data.spesifikasi_kendaraan_pemakaian_sumbu_3}`,
              ]
                .filter(Boolean)
                .join(" | ") || "-"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Spin>
  );
}
